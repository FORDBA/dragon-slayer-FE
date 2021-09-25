import React, { useState } from "react"


export const RaceContext = React.createContext()

export const RaceProvider = (props) => {
    const [races, setRaces] = useState([])

    const getRaces = () => {
        return fetch("http://localhost:8088/races")
            .then(res => res.json())
            .then(setRaces)
    }





    return (
        <RaceContext.Provider value={{
            races, getRaces
        }}>
            {props.children}
        </RaceContext.Provider>
    )
}