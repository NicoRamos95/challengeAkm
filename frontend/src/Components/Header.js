import React from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
const Header = (props) => {
    if (props.loggedUser) {
        var links = <>
        <NavLink className="navlink" to="/" onClick={() => props.logoutUser()}>LogOut</NavLink>
                <div className="d-flex align-items-center justify-content-end">
                    <h3>Hi {props.loggedUser.firstName}! </h3>
                    <img src={props.loggedUser.urlPic} alt="..." width="50vw" className="rounded"/>
                </div>
        </>
    } else {
        // eslint-disable-next-line no-redeclare
        var links = <>
            <NavLink className="navlink" to="/register">Register</NavLink>
            <NavLink className="navlink" to="/login">login</NavLink>
        </>
    }
    return (
        <header>
            <div className="d-flex justify-content-between align-items-center m-3">
                <NavLink className="navlink" to="/">Home</NavLink>
                {links}
            </div>
        </header>
    )
} 
const mapStateToProps = state => {
    return {
        loggedUser: state.userReducer.loggedUser
    }
}
const mapDispacthToProps = {
    logoutUser: userActions.logOutUser
}
export default connect(mapStateToProps, mapDispacthToProps)(Header)