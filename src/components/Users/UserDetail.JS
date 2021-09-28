import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserProvider";
import { useHistory, useParams } from "react-router";
import { ProfessionContext } from "../Professions/ProfessionProvider";
import { Button } from "react-bootstrap"

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
            <div className="ProfileContainer__top">

                <div className="profile__left">



                    <img className="profile__image" src={user.photo} alt="" />
                    <h1 className="profile__name">{user.name}</h1>
                </div>
                <div className="profile__right">
                    <div className="listDetails">
                        <div className="profile__rank"><span className='detailHeader'>Rank:</span> {user.rank.name}</div>
                        <div className="profile__race"><span className='detailHeader'>Race:</span> {user.race.name} </div>
                        <div className="profile__details"><span className='detailHeader'>Class:</span> {user.class.name}</div>
                        <div className="profile__role"><span className='detailHeader'>Role:</span> {user.role.name}</div>
                        <div className="profile__Professions"><span className='detailHeader'>Professions:</span> {user.profession1?.name} and {user.profession2?.name}</div>
                    </div>
                </div>

            </div>
            <div className="ProfileContainer__bottom">
                <h3>About</h3>
                <div className="profile__Summary">{user.summary}</div>
                {loggedInUser && <Button className="d-block ml-auto my-2" type="button" onClick={() => {
                    history.push(`/profile/edit/${user.id}`)
                }}>Edit Profile</Button>}
            </div>


        </>
    )
}