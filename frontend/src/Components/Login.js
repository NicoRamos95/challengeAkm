import { useState } from 'react';
import {Button, Form, Alert} from 'react-bootstrap'
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';


const Login = (props) => {
    const [userLogin, setUserLogin] = useState({email: "", password: ""})
    const [errors, setErrors] = useState([])

    const seeInput = e => {
        const value = e.target.value
        const campo = e.target.name
        setUserLogin({
            ...userLogin,
            [campo]: value
        })
    }
    console.log(props)
    const validateUser = async e => {
        setErrors([])
        const response = await props.loginUser(userLogin)
        if (response && !response.success) {
            setErrors([response.mensaje])
        } else {
            props.history.push('/')
        }
    }
    const keyPress = e => {
      if (e.key === 'Enter') {
        validateUser()
      }
    }
  
    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-6">
                <h1 className="titulo">Login</h1>
                <Form className="">
                    <Form.Control onKeyPress={keyPress} name="email" onChange={seeInput} type="text" placeholder="Email"/>
                    <Form.Control onKeyPress={keyPress} name="password" onChange={seeInput} type="password" placeholder="Password"/>
                    <Button onClick={validateUser} className="m-5">Login</Button>
                </Form>
            </div>
            <div>{errors && errors.map((error, index) => 
                    <Alert key={index}>
                        {error}
                    </Alert>
                )}
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.userReducer.loggedUser
    }
  }

const mapDispatchToProps = {
    loginUser: userActions.loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)