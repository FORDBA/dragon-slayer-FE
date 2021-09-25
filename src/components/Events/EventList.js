import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { Link } from "react-router-dom"
import "./Events.css"

export const EventList = (props) => {
    const { events, getEvents } = useContext(EventContext)




    useEffect(() => {
        getEvents()
            .then(events.sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1))
    }, [])





    return (
        <div>
            <h1>Events</h1>



            <article className="events__container">
                <button onClick={() => props.history.push("/events/createevent")}>
                    Add Events
                </button>
                <div className="events" >
                    {
                        events.map(event => {

                            return <section className="event" key={event.id}>
                                <Link to={`/events/${event.id}`}>
                                    <h3>{event.name}</h3>

                                </Link>
                                <div className="event__date">{event.date}</div>
                                <div className="event__creator">Created By: {event.user.name}</div>





                            </section>
                        })
                    }
                </div>
            </article>
        </div>
    )
}