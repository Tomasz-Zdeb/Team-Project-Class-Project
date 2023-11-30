import { useEffect, useState } from "react";
import { MenuItem } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function fetchMenu() {
	// TODO: Fetch menu from backend

	return [
		{
			id: 1,
			name: "Pozycja 1",
			price: 10,
		},
		{
			id: 2,
			name: "Pozycja 2",
			price: 10,
		},
		{
			id: 3,
			name: "Pozycja 3",
			price: 10,
		},
		{
			id: 4,
			name: "Pozycja 4",
			price: 10,
		},
		{
			id: 5,
			name: "Pozycja 5",
			price: 10,
		},
		{
			id: 6,
			name: "Pozycja 6",
			price: 10,
		},
		{
			id: 7,
			name: "Pozycja 7",
			price: 300000,
		},
	];
}

export default function Menu() {
	const [menu, setMenu] = useState<MenuItem[]>([]);

	const [newItemName, setNewItemName] = useState<string>("");
	const [newItemPrice, setNewItemPrice] = useState<number>(0);

	useEffect(() => {
		setMenu(fetchMenu());
	}, []);

	function handleDelete(id: number) {
		setMenu(menu.filter((item) => item.id !== id));

		// TODO: Delete item from backend
	}

	function handleAdd() {
		if (newItemName === "" || newItemPrice === 0 || !newItemPrice) return;

		const newItem: MenuItem = {
			id:
				menu.length === 0
					? 1
					: (
							menu.reduce((prev, curr) => {
								return prev.id > curr.id ? prev : curr;
							}) as MenuItem
					).id + 1, // prettier-ignore
			name: newItemName,
			price: newItemPrice,
		};

		setMenu([...menu, newItem]);

		// TODO: Add item to backend
	}

	return (
		<div className="overflow-auto border-2 border-slate-600 h-full rounded-lg">
			<div className="overflow-auto flex">
				<table className="table-fixed w-full">
					<thead>
						<tr className="border-b-2 border-slate-600 p-2">
							<th>Nazwa</th>
							<th>Cena</th>
							<th>Akcja</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b-2 border-b-muted">
							<td className="p-2">
								<input
									type="text"
									className="w-full p-2 border-2 border-slate-600 rounded-lg"
									placeholder="Nazwa"
									onChange={(e) =>
										setNewItemName(e.target.value)
									}
								/>
							</td>
							<td className="p-2">
								<input
									type="number"
									className="w-full p-2 border-2 border-slate-600 rounded-lg"
									placeholder="Cena"
									onChange={(e) =>
										setNewItemPrice(
											parseInt(e.target.value)
										)
									}
								/>
							</td>
							<td className="p-2">
								<div className="flex justify-center">
									<button
										className="py-4 px-8 bg-green-500 text-white"
										onClick={handleAdd}
									>
										Dodaj
									</button>
								</div>
							</td>
						</tr>
						{menu.length === 0 && (
							<tr className="text-center">
								<td colSpan={3} className="p-5">
									Brak pozycji w menu
								</td>
							</tr>
						)}
						{menu.map((item) => {
							return (
								<tr
									key={item.id}
									className="text-center odd:bg-gray-200"
								>
									<td>{item.name}</td>
									<td>{item.price} zł</td>
									<td className="p-2">
										<button
											className="py-4 px-8"
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
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
