import { useEffect, useState } from "react";

export default function CartView() {
    const [total, setTotal] = useState(0);
    const [cartAddedItems, setCartAddedItems] = useState([]);


    useEffect(() => {
        // Initialize the cartAddedItems state with the items from the 'res' prop
        const cart = sessionStorage.getItem('cart')
        console.log(cart)
        setCartAddedItems(JSON.parse(cart));
    }, []);

    const handleRemoveFromCart = (item) => {
        const updatedCartItems = cartAddedItems.filter((cartItem) => cartItem.id !== item.id);
        setCartAddedItems(updatedCartItems);
    };

    const handleIncrement = (item) => {
        const updatedCartItems = [...cartAddedItems];
        const itemIndex = updatedCartItems.findIndex((cartItem) => cartItem.id === item.id);
        updatedCartItems[itemIndex].quantity++;
        setCartAddedItems(updatedCartItems);
    };


    const handleDecrement = (item) => {
        const updatedCartItems = [...cartAddedItems];
        const itemIndex = updatedCartItems.findIndex((cartItem) => cartItem.id === item.id);
        if (updatedCartItems[itemIndex].quantity > 1) {
            updatedCartItems[itemIndex].quantity--;
            setCartAddedItems(updatedCartItems);
        } else {
            // If quantity is 1 or less, remove the item from the cart
            handleRemoveFromCart(item);
        }
    };

    useEffect(() => {
        const newTotal = cartAddedItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        setTotal(newTotal);
    }, [cartAddedItems]);
    return (



        <>
            <div className="row pt-5 mt-4 px-3">
                <div className="col-6">



                    <div className="card p-3">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th colSpan="3"><h5>Confirm Order</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartAddedItems.length !== 0 ? (
                                    cartAddedItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.title}</td>
                                            <td className="text-center">
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn cartbtn" onClick={() => handleIncrement(item)}> + </button>
                                                    <button type="button" className="btn disabled cartbtn" style={{ borderColor: 'none' }}> {item.quantity} </button>
                                                    <button type="button" className="btn cartbtn" onClick={() => handleDecrement(item)}> - </button>
                                                </div>
                                            </td>
                                            <td>${item.price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">Your cart is empty.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="card py-4 px-2">
                            <h4>Amount Breakup</h4>
                            <h6>Net Total:${total}</h6>
                            <h6>Platform Fee:${total % 18}</h6>

                            <h5>Net Payable:${total + (total % 18)}</h5>


                        </div>
                        <button className="btn cartviewbtn my-3" disabled={cartAddedItems.length === 0} data-bs-toggle="modal" data-bs-target="#bookingmodal" >Confirm Payment</button>


                        <div className="modal fade" id="bookingmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">

                                <div className="modal-content">


                                    <div className="modal-body my-2 justify-content-center">

                                        <img className="w-100" src="https://cdn.dribbble.com/users/147386/screenshots/5315437/media/64a3a80eb03d6fe459abd7e7c1d889f9.gif" alt="" />

                                        <h3 className="text-center">Booking Confirmed</h3>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}



