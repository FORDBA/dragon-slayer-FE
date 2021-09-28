import React, { useContext, useEffect, useState } from "react"
import { AttendingEventContext } from "./AttendingEventsProvider"
import Badge from 'react-bootstrap/Badge'
import "./attendingEvents.css"

export const AttendingEventsList = ({ eventId }) => {
    const { attendingEvents, getAttendingEvents } = useContext(AttendingEventContext)
    const [attendingUsers, setAttendingUsers] = useState([])
    const [tentativeUsers, setTentativeUsers] = useState([])
    const [notAttendingUsers, setNotAttendingUsers] = useState([])


    useEffect(() => {
        getAttendingEvents(eventId)

    }, [eventId])

    useEffect(() => {

        const attending = attendingEvents.filter(e => e.statusId === 1)
        setAttendingUsers(attending)
        const tentative = attendingEvents.filter(e => e.statusId === 2)
        setTentativeUsers(tentative)
        const notAttending = attendingEvents.filter(e => e.statusId === 3)
        setNotAttendingUsers(notAttending)



    }, [attendingEvents])







    return (
        <div>




            <article className="events__container">
                <h3> Attending: </h3>
                <div className="events" >
                    {
                        attendingUsers.map(u => {

                            return (
                                <Badge pill variant="primary" className="mx-1" key={u.id}>{u.user.name}</Badge>
                            );
                        })
                    }
                </div>
            </article>
            <article className="events__container">
                <h3> Tentative: </h3>
                <div className="events" >
                    {
                        tentativeUsers.map(u => {

                            return (
                                <Badge pill variant="primary" className="mx-1" key={u.id}>{u.user.name}</Badge>
                            );
                        })
                    }
                </div>
            </article>
            <article className="events__container">
                <h3> Not Attending: </h3>
                <div className="events" >
                    {
                        notAttendingUsers.map(u => {

                            return (
                                <Badge pill variant="primary" className="mx-1" key={u.id}>{u.user.name}</Badge>
                            );
                        })
                    }
                </div>
            </article>

        </div>
    )
}