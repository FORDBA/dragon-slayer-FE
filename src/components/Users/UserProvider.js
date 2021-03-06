import React, { useCallback, useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getUsers = useCallback(() => {
        return fetch("http://localhost:8088/users?_expand=rank&_expand=class&_expand=role&_expand=race")
            .then(res => res.json())
            .then(setUsers)
    }, [setUsers])

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}?_expand=rank&_expand=class&_expand=role&_expand=race`)
            .then(res => res.json())
    }

    const addUser = user => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
    }

    const updateUser = user => {
        return fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }

    const deleteUser = (userId) => {
        return fetch(`http://localhost:8088/animals/${userId}`, {
            method: "DELETE"
        })
            .then(getUsers)
    }

    return (
        <UserContext.Provider value={{
            users, addUser, getUsers, getUserById,
            searchTerms, setSearchTerms, deleteUser, updateUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}