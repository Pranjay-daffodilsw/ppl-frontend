import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { update_user_data } from "../../redux";
import HeaderComponent from './HeaderComponent';

function Header(props) {
    const loginTrue = useSelector(state => state.user.loginStatus.loginTrue)
    const dispatch = useDispatch();
    dispatch(update_user_data({
        loginTrue: localStorage.getItem('loginTrue')
    }))
    const logoutHandler = () => {
        localStorage.setItem('loginTrue', false);
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('lname');
        localStorage.removeItem('fname');
        localStorage.removeItem('email');
        dispatch(update_user_data({
            loginTrue: false
        }));
    }
    let username = '';
    let navigationLinks;
    if (loginTrue === 'true') {
        username = localStorage.getItem('username');
        navigationLinks = (
            <li key={'logout'}><Link style={{ color: "white" }} onClick={logoutHandler} to='/login'>&nbsp;Logout</Link></li>
        );
    }
    else {
        username = 'Unregistered';
        navigationLinks = (
            <li key={'login'}></li>
        );
        // <Link to={{ pathname: '/login' }} className='active'>Login</Link>
    }
    return (
        <div>
            <HeaderComponent
                username={username}
                navigationLinks={navigationLinks}
             />
        </div>
    )


}

export default Header;