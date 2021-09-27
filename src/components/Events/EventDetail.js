import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { AttendingForm } from "../AttendingEvents/AttendingEventForm"
import { AttendingEventsList } from "../AttendingEvents/AttendingEventsList"
import { EventContext } from "./EventProvider"
import "./Events.css"






export const EventDetail = (props) => {
    const { deleteEvent, getEventById } = useContext(EventContext)
    const history = useHistory()
    const [event, setEvent] = useState({ user: {}, dungeon: {} })
    const { eventId } = useParams()
    const isOwner = parseInt(sessionStorage.getItem('guild_user')) === event.userId


    useEffect(() => {


        getEventById(eventId)
            .then(setEvent)
    }, [])
















    return (
        <main className="eventContainer">

            <h1 className="event__name">{event.name}</h1>
            <div className="event__dungeon">{event.dungeon.name}</div>


            <div className="event__date">{event.date}</div>
            <div className="event__creator">{event.user.name}</div>
            {isOwner && <button onClick={() => {
                history.push(`/events/edit/${event.id}`)
            }}>Edit</button>}

            <AttendingForm eventId={event.id} />
            <AttendingEventsList eventId={event.id} />
        </main>
    )
}