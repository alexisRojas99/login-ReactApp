import React, { useState } from 'react'
import { auth } from '../firebaseConfig'
import {useHistory} from 'react-router-dom'

export const Login = () => {

    const historial = useHistory()
    const [email, setEmail] = useState('')
    const [clave, setClave] = useState('')
    const [error, setError] = useState(null)

    const registrarUsuario = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(email, clave)
            .then(response => {
                historial.push('/')
            })
            .catch(e => {
                console.log(e)
                if (e.code === 'auth/invalid-email') {
                    setError('Formato Email Incorrecto')
                }

                if (e.code === 'auth/weak-password') {
                    setError('Debe contener 6 o más caracteres')
                }

                if (e.code === 'auth/email-already-in-use') {
                    setError('El Usuario Ya Existe')
                }
            })
    }

    const loginUsuario = () => {
        auth.signInWithEmailAndPassword(email, clave)
            .then(response => {
                historial.push('/Home')
            })
            .catch(e => {
                if (e.code === 'auth/wrong-password') {
                    setError('Contraseña Incorrecta')
                }
            })
    }

    return (
        <div className="row mt-5 justify-content-center">

            <div className="col-3">
                <form onSubmit={registrarUsuario} className="form-group">
                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" placeholder="Ingresa el Email" required />
                    <input onChange={(e) => { setClave(e.target.value) }} type="password" className="form-control mt-4" placeholder="Ingresa la Contraseña" required />
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <input type="submit" className="btn btn-dark mt-3" value="Registrar Usuario" />
                    </div>
                </form>
                <div className="d-grid gap-2 col-12 ms-auto mt-2">
                    <button onClick={loginUsuario} type="button" className="btn btn-success">Iniciar sesion</button>
                </div>

                {
                   error === 'Debe contener 6 o más caracteres' ?
                   <div className="alert alert-warning mt-2" role="alert">
                       {error}
                   </div> : <span></span>
                }

                {
                    error === 'Contraseña Incorrecta' ?
                    <div className="alert alert-danger mt-2" role="alert">
                        {error}
                    </div> :
                    <span></span>
                }

                {
                    error === 'El Usuario Ya Existe' ?
                    <div className="alert alert-info mt-2" role="alert">
                        {error}
                    </div> :
                    <span></span>
                }

            </div>

        </div>
    )
}

export default Login