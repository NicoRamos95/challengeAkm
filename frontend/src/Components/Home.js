import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form} from 'react-bootstrap'
import AddOperation from './addOperation'
import {Url} from './ApiUrl'
import { connect } from 'react-redux';
import Operation from './Operation'


const Home = (props) => {
    const [operations, setOperations] = useState([])
    useEffect(() => {
        axios.get(`${Url}/operation`)
        .then(respuesta => setOperations(respuesta.data.respuesta))
    },[operations])
    var subDeposit = 0
    var subWithdrawals = 0
    return (
        <>{props.loggedUser ?
            <AddOperation/>: <h1 className="bg-white">Log in for add operation</h1>}
        <div className="tablas">
            <div className="tabla">
                <h1>Deposit</h1>
                <table className="table">
                <thead>
                    <tr>
                    <th>Concept</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {operations.map(operation => {
                        if(operation.type === "deposit") {
                            var amountDeposit = parseInt(operation.amount, 10)
                            subDeposit = amountDeposit + subDeposit
                            return(
                                <Operation operation={operation} props={props} key={operation._id}/>
                            )
                        }
                    })
                    }
                </tbody>
                </table>
                    <h4>Subtotal: {subDeposit}$</h4>
            </div>
            <div className="tabla">
                <h1>Withdrae Money</h1>
                <table className="table">
                <thead>
                    <tr>
                    <th>Concept</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {operations.map(operation => {
                        if(operation.type === "withdrae money") {
                            var amount = parseInt(operation.amount, 10)
                            subWithdrawals = amount + subWithdrawals
                            return(
                                <Operation operation={operation} props={props} key={operation._id}/>
                            )
                        }
                    })
                    }
                </tbody>
                </table>
                    <h4>Subtotal: {subWithdrawals}$</h4>
            </div>
            <div className="d-flex justify-content-center">
                <h1 className="total">Total: {subWithdrawals + subDeposit}$</h1>
            </div>
        </div>
    </>
    )

}

const mapStateToProps = state => {
    return {
        loggedUser: state.userReducer.loggedUser
    }
  }

export default connect(mapStateToProps)(Home)