import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"
import "./Events.css"

export const EventList = (props) => {
    const { events, getEvents } = useContext(EventContext)
    const history = useHistory()
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [pastEvents, setPastEvents] = useState([])
    const today = new Date().toLocaleDateString()

    const getReadableDate = (date) => {
        const readableEventDate = (new Date(date + 'T00:00:00')).toLocaleDateString('en-US')
        return readableEventDate
    }
    useEffect(() => {
        getEvents()


    }, [])

    useEffect(() => {
        const upcomingEvnts = events.filter(evt => new Date(getReadableDate(evt.date)).getTime() >= new Date(today).getTime())
        const pastEvnts = events.filter(evt => new Date(getReadableDate(evt.date)).getTime() < new Date(today).getTime())
        setUpcomingEvents(upcomingEvnts)
        setPastEvents(pastEvnts)

    }, [events])





    return (
        <div>
            <h1>Upcoming Events</h1>



            <article className="events__container">
                <button onClick={() => history.push("/events/create")}>
                    Add Event
                </button>
                <div className="events" >
                    {
                        upcomingEvents.map(event => {

                            return <section className="event" key={event.id}>
                                <Link to={`/events/${event.id}`}>
                                    <h3>{event.name}</h3>

                                </Link>
                                <div className="event__date">{getReadableDate(event.date)}</div>
                                <div className="event__creator">Created By: {event.user.name}</div>





                            </section>
                        })
                    }
                </div>
            </article>
            <h1>Past Events</h1>
            <div className="events" >
                {
                    pastEvents.map(event => {

                        return <section className="event" key={event.id}>
                            <Link to={`/events/${event.id}`}>
                                <h3>{event.name}</h3>

                            </Link>
                            <div className="event__date">{getReadableDate(event.date)}</div>
                            <div className="event__creator">Created By: {event.user.name}</div>





                        </section>
                    })
                }
            </div>
        </div>
    )
}