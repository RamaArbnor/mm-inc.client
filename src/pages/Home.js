import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddPanel from "../components/AddPanel.js";
import Bill from "../components/Bill.js";
import './home.css';
const axios = require('axios');

export default function Home(props) {

    const [bills, setBills] = useState([])
    const [main, setMain] = useState(0)
    const [total, setTotal] = useState(0)
    const [debtOwned, setDebtOwned] = useState(0)


    let { username } = useParams();

    let navigate = useNavigate();

    // let bills = [
    // < Bill
    //     icon='fa-solid fa-money-bills'
    //     name='admin'
    //     date='21.05.2021'
    //     description='Grocerious for torte'
    //     amount='5.18'
    // />
    // ];

    let data;

    function getBills() {
        axios.get('https://mm-inc.herokuapp.com/bills')
            .then(function (response) {
                // handle success
                data = response.data

                let temp = 0

                console.log('data gor')
                console.log(data)
                // setBills(billss)
                for (let i = 0; i < data.length; i++) {
                    temp = temp + parseFloat(data[i].amount.$numberDecimal)
                    console.log(temp)

                }

                let userTotal = 0;

                for (let i = 0; i < data.length; i++) {
                    if (data[i].name === username) {
                        userTotal = userTotal + parseFloat(data[i].amount.$numberDecimal)
                        console.log(userTotal)

                    }

                }

                setBills(data)
                setTotal(temp)
                setDebtOwned(userTotal / 3)

            })
            .catch(function (error) {
                // handle error

                console.log('error: ' + error);
            })
            .then(function () {
                // always executed
                // add(data)

            });
    }





    // onMount
    useEffect(() => {
        getBills()
        console.log('usefect: ' + bills)

    }, [total !== 0]);

    useEffect(() => {
        // getBills()
        console.log('update' + bills)

    }, []);

    function payBills() {
        for(let i = 0; i < bills.length; i++ ){
            let id = bills[i]._id
            axios.patch('https://mm-inc.herokuapp.com/pay', {
                id: id
              })
              .then(function (response) {
                console.log(response);
                dashboardClick()
              })
              .catch(function (error) {
                console.log(error);
              })
              .then(function () {
                // always executed
              });  
        }   
    }

    function logout() {
        navigate(`/`)
    }

    function addClick() {
        setMain(1)
        scrollToBottom()

    }

    function dashboardClick() {
        getBills()
        scrollToBottom()
        setMain(0)
    }

    function removeClick() {
        setBills(bills.filter(bill => bill.name === username))
        scrollToBottom()
    }

    const mainRef = useRef(null)

    const scrollToBottom = () => {
        mainRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    return (
        <div className="homePage">
            <div className="sidebar">
                <div className='menu'>
                    <div className="profile">
                        <div className="icon-container">
                            <i style={{ color: "black" }}
                                className="fa-solid fa-user-secret"></i>
                        </div>
                        <div >
                            <h2>{username}</h2>
                            <p>{username}@email.com</p>
                        </div>
                    </div>
                    <h3>Menu</h3>
                    <div className="menu-item" onClick={dashboardClick}>
                        <div style={{ backgroundColor: "#6A69E0" }} className="icon-container">
                            <i class="fa-solid fa-bars"></i>
                        </div>
                        <h4>Dashobard</h4>
                    </div>

                    <div className="menu-item" onClick={addClick}>
                        <div style={{ backgroundColor: "#22B07E" }} className="icon-container">
                            <i class="fa-solid fa-circle-plus"></i>
                        </div>
                        <h4>Add</h4>
                    </div>

                    <div className="menu-item" onClick={removeClick}>
                        <div style={{ backgroundColor: "#FF8702" }} className="icon-container">
                            <i class="fa-solid fa-circle-minus"></i>
                        </div>
                        <h4>Personal</h4>
                    </div>
                    {username === "admin"
                        ? (<div className="menu-item"  onClick={payBills}>
                            <div style={{ backgroundColor: "#33FFBD" }} className="icon-container">
                                <i class="fa-solid fa-comments-dollar"></i>
                            </div>
                            <h4>Pay All Bills</h4>
                        </div>)
                        : null
                    }

                </div>
                <div className="menu-item" id="logout" onClick={logout}>
                    <div style={{ backgroundColor: "#F6716D" }} className="icon-container">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    </div>
                    <h4>Log Out</h4>
                </div>

            </div>
            <div className='main' ref={mainRef}>
                <div className="total">
                    {/* bills[0].createdAt.split("T").shift() || */}
                    <p>Total since  : <span style={{ color: 'lime' }}>${total}</span></p>
                    <p>The others owe you: ${debtOwned.toFixed(2).substring(0, 5)}</p>
                </div>

                <div className="bill-section">

                    {main > 0 ? <AddPanel
                        name={username}
                        handleClick={dashboardClick}

                    /> : bills.map((bill) => {
                        // setTotal(total + bill.amount)

                        return (
                            <Bill
                                key={bill._id}
                                id={bill._id}
                                icon='fa-solid fa-money-bills'
                                name={bill.name}
                                date={bill.date}
                                description={bill.description}
                                amount={bill.amount.$numberDecimal}
                                function={dashboardClick}
                                deleteable={username === bill.name ? true : false}
                            />

                        );

                    })}

                    {/* {bills} */}

                </div>
            </div>
        </div>
    )

}