import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"
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
                <Button className="d-block ml-auto my-2" type="button" onClick={() => history.push("/events/create")}>
                    Add Event
                </Button>
                <div className="events" >
                    {
                        upcomingEvents.map(event => {

                            return <Card style={{ width: '18rem' }} key={event.id}>
                                <Card.Title>
                                    {event.name}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{getReadableDate(event.date)}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Created By: {event.user.name}</Card.Subtitle>

                                <Card.Link href={`/events/${event.id}`}>
                                    See RSVP's

                                </Card.Link>




                            </Card>
                        })
                    }
                </div>
            </article>
            <h1>Past Events</h1>
            <div className="events" >
                {
                    pastEvents.map(event => {

                        return <Card style={{ width: '18rem' }} key={event.id}>
                            <Card.Title>
                                {event.name}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{getReadableDate(event.date)}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Created By: {event.user.name}</Card.Subtitle>

                            <Card.Link href={`/events/${event.id}`}>
                                See RSVP's

                            </Card.Link>




                        </Card>
                    })
                }
            </div>
        </div>
    )
}