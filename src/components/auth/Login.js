import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import logo from "../nav/Dragon Slayer Logo.png"
import "./Login.css"


export const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "" })
    const [existDialog, setExistDialog] = useState(false)

    const history = useHistory()

    const handleInputChange = (event) => {
        const newUser = { ...loginUser }
        newUser[event.target.id] = event.target.value
        setLoginUser(newUser)
    }


    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${loginUser.email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    sessionStorage.setItem("guild_user", exists.id)
                    history.push(`/profile/${exists.id}`)
                } else {
                    setExistDialog(true)
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>User does not exist</div>
                <Button className="d-block ml-auto my-2" type="button" onClick={e => setExistDialog(false)}>Close</Button>
            </dialog>
            <section className="loginSection">
                <form className="form--login" onSubmit={handleLogin}>
                    <div className="logo--login">
                        <img src={logo} alt="logo" />
                    </div>
                    <h2>Please sign in</h2>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required autoFocus
                        autoComplete="off"
                        value={loginUser.email}
                        onChange={handleInputChange} />
                    <Button className="d-block ml-auto my-2" type="submit">
                        Sign in
                    </Button>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Register for an account</Link>
            </section>
        </main>
    )
}