import {
	faCheck,
	faPencil,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Card from "../components/Card";


type RawUser = {
  id: number;
  username: string;
  is_staff: boolean;
};

type User = {
	id: number;
	login: string;
	role: string;
};

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('http://localhost:8000/users/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const rawUsersData: RawUser[] = await response.json();

    // Przekształć dane z backendu na frontowy typ User
    const transformedUsers: User[] = rawUsersData.map(rawUser => ({
      id: rawUser.id,
      login: rawUser.username,
      role: rawUser.is_staff ? 'Administrator' : 'User',
    }));

    return transformedUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Rzucanie błędu może być lepsze, aby móc go obsłużyć na wyższym poziomie
  }
}

function AddUserModal(props: {
  onAdd: (login: string, password: string, role: string) => void;
  closeModal: () => void;
}) {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  async function handleAdd() {
    if (login === "" || password === "") {
      alert("Login i hasło nie mogą być puste!");
      return;
    }

    const role = isAdmin ? "Administrator" : "User";
    const isStaff = isAdmin;

    try {
      const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: login,
          password: password,
          is_staff: isStaff,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.username === login) {
        alert("Użytkownik został utworzony!");
      }

      props.onAdd(login, password, role);
      props.closeModal();
    } catch (error) {
      console.error("Wystąpił problem z rejestracją użytkownika: ", error);
      alert("Wystąpił błąd podczas rejestracji użytkownika. Spróbuj ponownie później.");
    }
  }

  return (
    <div className="fixed w-full h-full left-0 top-0">
      <div className="flex flex-col items-center justify-center h-full">
        <Card className="bg-[#f5f5f5]">
          <div className="flex flex-col gap-6 w-full grow">
            <div className="flex flex-col gap-1">
              <h1>Login</h1>
              <input
                className="py-3 px-2 w-full rounded-md"
                value={login}
                title="Login"
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1>Hasło</h1>
              <input
                className="py-3 px-2 w-full rounded-md"
                type="password"
                value={password}
                title="Hasło"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1>Rola</h1>
              <label style={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  style={{ width: '20px', height: '20px', marginRight: '10px', verticalAlign: 'middle' }}
                />
                {" "}Użytkownik jest administratorem
              </label>
            </div>
            <div className="grow w-full">
              <button className="py-4 w-full" onClick={handleAdd}>
                <h1>Dodaj</h1>
              </button>
            </div>
            <div className="grow w-full">
              <button
                className="py-4 w-full"
                onClick={() => props.closeModal()}
              >
                <h1>Anuluj</h1>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}



function UserTab() {
	const [users, setUsers] = useState<User[]>([]);
	const [addUserModalOpen, setAddUserModalOpen] = useState<boolean>(false);
	const [currentlyEditing, setCurrentlyEditing] = useState<number | null>(
		null
	);
	const [currentlyEditingRole, setCurrentlyEditingRole] =
		useState<string>("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }

    loadUsers(); // Wywołanie funkcji asynchronicznej wewnątrz useEffect
  }, []);

	function handleDelete(id: number) {
    // Send a DELETE request to the server
    fetch(`http://localhost:8000/users/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',

        },
    })
    .then(response => {
        if (!response.ok) {
            // Handle response errors
            throw new Error('Network response was not ok');
        }

        setUsers(users.filter((user) => user.id !== id));
        console.log(`User with id ${id} deleted successfully.`);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}



function handleEdit(userId: number, role: string) {
  // Wysyłamy żądanie PUT do serwera
  fetch(`http://localhost:8000/users/${userId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ is_staff: role === "Administrator" }),
  })
  .then(response => {
    if (!response.ok) {
      // Obsługa błędów w odpowiedzi
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(updatedUser => {
    console.log('User updated successfully:', updatedUser);
    // Aktualizacja stanu użytkowników na froncie
    setUsers(users.map(user => user.id === userId ? { ...user, role: updatedUser.is_staff ? "Administrator" : "User" } : user));
    setCurrentlyEditing(null); // Zakończenie trybu edycji
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}

	function handleAddUser(login: string, _: string, role: string) {
		setUsers([
			...users,
			{
				id:
					users.length === 0
						? 1
						: (
								users.reduce((prev, curr) => {
									return prev.id > curr.id ? prev : curr;
								}) as User
						).id + 1, // prettier-ignore
				login: login,
				role: role,
			},
		]);
	}

	return (
		<div className="flex flex-col gap-2 h-full overflow-auto">
			{addUserModalOpen && (
				<AddUserModal
					onAdd={handleAddUser}
					closeModal={() => setAddUserModalOpen(false)}
				/>
			)}
			<div className="overflow-auto border-2 border-slate-600 h-full rounded-lg">
				<div className="overflow-auto flex flex-col h-full">
					<table className="table-fixed w-full">
						<thead>
							<tr className="border-b-2 border-slate-600 p-2">
								<th>Login</th>
								<th>Rola</th>
								<th>Akcje</th>
							</tr>
						</thead>
						<tbody>
							{users.length === 0 && (
								<tr className="text-center">
									<td colSpan={3} className="p-5">
										Brak użytkowników
									</td>
								</tr>
							)}
							{users.map((item) => {
								return (
									<tr
										key={item.id}
										className="text-center odd:bg-gray-200"
									>
										<td>{item.login}</td>
										<td>
											{currentlyEditing === item.id ? (
												<>
													<input
														type="checkbox"
														style={{ width: "20px", height: "20px" }} // Zmiana rozmiaru checkboxa
														checked={currentlyEditingRole === "Administrator"}
														onChange={(e) =>
															setCurrentlyEditingRole(
																e.target.checked ? "Administrator" : "User"
															)
														}
														title={
															"Edytuj rolę " + item.role
														}
													/>
													<span className="ml-2" style={{ fontSize: "24px" }}>
														Użytkownik jest administratorem
													</span>
												</>
											) : (
												item.role === "Administrator" ? "Administrator" : "User"
											)}
										</td>
										<td className="p-2">
											<div className="flex gap-2 justify-center">
												{currentlyEditing ===
												item.id ? (
													<button
														className="py-4 w-32"
														onClick={() =>
															handleEdit(item.id, currentlyEditingRole)
														}
														title="Zapisz"
													>
														<FontAwesomeIcon
															icon={faCheck}
															className="text-green-500 text-4xl"
														/>
													</button>
												) : (
													<button
														className="py-4 w-32"
														onClick={() => {
															setCurrentlyEditing(
																item.id
															);
															setCurrentlyEditingRole(
																item.role
															);
														}}
														title={"Edytuj"}
													>
														<FontAwesomeIcon
															icon={faPencil}
															className="text-4xl text-muted"
														/>
													</button>
												)}
												<button
													className="py-4 w-32"
													onClick={() =>
														handleDelete(item.id)
													}
													title="Usuń"
												>
													<FontAwesomeIcon
														icon={faTrashCan}
														className="text-red-500 text-4xl"
													/>
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<div className="flex-grow" />
			<button
				className="p-4 w-full"
				onClick={() => setAddUserModalOpen(true)}
			>
				<h1>Dodaj użytkownika</h1>
			</button>
		</div>
	);
}

export default function Admin() {
	const [tab, setTab] = useState<number>(0);

	const userTab = UserTab();

	return (
		<div className="flex flex-col gap-2 h-full w-full">
			<div className="flex gap-2">
				<button
					className={`p-4 w-full ${tab === 0 ? "bg-gray-200" : ""}`}
					onClick={() => setTab(0)}
				>
					<h1>Użytkownicy</h1>
				</button>
				<button
					className={`p-4 w-full ${tab === 1 ? "bg-gray-200" : ""}`}
					onClick={() => setTab(1)}
				>
					<h1>Inne opcje</h1>
				</button>
			</div>
			<div className="flex-grow">{tab === 0 && userTab}</div>
		</div>
	);
}
