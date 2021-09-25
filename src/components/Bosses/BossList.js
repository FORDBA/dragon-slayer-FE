import React, { useState, useContext, useEffect } from "react"
import { BossContext } from "./BossProvider"
import { Link } from "react-router-dom"
import "./Bosses.css"
import { DungeonContext } from "../Dungeons/DungeonProvider"

export const BossList = ({ history }) => {
    const { bosses, getBosses } = useContext(BossContext)
    const { dungeons, getDungeons } = useContext(DungeonContext)
    const [filteredBosses, setFiltered] = useState([])
    const [selectedDungeon, selectDungeon] = useState(0)

    useEffect(() => {
        getDungeons()
        getBosses()
    }, [])
    useEffect(() => {

        if (selectedDungeon !== 0) {
            const matchingBosses = bosses.filter(boss => boss.dungeonId === selectedDungeon)
            setFiltered(matchingBosses)

        } else {
            setFiltered(bosses)
        }
    }, [selectedDungeon, bosses])

    const handleInputChange = (e) => {

        const dungeonId = parseInt(e.target.value)
        selectDungeon(dungeonId)

    }

    return (
        <div>
            <h1>Bosses</h1>

            <label htmlFor="race">Filter By Dungeon </label>
            <select defaultValue="" name="race" id="race" onChange={handleInputChange} className="form-control" required >
                <option value="0">Select a Dungeon</option>
                {dungeons.map(e => (
                    <option key={e.id} value={e.id}>
                        {e.name}
                    </option>
                ))}
            </select>


            <article className="bosses__container">
                <button onClick={() => history.push("/bosses/createboss")}>
                    Add Bosses
                </button>
                <div className="bosses" >
                    {
                        filteredBosses.map(boss => {
                            return <section className="boss" key={boss.id}>
                                <Link to={`/bosses/${boss.id}`}>
                                    <h3>{boss.name}</h3>

                                </Link>
                            </section>
                        })
                    }
                </div>
            </article>
        </div>
    )
}