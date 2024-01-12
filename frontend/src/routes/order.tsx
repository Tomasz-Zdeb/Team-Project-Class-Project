import {
    faPlus,
    faMinus,
    faCashRegister,
    faTrash,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { MenuItem } from "../types";

// Zaktualizowana funkcja fetchMenu
function fetchMenu() {
    return fetch('http://localhost:8000/menuitems/')
        .then(response => response.json())
        .catch(error => console.error("Fetch error:", error));
}

function OrderSummary({
    order,
    setCart,
    setOrderSummaryView,
    menu
}: {
    order: Record<number, number>;
    setCart: (value: Record<number, number>) => void;
    setOrderSummaryView: (value: boolean) => void;
    menu: MenuItem[];
}) {
    const [ordered, setOrdered] = useState(false);
    const [tableNumber, setTableNumber] = useState<number | null>(null);

    const completeOrder = () => {
        setOrdered(true);
        setTimeout(() => {
            setCart({});
            setOrderSummaryView(false);
            setOrdered(false);
        }, 500);
    };

    const calculateTotal = () => {
        return Object.entries(order).reduce((acc, [id, count]) => {
            const item = menu.find(item => item.id === Number(id));
            return item ? acc + item.price * count : acc;
        }, 0);
    };

    const total = calculateTotal();

    return (
        <div className="flex flex-col h-full">
            {!ordered ? (
                <>
                    <div className="flex flex-col gap-4 justify-center flex-grow">
                        <div
                            className="flex w-full gap-2 justify-center font-mono p-2 justify-self-end border-b-2 border-b-slate-600 font-bold"
                            title="Podsumowanie - suma zamówienia"
                        >
                            <span>Suma:</span>
                            <span>{total} zł</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <span>Numer stolika:</span>
                            <input
                                type="number"
                                className="border-2 border-slate-600 rounded-md p-2"
                                onChange={(e) => {
                                    setTableNumber(Number(e.target.value));
                                }}
                                title="Numer stolika"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button
                            className="w-full p-2 flex flex-col gap-2 text-green"
                            onClick={() => {
                                if (tableNumber) {
                                    completeOrder();
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faCashRegister} />
                            Zamów
                        </button>
                        <button
                            className="w-full p-2 text-red-500 flex flex-col gap-2"
                            onClick={() => {
                                setOrderSummaryView(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Powrót
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-4 justify-center flex-grow">
                    <div className="flex flex-col gap-2 justify-center">
                        <span
                            className="text-green-500"
                            title="Zamówienie złożone"
                        >
                            Zamówienie zostało złożone.
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Order() {
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [cart, setCart] = useState<Record<number, number>>({});
    const [orderSummaryView, setOrderSummaryView] = useState(false);

    const addToCart = (id: number) => {
        setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
    };

    const removeFromCart = (id: number) => {
        const newCart = { ...cart };
        if (newCart[id] > 0) {
            newCart[id] -= 1;
        }
        setCart(newCart);
    };

    const resetCart = () => {
        setCart({});
    };

    useEffect(() => {
        fetchMenu().then(data => {
            setMenu(data);
        });
    }, []);

    return (
        <>
            {!orderSummaryView ? (
                <div className="grow grid grid-cols-12 gap-4 overflow-auto">
                    <div className="overflow-auto flex border-2 border-slate-600 rounded-lg col-span-9">
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-600 p-2">
                                    <th>Nazwa</th>
                                    <th>Cena</th>
                                    <th>Ilość</th>
                                    <th>Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menu.map((item) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className="text-center odd:bg-gray-200"
                                        >
                                            <td>{item.name}</td>
                                            <td>{item.price} zł</td>
                                            <td>{cart[item.id] || 0}</td>
                                            <td>
                                                <div className="flex gap-2 justify-around">
                                                    <button
                                                        className="text-green-500 p-5"
                                                        onClick={() => {
                                                            addToCart(item.id);
                                                        }}
                                                        aria-label={`Add to cart`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                        />
                                                    </button>
                                                    <button
                                                        aria-label={`Remove from cart`}
                                                        className="text-red-500 p-5"
                                                        onClick={() => {
                                                            removeFromCart(
                                                                item.id
                                                            );
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faMinus}
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
                    <div className="flex flex-col gap-2 col-span-3 overflow-auto">
                        <div className="overflow-auto flex flex-col grow row-span-4 w-full border-2 border-slate-600 rounded-md">
                            <div className="flex w-full gap-2 justify-center font-mono p-2 justify-self-end border-b-2 border-b-slate-600 font-bold">
                                <span>Suma:</span>
                                <span>
                                    {Object.entries(cart).reduce(
                                        (acc, [id, count]) => {
                                            const item = menu.find(
                                                (item) => item.id === Number(id)
                                            );
                                            if (!item) {
                                                return acc;
                                            }
                                            return acc + item.price * count;
                                        },
                                        0
                                    )}{" "}
                                    zł
                                </span>
                            </div>
                            <table className="table-fixed">
                                <tbody>
                                    {menu.map((item) => {
                                        if (cart[item.id] > 0) {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="even:bg-gray-200"
                                                    aria-label="Cart item"
                                                >
                                                    <td className="grow">
                                                        {item.name}
                                                    </td>
                                                    <td>
                                                        {item.price *
                                                            cart[item.id]}{" "}
                                                        zł
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col gap-2 justify-end">
                            <button
                                className="w-full p-2 flex flex-col gap-2 text-green"
                                onClick={() => {
                                    setOrderSummaryView(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faCashRegister} />
                                Zamów
                            </button>
                            <button
                                className="w-full p-2 text-red-500 flex flex-col gap-2"
                                onClick={() => {
                                    resetCart();
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <OrderSummary
                    order={cart}
                    setCart={setCart}
                    setOrderSummaryView={setOrderSummaryView}
                    menu={menu}
                />
            )}
        </>
    );
}