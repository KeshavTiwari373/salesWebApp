import { useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "../config"

const AddSales = () => {

    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amount, setAmount] = useState('');

    const addsale = (event) =>{
        event.preventDefault();
        const addData = {productName, quantity, amount};

        axios.post(`${API_BASE_URL}/addsale`, addData)
        .then((response) =>{
            try {
                if(response.status === 201 || response.status === 200){
                    console.log("sales added successfully");
                    setProductName('');
                    setQuantity('');
                    setAmount('');
                }

            } catch (error) {
                console.log(error);
            }
        })
    }

    return (
        //created a form for sales entry
        <div className="container mt-5">
            <h3 className="text-center">ADD SALE ENTRY</h3>
            <form onSubmit={(e) => addsale(e)} className="shadow-sm p-3">
                <div className="mb-3">
                    <label className="form-label text-muted">Product Name</label>
                    <input type="text" value={productName} onChange={(ev) => setProductName(ev.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label text-muted">Quantity</label>
                    <input type="number" value={quantity} onChange={(ev) => setQuantity(ev.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label text-muted">Amount</label>
                    <input type="number" value={amount} onChange={(ev) => setAmount(ev.target.value)} className="form-control" />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary ">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddSales