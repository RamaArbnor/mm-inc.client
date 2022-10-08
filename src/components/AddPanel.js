import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
const axios = require('axios');


export default function AddPanel(props) {

    const [description, setDescription] = useState()
    const [amount, setAmount] = useState()

    let navigate = useNavigate ();

    function addBill() {
        // console.log('aaa')
        axios.post('https://mm-inc.herokuapp.com/add/bill', {
            name: props.name,
            description: description,
            amount: parseFloat(amount),
            paid: false
        })
            .then(response => {
                console.log(response)
                console.log('aaa')
                props.handleClick()
    })
            .catch(error => {console.log(error)});
        // dashboardClick() Develepment Reason disable
    }

    return (
        <div className="addPanel">
            <h2>Add Bill</h2>
            <div className="nameInput" >Name: <input value={props.name} readonly="readonly"></input></div>
            <div>Description: <input onChange={(e) => { setDescription(e.target.value) }}></input></div>
            <div>Amount: <input type="number" onChange={(e) => { setAmount(e.target.value) }}></input></div>
            <button onClick={addBill}>Add</button>

        </div>
    )
}


{/* <Bill
        key={bill._id}      ----
        icon='fa-solid fa-money-bills'      ----
        name={bill.name}
        date={bill.date}    ----
        description={bill.description}
        amount={bill.amount}
    /> */}