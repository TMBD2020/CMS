import axios from 'axios';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

export default function AuthUser(){
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        console.log(user_detail);
        return user_detail;
    }


    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    // const saveToken = (user, token) => {
    //     sessionStorage.setItem('token', JSON.stringify(token));
    //     sessionStorage.setItem('user', JSON.stringify(user));
    //     sessionStorage.setItem('userType', user.type); // Store user type
    //     setToken(token);
    //     setUser(user);
    //     navigate('/dashboard'); // Redirect to dashboard
    // };

    const saveToken = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('userType', user.user_type); // Store user type
        setToken(token);
        setUser(user);
        navigate(user.user_type === 'super' ? '/Super' : '/Admin'); // Redirect based on user type
    };
    
    
    // const saveToken = (user,token) =>{
    //     sessionStorage.setItem('token',JSON.stringify(token));
    //     sessionStorage.setItem('user',JSON.stringify(user));
    //     setToken(token);
    //     setUser(user);
    //     window.location.href="/"
    // }

    // const logout = () => {
    //     sessionStorage.clear();
    //     navigate('/Login');
    // }

    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        // logout
    }
}