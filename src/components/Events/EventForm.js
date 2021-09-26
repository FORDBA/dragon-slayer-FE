import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { DungeonContext } from "../Dungeons/DungeonProvider"
import "./Events.css"
import { useHistory, useParams } from "react-router"


export const EventForm = (props) => {

    const { addEvent, updateEvent, getEventById } = useContext(EventContext)
    const { dungeons, getDungeons } = useContext(DungeonContext)
    const [event, setEvent] = useState({
        date: ""
    })
    const { eventId } = useParams()
    const history = useHistory()

    const handleControlledInputChange = (e) => {

        const newEvent = { ...event }
        newEvent[e.target.name] = e.target.value
        setEvent(newEvent)
    }





    useEffect(() => {
        getDungeons()
    }, [])


    useEffect(() => {
        if (eventId) {
            getEventById(eventId)
                .then(setEvent)
        }
    }, [eventId])


    const constructNewEvent = () => {
        const dungeonId = parseInt(event.dungeonId)



        if (dungeonId === 0) {
            window.alert("Please select a dungeon")
        } else {
            if (eventId) {

                updateEvent({
                    id: event.id,
                    name: event.name,
                    date: event.date,
                    dungeonId: dungeonId,
                    userId: parseInt(sessionStorage.getItem("guild_user"))

                })
                    .then(() => history.push("/events"))
            } else {

                addEvent({
                    name: event.name,
                    date: event.date,
                    dungeonId: dungeonId,
                    userId: parseInt(sessionStorage.getItem("guild_user"))

                })
                    .then(() => history.push("/events"))
            }
        }
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">{eventId ? "Update Boss" : "Add Boss"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Event Name"
                        defaultValue={event.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="eventDate"> Add Date </label>
                <input value={event.date} type="date"
                    name="date"
                    className="form-control"
                    required
                    onChange={handleControlledInputChange}
                />
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dungeonId">Dungeon: </label>
                    <select name="dungeonId" className="form-control"
                        value={event.dungeonId}
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



            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEvent()
                }}
                className="btn btn-primary">
                {eventId ? "Save Updates" : "Save"}
            </button>
        </form>
    )
}