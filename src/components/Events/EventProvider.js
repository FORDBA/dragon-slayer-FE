import React, { useState } from "react"


export const EventContext = React.createContext()

export const EventProvider = (props) => {
    const [events, setEvents] = useState([])


    const getEvents = () => {
        return fetch("http://localhost:8088/events?_expand=user&_expand=dungeon")
            .then(res => res.json())
            .then(unsortedEvnts =>
                unsortedEvnts.sort(function (a, b) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(b.date) - new Date(a.date);
                }))
            .then(setEvents)
    }
    const getEventById = (id) => {
        return fetch(`http://localhost:8088/events/${id}?_expand=user&_expand=dungeon`)
            .then(res => res.json())
    }


    const addEvent = event => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(getEvents)
    }
    const updateEvent = event => {
        return fetch(`http://localhost:8088/events/${event.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(getEvents)
    }
    const deleteEvent = (eventId) => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "DELETE"
        })
            .then(getEvents)
    }

    return (
        <EventContext.Provider value={{
            events, getEvents, addEvent, getEventById,
            deleteEvent, updateEvent
        }}>
            {props.children}
        </EventContext.Provider>
    )
}