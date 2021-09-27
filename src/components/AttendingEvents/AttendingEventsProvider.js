import React, { useState } from "react"


export const AttendingEventContext = React.createContext()

export const AttendingEventProvider = (props) => {
    const [attendingEvents, setAttendingEvents] = useState([])
    const [statuses, setStatuses] = useState([])


    const getAttendingEvents = (id) => {
        try {
            return fetch(`http://localhost:8088/events/${id}/attendingEvents?_expand=user`)
                .then(res => res.json())
                .then(setAttendingEvents)

        } catch (error) {
            setAttendingEvents([])
        }
    }
    const getAttendingEventById = (id) => {
        try {
            return fetch(`http://localhost:8088/attendingEvents/${id}?_expand=user`)
                .then(res => res.json())
        } catch (error) {
            return { statusId: 0 }
        }
    }


    const addAttendingEvent = attendingEvent => {
        return fetch("http://localhost:8088/attendingEvents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attendingEvent)
        })

    }
    const updateAttendingEvent = attendingEvent => {
        return fetch(`http://localhost:8088/attendingEvents/${attendingEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attendingEvent)
        })

    }

    const getStatuses = () => {
        return fetch(`http://localhost:8088/statuses`)
            .then(res => res.json())
            .then(setStatuses)
    }






    return (
        <AttendingEventContext.Provider value={{
            attendingEvents, getAttendingEvents, addAttendingEvent, getAttendingEventById,
            updateAttendingEvent, getStatuses, statuses
        }}>
            {props.children}
        </AttendingEventContext.Provider>
    )
}