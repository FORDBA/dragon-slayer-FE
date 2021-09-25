import React, { useState, useContext, useEffect } from "react"
import { BossContext } from "./BossProvider"
import "./Bosses.css"
import { useParams, useHistory } from "react-router"





export const BossDetail = (props) => {
    const { deleteBoss, getBossById } = useContext(BossContext)
    const { bossId } = useParams()
    const history = useHistory()

    const [boss, setBoss] = useState({ dungeon: {} })

    useEffect(() => {

        getBossById(bossId)
            .then(setBoss)
    }, [])







    return (
        <main className="BossContainer">
            <div className="bossDiv">

                <h1 className="boss__name">{boss.name}</h1>

                <div><img class="boss__image" src={boss.photo} alt="" /></div>
                <div className="boss__summary">{boss.summary}</div>
                <div className="boss__dungeon">Dungeon: {boss.dungeon?.name}</div>
                <div className="boss__status">Status: {boss.status}</div>



                <button onClick={() => deleteBoss(boss.id).then(() => history.push("/bosses"))} >Delete Boss</button>
                <button onClick={() => {
                    props.history.push(`/bosses/edit/${boss.id}`)
                }}>Edit</button>


            </div>
        </main>
    )
}