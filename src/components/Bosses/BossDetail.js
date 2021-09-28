import React, { useState, useContext, useEffect } from "react"
import { BossContext } from "./BossProvider"
import "./Bosses.css"
import { useParams, useHistory } from "react-router"
import { CommentForm } from "../BossComments/BossCommentForm"
import { CommentList } from "../BossComments/BossCommentList"
import { CommentContext } from "../BossComments/BossCommentProvider"
import { Button } from "react-bootstrap"





export const BossDetail = (props) => {
    const { deleteBoss, getBossById } = useContext(BossContext)
    const { bossId } = useParams()
    const history = useHistory()
    const { getCommentsByBossId } = useContext(CommentContext);

    const [boss, setBoss] = useState({ dungeon: {} })

    useEffect(() => {

        getBossById(bossId)
            .then(setBoss)
            .then(() => getCommentsByBossId(bossId))
    }, [])







    return (
        <main className="BossContainer">
            <div className="bossDiv">

                <img className="boss__image" src={boss.photo} alt="" />
                <h1 className="boss__name">{boss.name}</h1>
            </div>
            <div className="boss__details">
                <div className="boss__dungeon"><span className='detailHeader'>Dungeon:</span> {boss.dungeon?.name}</div>
                <div className="boss__status"><span className='detailHeader'>Status:</span> {boss.status}</div>
            </div>

            <div className="boss__Bottom">
                <h3>Summary</h3>
                <div className="boss__summary">{boss.summary}</div>
                <div className="buttons">
                    <Button className="d-block ml-auto my-2" type="button" onClick={() => deleteBoss(boss.id).then(() => history.push("/bosses"))} >Delete Boss</Button>
                    <Button className="d-block ml-auto my-2" type="button" onClick={() => {
                        history.push(`/bosses/edit/${boss.id}`)
                    }}>Edit</Button>
                </div>
            </div>


            <CommentForm bossId={boss.id} />
            <CommentList bossId={boss.id} />


        </main>
    )
}