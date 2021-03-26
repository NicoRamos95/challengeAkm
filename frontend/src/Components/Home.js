import { Button, Form, Alert } from 'react-bootstrap'


const Home = () => {

    return (
    <>
        <h3>Write operation wants to do?</h3>
        <Form className="d-flex justify-content-center align-items-center m-1">
            <Form.Row>
                <Form.Control placeholder="Concept" />
                <Form.Control placeholder="Amount" />
            </Form.Row>
            <Form.Row>
                <Form.Control placeholder="Date" />
                <Form.Control as="select" placeholder="Category">
                    <option>Category</option>
                    <option>food</option>
                    <option>tech</option>
                    <option>taxes</option>
                    <option>gym</option>
                    <option>others</option>
                </Form.Control>
                <Form.Control as="select" placeholder="Type">
                    <option>Type</option>
                    <option>deposit</option>
                    <option>withdrae money</option>
                </Form.Control>
            </Form.Row>
        </Form>
            <Button variant="primary" type="submit">
                Charge operation 
            </Button>
    </>
    )

}

export default Home 