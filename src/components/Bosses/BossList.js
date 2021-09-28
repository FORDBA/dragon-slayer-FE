import React, { useState, useContext, useEffect } from "react"
import { BossContext } from "./BossProvider"
import { useHistory } from "react-router-dom"
import { Card } from "react-bootstrap"
import "./Bosses.css"
import { DungeonContext } from "../Dungeons/DungeonProvider"
import { Button } from "react-bootstrap"


export const BossList = () => {
    const { bosses, getBosses } = useContext(BossContext)
    const { dungeons, getDungeons } = useContext(DungeonContext)
    const [filteredBosses, setFiltered] = useState([])
    const [selectedDungeon, selectDungeon] = useState(0)
    const history = useHistory()

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
            <div className="bossHeader">

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
                <Button className="d-block ml-auto my-2" type="button" onClick={() => history.push("/bosses/create")}>
                    Add Boss
                </Button>

            </div>

            <article className="bosses__container">

                <div className="bosses" >
                    {
                        filteredBosses.map(boss => {
                            return <Card style={{ width: '18rem' }} className="boss" key={boss.id}>
                                <Card.Title>
                                    {boss.name}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{boss.dungeon.name}</Card.Subtitle>
                                <Card.Link href={`/bosses/${boss.id}`}>
                                    View Details
                                </Card.Link>
                            </Card>
                        })
                    }
                </div>
            </article>
        </div>
    )
}