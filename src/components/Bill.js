import './components.css'
const axios = require('axios');


export default function Bill(props) {

    function deleteBill(){
        axios.delete(`https://backend-ivory-phi.vercel.app/delete/${props.id}`)
              .then(function (response) {
                // console.log(response);
                // dashboardClick()
                props.function()
              })
              .catch(function (error) {
                console.log(error);
              })
              .then(function () {
                // always executed
              }); 
    }

    return(
        <div className="bill">
            <div className="icon-part">
                <i className={props.icon}></i>                       
            </div>
            <p>{props.name}</p>  
            <p>{props.date}</p>
            <p>{props.description}</p>
            <p className='amount'>$ {props.amount}</p>   

            {props.deleteable && <i onClick={deleteBill} id='trashCan' class="fa-regular fa-trash-can"></i>}
            {!props.deleteable && <p></p>}

        </div>
    )

}