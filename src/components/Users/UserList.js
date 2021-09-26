import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { Card } from "react-bootstrap"
import "./Users.css"

export const UserList = props => {
    const { users, getUsers, searchTerms, setSearchTerms } = useContext(UserContext)
    const [filteredUsers, setFiltered] = useState([])

    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        if (searchTerms !== "") {

            const matchingUsers = users.filter(user => user.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(matchingUsers)
        } else {

            setFiltered(users)
        }

    }, [searchTerms, users])





    return (
        <div className="memberDiv">
            <h1 className="memberHeader">Guild Members</h1>

            <div className="userSearchBox">
                <input type="text"
                    className="input--wide"
                    onKeyUp={(event) => setSearchTerms(event.target.value)}
                    placeholder="Search for a member..." />
            </div>

            <article className="members">
                {
                    filteredUsers.map(user => {
                        return <Card style={{ width: '18rem' }} className="member" key={user.id}>
                            <Card.Body>
                                <Card.Title>
                                    {user.name}
                                </Card.Title>
                                <Card.Link href={`/profile/${user.id}`}>
                                    View Profile
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    })
                }
            </article>
        </div>
    )
}