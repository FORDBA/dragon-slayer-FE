import React, { useState } from "react"


export const RoleContext = React.createContext()

export const RoleProvider = (props) => {
    const [roles, setRoles] = useState([])

    const getRoles = () => {
        return fetch("http://localhost:8088/roles")
            .then(res => res.json())
            .then(setRoles)
    }




    return (
        <RoleContext.Provider value={{
            roles, getRoles
        }}>
            {props.children}
        </RoleContext.Provider>
    )
}