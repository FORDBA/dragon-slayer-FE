import React, { useState } from "react"


export const ProfessionContext = React.createContext()

export const ProfessionProvider = (props) => {
    const [professions, setProfessions] = useState([])

    const getProfessions = () => {
        return fetch("http://localhost:8088/professions")
            .then(res => res.json())
            .then(setProfessions)
    }






    return (
        <ProfessionContext.Provider value={{
            professions, getProfessions
        }}>
            {props.children}
        </ProfessionContext.Provider>
    )
}