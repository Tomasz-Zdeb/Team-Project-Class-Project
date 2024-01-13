import { useEffect, useState } from "react";
import { MenuItem } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";

const apiUrl = "http://localhost:8000/menuitems/";

export default function Menu() {
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [newItemName, setNewItemName] = useState<string>("");
    const [newItemPrice, setNewItemPrice] = useState<number>(0);
    const [currentlyEditing, setCurrentlyEditing] = useState<number | null>(null);
    const [currentlyEditingName, setCurrentlyEditingName] = useState<string>("");
    const [currentlyEditingPrice, setCurrentlyEditingPrice] = useState<number>(0);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Przekształcenie ceny na liczbę


                const transformedData = data.map((item: MenuItem) => ({
                    ...item,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    price: parseFloat(item.price)
                }));
                setMenu(transformedData);
            })
            .catch((error) => console.error("Fetch error:", error));
    }, []);

    const handleAdd = async () => {
        if (newItemName === "" || newItemPrice <= 0) return;
        const newItem = { name: newItemName, price: newItemPrice };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });

            if (!response.ok) throw new Error("Failed to add new item.");
            const addedItem = await response.json();
            setMenu([...menu, { ...addedItem, price: parseFloat(addedItem.price) }]);
            setNewItemName("");
            setNewItemPrice(0);
        } catch (error) {
            console.error('Add item error:', error);
        }
    };

    const handleEdit = async () => {
        if (!currentlyEditing || currentlyEditingName === "" || currentlyEditingPrice <= 0) return;
        const updatedItem = { name: currentlyEditingName, price: currentlyEditingPrice };

        try {
            const response = await fetch(`${apiUrl}${currentlyEditing}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem)
            });

            if (!response.ok) throw new Error("Failed to update item.");
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setMenu(menu.map((item) => item.id === currentlyEditing ? { ...item, ...updatedItem, price: parseFloat(updatedItem.price) } : item));
            setCurrentlyEditing(null);
        } catch (error) {
            console.error('Update item error:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${apiUrl}${id}/`, { method: 'DELETE' });

            if (!response.ok) throw new Error("Failed to delete item.");
            setMenu(menu.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Delete item error:', error);
        }
    };

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
                            <td>
                                <input
                                    type="text"
                                    className="w-full p-2 border-2 border-slate-600 rounded-lg m-2"
                                    placeholder="Nazwa"
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full p-2 border-2 border-slate-600 rounded-lg m-2"
                                    placeholder="Cena"
                                    value={newItemPrice}
                                    onChange={(e) => setNewItemPrice(parseFloat(e.target.value))}
                                />
                            </td>
                            <td>
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
                        {menu.map((item) => (
                            <tr key={item.id} className="text-center odd:bg-gray-200">
                                <td>
                                    {currentlyEditing === item.id ? (
                                        <input
                                            type="text"
                                            className="w-full p-2 border-2 border-slate-600 rounded-lg m-2"
                                            value={currentlyEditingName}
                                            onChange={(e) => setCurrentlyEditingName(e.target.value)}
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </td>
                                <td>
                                    {currentlyEditing === item.id ? (
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full p-2 border-2 border-slate-600 rounded-lg m-2"
                                            value={currentlyEditingPrice}
                                            onChange={(e) => setCurrentlyEditingPrice(parseFloat(e.target.value))}
                                        />
                                    ) : (
                                        `${item.price.toFixed(2)} zł`
                                    )}
                                </td>
                                <td>
                                    <div className="flex gap-2 justify-center">
                                        {currentlyEditing === item.id ? (
                                            <button
                                                className="py-4 w-32"
                                                onClick={handleEdit}
                                                title="Zapisz"
                                            >
                                                <FontAwesomeIcon icon={faCheck} className="text-green-500 text-4xl" />
                                            </button>
                                        ) : (
                                            <button
                                                className="py-4 w-32"
                                                onClick={() => {
                                                    setCurrentlyEditing(item.id);
                                                    setCurrentlyEditingName(item.name);
                                                    setCurrentlyEditingPrice(item.price);
                                                }}
                                                title="Edytuj"
                                            >
                                                <FontAwesomeIcon icon={faPencil} className="text-4xl text-muted" />
                                            </button>
                                        )}
                                        <button
                                            className="py-4 w-32"
                                            onClick={() => handleDelete(item.id)}
                                            title="Usuń"
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} className="text-red-500 text-4xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
