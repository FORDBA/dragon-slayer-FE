import React, { useState, useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router";
import { RankContext } from "../Ranks/RankProvider"
import { RoleContext } from "../Roles/RoleProvider"
import { RaceContext } from "../Races/RaceProvider"
import { ClassContext } from "../Classes/ClassProvider"
import "./Login.css"
import { ProfessionContext } from "../Professions/ProfessionProvider";
import { UserContext } from "../Users/UserProvider";

export const Register = () => {

    const [registerUser, setRegisterUser] = useState({
        name: "",
        email: "",
        rankId: 0,
        roleId: 0,
        classId: 0,
        raceId: 0,
        profession1Id: 0,
        profession2Id: 0,
        summary: ""


    })
    const [conflictDialog, setConflictDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const { updateUser, getUserById, addUser } = useContext(UserContext)
    const { ranks, getRanks } = useContext(RankContext)
    const { roles, getRoles } = useContext(RoleContext)
    const { races, getRaces } = useContext(RaceContext)
    const { classes, getClasses } = useContext(ClassContext)
    const { professions, getProfessions } = useContext(ProfessionContext)
    const history = useHistory()
    const { userId } = useParams()



    useEffect(() => {
        getRanks()
        getRoles()
        getRaces()
        getClasses()
        getProfessions()


    }, [])

    useEffect(() => {
        if (userId) {
            getUserById(userId)
                .then(resp => {
                    setRegisterUser(resp)
                    setImage(resp.photo)
                })
        }
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

        if (userId) {
            updateUser({
                id: registerUser.id,
                email: registerUser.email,
                name: registerUser.name,
                rankId: parseInt(registerUser.rankId),
                roleId: parseInt(registerUser.roleId),
                classId: parseInt(registerUser.classId),
                raceId: parseInt(registerUser.raceId),
                profession1Id: parseInt(registerUser.profession1Id),
                profession2Id: parseInt(registerUser.profession2Id),
                photo: image,
                summary: registerUser.summary
            }).then(() => history.push(`/profile/${registerUser.id}`))
        } else {
            existingUserCheck()
                .then((userExists) => {
                    if (!userExists) {
                        if (registerUser.email === "" || registerUser.name === "" || registerUser.rank === "0" || registerUser.role === "0" || registerUser.class === "0" || registerUser.class === "0" || image === "") {
                            window.alert("please fill out all of the fields")
                        } else {


                            // If your json-server URL is different, please change it below!
                            addUser({
                                email: registerUser.email,
                                name: registerUser.name,
                                rankId: parseInt(registerUser.rankId),
                                roleId: parseInt(registerUser.roleId),
                                classId: parseInt(registerUser.classId),
                                raceId: parseInt(registerUser.raceId),
                                profession1Id: parseInt(registerUser.profession1Id),
                                profession2Id: parseInt(registerUser.profession2Id),
                                photo: image,
                                summary: registerUser.summary
                            })
                                .then(createdUser => {
                                    if (createdUser.hasOwnProperty("id")) {
                                        // The user id is saved under the key nutshell_user in session Storage. Change below if needed!
                                        sessionStorage.setItem("guild_user", createdUser.id)
                                        history.push(`/profile/${createdUser.id}`)
                                    }


                                    else {
                                        setConflictDialog(true)
                                    }
                                })
                        }
                    }
                })
        }


    }

    return (
        <main className="container--register">

            <dialog className="dialog dialog--password" open={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => setConflictDialog(false)}>Close</button>
            </dialog>

            <form className="form--login" >

                <h2>Please Register for DragonSlayer</h2>
                <label htmlFor="name"> Character Name </label>
                <input type="text" name="name" id="name" className="form-control" placeholder="Name" required autoFocus value={registerUser.name} onChange={handleInputChange} />
                <label htmlFor="inputEmail"> Email address </label>
                <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required value={registerUser.email} onChange={handleInputChange} />
                <label htmlFor="userPhoto"> Add Photo </label>
                <div><input type="file"
                    name="userPhoto"
                    className="form-control"
                    onChange={uploadImage}
                />

                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            <img className="profile-Image" src={image} alt="" />
                        )
                    }
                </div>
                <label htmlFor="rank">Guild Rank: </label>
                <select name="rank" id="rankId" value={registerUser.rankId} className="form-control" onChange={handleInputChange} required>
                    <option value="0">Select a Rank</option>
                    {ranks.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="role">Role: </label>
                <select name="role" id="roleId" className="form-control" value={registerUser.roleId} onChange={handleInputChange} required>
                    <option value="0">Select a Role</option>
                    {roles.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="race">Race: </label>
                <select name="race" id="raceId" onChange={handleInputChange} value={registerUser.raceId} className="form-control" required >
                    <option value="0">Select a Rank</option>
                    {races.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="class">Class: </label>
                <select name="class" id="classId" value={registerUser.classId} onChange={handleInputChange} className="form-control" required >
                    <option value="0">Select a Class</option>
                    {classes.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="prof1">1st Profession: </label>
                <select name="prof1" id="profession1Id" value={registerUser.profession1Id} onChange={handleInputChange} className="form-control" required >
                    <option value="0">Select a Profession</option>
                    {professions.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="prof2">2nd Profession: </label>
                <select name="prof2" id="profession2Id" value={registerUser.profession2Id} onChange={handleInputChange} className="form-control" required >
                    <option value="0">Select a Profession</option>
                    {professions.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="userSummary"> Summary </label>
                <textarea id="summary" onChange={handleInputChange} type="userSummary"
                    name="userSummary"
                    defaultValue={registerUser.summary}
                    className="form-control"
                    required />
                <button className="submitButton" onClick={handleRegister} type="submit"> {userId ? "Save Updates" : "Register"} </button>
            </form>
        </main>
    )
}