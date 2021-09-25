import React, { useState } from "react"


export const RankContext = React.createContext()

export const RankProvider = (props) => {
    const [ranks, setRanks] = useState([])

    const getRanks = () => {
        return fetch("http://localhost:8088/ranks")
            .then(res => res.json())
            .then(setRanks)
    }





    return (
        <RankContext.Provider value={{
            ranks, getRanks
        }}>
            {props.children}
        </RankContext.Provider>
    )
}