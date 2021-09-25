import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom";
import { RankContext } from "../Ranks/RankProvider"
import { RoleContext } from "../Roles/RoleProvider"
import { RaceContext } from "../Races/RaceProvider"
import { ClassContext } from "../Classes/ClassProvider"
import "./Login.css"

export const Register = () => {

    const [registerUser, setRegisterUser] = useState({
        name: "",
        email: "",
        rank: 0,
        role: 0,
        class: 0,
        race: 0,
        userSummary: ""


    })
    const [conflictDialog, setConflictDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const { ranks, getRanks } = useContext(RankContext)
    const { roles, getRoles } = useContext(RoleContext)
    const { races, getRaces } = useContext(RaceContext)
    const { classes, getClasses } = useContext(ClassContext)
    const history = useHistory()



    useEffect(() => {
        getRanks()
        getRoles()
        getRaces()
        getClasses()


    }, [])


    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'wgwpr9x3')
        setLoading(true)
        const res = await fetch("https://api.cloudinary.com/v1_1/dbdxcl9wd/image/upload",
            {
                method: 'POST',
                body: data
            })
        const file = await res.json()
        console.log(file)

        setImage(file.secure_url)
        setLoading(false)


    }


    const handleInputChange = (event) => {
        const newUser = { ...registerUser }
        newUser[event.target.id] = event.target.value
        setRegisterUser(newUser)
    }

    const existingUserCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8088/users?email=${registerUser.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    if (registerUser.email === "" || registerUser.name === "" || registerUser.rank == 0 || registerUser.role == 0 || registerUser.class == 0 || registerUser.class == 0 || image === "") {
                        window.alert("please fill out all of the fields")
                    } else {

                        // If your json-server URL is different, please change it below!
                        fetch("http://localhost:8088/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: registerUser.email,
                                name: registerUser.name,
                                rankId: parseInt(registerUser.rank),
                                roleId: parseInt(registerUser.role),
                                classId: parseInt(registerUser.class),
                                raceId: parseInt(registerUser.race),
                                photo: image,
                                summary: registerUser.userSummary
                            })
                        })
                            .then(res => res.json())
                            .then(createdUser => {
                                if (createdUser.hasOwnProperty("id")) {
                                    // The user id is saved under the key nutshell_user in session Storage. Change below if needed!
                                    sessionStorage.setItem("itb_user", createdUser.id)
                                    history.push("/")
                                }
                            })
                    }
                }
                else {
                    setConflictDialog(true)
                }
            })

    }

    return (
        <main className="container--register">

            <dialog className="dialog dialog--password" open={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => setConflictDialog(false)}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>

                <h2>Please Register for DragonSlayer</h2>
                <label htmlFor="name"> Character Name </label>
                <input type="text" name="name" id="name" className="form-control" placeholder="Name" required autoFocus value={registerUser.name} onChange={handleInputChange} required />
                <label htmlFor="inputEmail"> Email address </label>
                <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required value={registerUser.email} onChange={handleInputChange} required />
                <label htmlFor="userPhoto"> Add Photo </label>
                <div><input type="file"
                    name="userPhoto"
                    className="form-control"
                    required
                    onChange={uploadImage}
                />

                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            <img class="profile-Image" src={image} />
                        )
                    }
                </div>
                <label htmlFor="rank">Guild Rank: </label>
                <select defaultValue="" name="rank" id="rank" className="form-control" onChange={handleInputChange} required>
                    <option value="0">Select a Rank</option>
                    {ranks.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="role">Role: </label>
                <select defaultValue="" name="role" id="role" className="form-control" onChange={handleInputChange} required>
                    <option value="0">Select a Role</option>
                    {roles.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="race">Race: </label>
                <select defaultValue="" name="race" id="race" onChange={handleInputChange} className="form-control" required >
                    <option value="0">Select a Rank</option>
                    {races.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="class">Class: </label>
                <select defaultValue="" name="class" id="class" onChange={handleInputChange} className="form-control" required >
                    <option value="0">Select a Class</option>
                    {classes.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="userSummary"> Summary </label>
                <textarea id="userSummary" onChange={handleInputChange} type="userSummary"
                    name="userSummary"
                    className="form-control"
                    required />
                <button className="submitButton" type="submit"> Sign in </button>
            </form>
        </main>
    )
}