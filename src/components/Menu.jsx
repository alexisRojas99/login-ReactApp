import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {auth} from '../firebaseConfig'

export const Menu = () => {

    const historial = useHistory()
    const [usuario, setUsuario] = useState(null)

    useEffect( ()=> {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
                console.log(user.email)
            }
        })
    },[])

    const cerrarSesion = () => {
        auth.signOut()
        setUsuario(null)
        historial.push('/')
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-white">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            {
                                !usuario ?
                                <Link to="/Login" className="nav-link text-white">Login</Link>
                                :
                                <span></span>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                !usuario ?
                                <Link to="/Admin" className="nav-link text-white">Administrador</Link>
                                :
                                <span></span>
                            }
                        </li>
                    </ul>
                    {
                        usuario ? 
                        <div className="">
                            <button onClick={cerrarSesion} className="btn btn-danger">Cerrar sesion</button>
                        </div>
                        :
                        <span></span>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Menu