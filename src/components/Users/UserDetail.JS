import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserProvider";
import { useHistory, useParams } from "react-router";
import { ProfessionContext } from "../Professions/ProfessionProvider";

export const UserDetail = (props) => {
    const { getUserById } = useContext(UserContext);
    const { professions, getProfessions } = useContext(ProfessionContext);
    const [user, setUser] = useState({ rank: {}, role: {}, class: {}, race: {} })
    const { userId } = useParams()
    const history = useHistory()
    const loggedInUser = sessionStorage.getItem('guild_user') === userId


    useEffect(() => {
        getProfessions()
        getUserById(userId)
            .then(setUser)


    }, [userId])

    user.profession1 = professions.find(p => p.id === user.profession1Id)
    user.profession2 = professions.find(p => p.id === user.profession2Id)

    return (
        <>
            <main className="ProfileContainer">

                <div className="characterContainer">



                    <img className="profile__image" src={user.photo} alt="" />
                    <h1 className="profile__name">{user.name}</h1>
                    <div className="listDetails">
                        <div className="profile__rank">{user.rank.name}</div>
                        <div className="profile__details">{user.race.name} {user.class.name}</div>
                        <div className="profile__role">{user.role.name}</div>
                        <div className="profile__Professions">{user.profession1?.name} and {user.profession2?.name}</div>
                    </div>
                    <div className="profile__Summary">{user.summary}</div>
                    {loggedInUser && <button onClick={() => {
                        history.push(`/profile/edit/${user.id}`)
                    }}>Edit</button>}



                </div>
            </main>
        </>
    )
}