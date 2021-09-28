import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { AttendingForm } from "../AttendingEvents/AttendingEventForm"
import { AttendingEventsList } from "../AttendingEvents/AttendingEventsList"
import { EventContext } from "./EventProvider"
import { Button } from "react-bootstrap"
import "./Events.css"






export const EventDetail = (props) => {
    const { deleteEvent, getEventById } = useContext(EventContext)
    const history = useHistory()
    const [event, setEvent] = useState({ user: {}, dungeon: {} })
    const { eventId } = useParams()
    const isOwner = parseInt(sessionStorage.getItem('guild_user')) === event.userId

    const getReadableDate = (date) => {
        const readableEventDate = (new Date(date + 'T00:00:00')).toLocaleDateString('en-US')
        return readableEventDate
    }


    useEffect(() => {


        getEventById(eventId)
            .then(setEvent)
    }, [])
















    return (
        <main className="eventContainer">

            <h1 className="event__name">{event.name}</h1>
            <div className="event__dungeon"><span className="detailHeader">Where:</span> {event.dungeon.name}</div>


            <div className="event__date"><span className="detailHeader">When:</span> {getReadableDate(event.date)}</div>
            <div className="event__creator"><span className="detailHeader">Created By:</span> {event.user.name}</div>
            <div className="buttons">
                {isOwner && <Button className="d-block ml-auto my-2" type="button" onClick={() => {
                    history.push(`/events/edit/${event.id}`)
                }}>Edit</Button>}
                {isOwner && <Button className="d-block ml-auto my-2" type="button" onClick={() => {
                    deleteEvent(event.id)
                        .then(() => history.push(`/events`))

                }}>Delete</Button>}
            </div>

            <AttendingForm eventId={event.id} />
            <AttendingEventsList eventId={event.id} />
        </main>
    )
}