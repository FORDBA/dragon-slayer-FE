import React, { useState } from "react"


export const DungeonContext = React.createContext()

export const DungeonProvider = (props) => {
    const [dungeons, setDungeons] = useState([])

    const getDungeons = () => {
        return fetch("http://localhost:8088/dungeons")
            .then(res => res.json())
            .then(setDungeons)
    }





    return (
        <DungeonContext.Provider value={{
            dungeons, getDungeons
        }}>
            {props.children}
        </DungeonContext.Provider>
    )
}