import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, Form } from 'react-bootstrap'
import axios from "axios"
import {Url} from './ApiUrl'


const Operation = ({operation, props}) => {
    const [idDel, setIdDel] = useState({})
    const [showDel, setShowDel] = useState(false)
    const [show, setShow] = useState(false)
    const [operations, setOperations] = useState({concept:"", amount: 0, date: "", category:"", id: operation._id})
    const seeInput = e => {
        const value = e.target.value
        const campo = e.target.name
        setOperations({
            ...operations,
            [campo]: value
        })
    }
    const edit = () =>{
        if(operations.concept !=="" && operations.amount !== 0 && operations.date !== "" && operations.category!== "") {
            axios.put(`${Url}/operation`, operations)
            setOperations({concept:"", amount: "", date: "", category:"", id:""})
            setShow(false);
        }
    }
    const showDelet = (operation) => {
        setIdDel(operation._id)
        setShowDel(!showDel)
    }
    const delet = () => {
        console.log(idDel)
        axios.delete(`${Url}/operation`, { data: { id: idDel } })
        .then(
            setIdDel(""),
            setShowDel(!showDel))
    }
    
    const handleCloseDel = () => setShowDel(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if(props.loggedUser) {

    }
    return(
    <>
    {props.loggedUser && props.loggedUser.id === operation.userId ?
        <tr>
           <td>{operation.concept}</td>
           <td>{operation.amount}$</td>
           <td>{operation.date}</td>
           <td>{operation.category}
           <FontAwesomeIcon icon={faTrash} onClick={() =>{showDelet(operation)}} />
           <FontAwesomeIcon icon={faEdit} onClick={handleShow} /></td>
        </tr> 
        :
        <tr>
           <td>{operation.concept}</td>
           <td>{operation.amount}$</td>
           <td>{operation.date}</td>
           <td>{operation.category}</td>
        </tr>
    }
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
                    <Form.Control name="date" onChange={seeInput} placeholder="Date" />
                    <Form.Control name="category" onChange={seeInput} as="select" placeholder="Category">
                        <option>Category</option>
                        <option>food</option>
                        <option>tech</option>
                        <option>taxes</option>
                        <option>gym</option>
                        <option>others</option>
                    </Form.Control>
                </Form.Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button onClick={edit} variant="primary" type="submit">
                Edit operation 
            </Button>
        </Modal.Footer>
    </Modal>
    <Modal className="d-flex ustify-content-center align-items-center" show={showDel} onHide={handleCloseDel}>
        <Modal.Header>
            <Modal.Title>Delete operation?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-around">
            <Button variant="danger" onClick={handleCloseDel}>
                No
            </Button>
            <Button onClick={delet} variant="primary" type="submit">
                Yes 
            </Button>
        </Modal.Body>
    </Modal>
    </>
    )
}
export default Operation