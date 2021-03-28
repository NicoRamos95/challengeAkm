import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Button, Form, Alert } from 'react-bootstrap'
import userActions from '../redux/actions/userActions';


const Register = (props) => {
    const [newUser, setNewUser] = useState({firstName: "", password: "", email: "", urlPic: ""})
    const [errors, setErrors] = useState([])

    const seeInput = e => {
        const value = e.target.value
        const campo = e.target.name
        setNewUser({
            ...newUser,
            [campo]: value
        })
    }
    
    const validateUser = async e => {
        e.preventDefault()
        setErrors([])
        const response = await props.addUser(newUser)
        console.log(response)
        if (response && !response.success) {
            setErrors(response.errores)
        } else {
            props.history.push('/')
        }
    }
  
    return (
        <>
        <div className="container d-flex justify-content-center">
            <div className="row col-6">
                <h1 className="titulo">Register</h1>
                <Form className="">
                    <Form.Row className="d-flex">
                        <Form.Control onChange={seeInput} name="firstName" type="text" placeholder="FirstName"/>
                        <Form.Control onChange={seeInput} name="urlPic" type="text" placeholder="UrlPic"/>
                    </Form.Row>
                    <Form.Row>
                        <Form.Control onChange={seeInput} name="email" type="text" placeholder="Email"/>
                        <Form.Control onChange={seeInput} name="password" type="password" placeholder="Password"/>
                    </Form.Row>
                    <Button onClick={validateUser} className="m-5" type="submit">Register</Button>
                </Form>
            </div>
        </div>
            <div>
                {errors.map((error, index) =>
                    <h5 key={index}>
                        {error}
                    </h5>
                )}
            </div>
            </>
    )
}

const mapDispatchToProps = {
    addUser: userActions.newUser
}

const mapStateToProps = state => {
    return {
        loggedUser: state.userReducer.loggedUser
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Register)