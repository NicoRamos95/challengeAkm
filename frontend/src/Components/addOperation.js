import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import {Url} from './ApiUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const AddOperation = (props) => {
    const [show, setShow] = useState(false)
    const [operations, setOperations] = useState({concept:"", amount: 0, date: "", category:"", type:"", userId:""})
    const seeInput = e => {
        const value = e.target.value
        const campo = e.target.name
        setOperations({
            ...operations,
            [campo]: value
        })
    }
    useEffect(() => {
        setOperations({...operations, userId: props.loggedUser.id})
    }, [operations])
    const addOp = () => {
        if(operations.concept !=="" && operations.amount !== 0 && operations.date !== "" && operations.category!== "" && operations.type !=="") {
            console.log(operations)
            axios.post(`${Url}/operation`, operations)
            setOperations({concept:"", amount: "", date: "", category:"", type:"", userId:""})
            setShow(false);
        }
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
        <Button variant="primary" className="m-3" onClick={handleShow}>
            Charge operation 
            <FontAwesomeIcon icon={faPlusCircle}/>
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>Write operation wants to do?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex justify-content-center align-items-center m-1">
                    <Form.Row>
                        <Form.Control name="concept" onChange={seeInput} placeholder="Concept" />
                        <Form.Control name="amount" onChange={seeInput} placeholder="Amount" />
                    </Form.Row>
                    <Form.Row>
                        <input type="date" name="date" onChange={seeInput} />
                        {/* <DatePicker selected={startDate} 
                            dateFormat="MM/d/yyyy"
                            name="date" onChange={(e) => {console.log(e)}} /> */}
                        {/* <Form.Control name="date" onChange={seeInput} placeholder="Date" /> */}
                        <Form.Control name="category" onChange={seeInput} as="select" placeholder="Category">
                            <option>Category</option>
                            <option>food</option>
                            <option>tech</option>
                            <option>taxes</option>
                            <option>gym</option>
                            <option>others</option>
                        </Form.Control>
                        <Form.Control name="type" onChange={seeInput} as="select" placeholder="Type">
                            <option>Type</option>
                            <option>deposit</option>
                            <option>withdrae money</option>
                        </Form.Control>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button onClick={addOp} variant="primary" type="submit">
                Charge operation 
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
} 
const mapStateToProps = state => {
    return {
        loggedUser: state.userReducer.loggedUser
    }
}
export default connect(mapStateToProps)(AddOperation)