import React, { useContext, useState, useEffect } from "react"
import { BossContext } from "./BossProvider"
import { DungeonContext } from "../Dungeons/DungeonProvider"
import "./Bosses.css"
import { useHistory, useParams } from "react-router"
import { Button } from "react-bootstrap"


export const BossForm = (props) => {

    const { dungeons, getDungeons } = useContext(DungeonContext)
    const { addBoss, updateBoss, getBossById } = useContext(BossContext)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const history = useHistory()

    const [boss, setBoss] = useState({})


    const { bossId } = useParams()

    useEffect(() => {
        getDungeons()
    }, [])


    useEffect(() => {
        if (bossId) {
            getBossById(bossId)
                .then(resp => {
                    setBoss(resp)
                    setImage(resp.photo)
                })
        }
    }, [])

    const handleControlledInputChange = (event) => {

        const newBoss = { ...boss }
        newBoss[event.target.id] = event.target.value
        setBoss(newBoss)
    }




    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'wgwpr9x3')
        setLoading(true)
        const res = await fetch("https://api.cloudinary.com/v1_1/dbdxcl9wd/image/upload",
            {
                method: 'POST',
                body: data
            })
        const file = await res.json()
        console.log(file)

        setImage(file.secure_url)
        setLoading(false)


    }




    const constructNewBoss = () => {

        const dungeonId = parseInt(boss.dungeonId)

        if (dungeonId === 0) {
            window.alert("Please select a dungeon")
        } else {
            if (bossId) {

                updateBoss({
                    id: boss.id,
                    name: boss.name,
                    photo: image,
                    dungeonId: dungeonId,
                    summary: boss.summary,
                    status: boss.status
                })
                    .then(() => history.push("/bosses"))
            } else {

                addBoss({
                    name: boss.name,
                    photo: image,
                    dungeonId: dungeonId,
                    summary: boss.summary,
                    status: boss.status
                })
                    .then(() => history.push("/bosses"))
            }
        }
    }

    return (
        <form className="bossForm">
            <h2 className="bossForm__title">{bossId ? "Update Boss" : "Add Boss"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Boss name: </label>
                    <input type="text" name="name" id="name" required autoFocus className="form-control"
                        placeholder="Boss name"
                        defaultValue={boss.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="bossPhoto"> Add Photo </label>
                <div><input type="file"
                    name="bossPhoto"
                    className="form-control"
                    required
                    onChange={uploadImage}
                />

                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            <img src={image} alt="" />
                        )
                    }
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="bossSummary"> Summary </label>
                <textarea type="bossSummary"
                    id="summary"
                    name="bossSummary"
                    className="form-control"
                    defaultValue={boss.summary}
                    required
                    onChange={handleControlledInputChange}
                />
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="dungeonId">Dungeon: </label>
                    <select name="dungeonId" id="dungeonId" className="form-control"
                        value={boss.dungeonId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a Dungeon</option>
                        {dungeons.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Boss status: </label>
                    <input type="text" name="status" id="status" required autoFocus className="form-control"
                        placeholder="Boss status"
                        defaultValue={boss.status}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <Button className="d-block ml-auto my-2" type="button"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewBoss()
                }}
                className="btn btn-primary">
                {bossId ? "Save Updates" : "Save"}
            </Button>
        </form>
    )
}