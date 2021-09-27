import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { AttendingEventContext } from "./AttendingEventsProvider"
import Badge from 'react-bootstrap/Badge'
import "./attendingEvents.css"

export const AttendingEventsList = ({ eventId }) => {
    const { attendingEvents, getAttendingEvents } = useContext(AttendingEventContext)
    const history = useHistory()
    const [attendingUsers, setAttendingUsers] = useState([])
    const [tentativeUsers, setTentativeUsers] = useState([])
    const [notAttendingUsers, setNotAttendingUsers] = useState([])


    useEffect(() => {
        getAttendingEvents(eventId)

    }, [])

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
            <h1>RSVPs</h1>



            <article className="events__container">
                <h1> Attending: </h1>
                <div className="events" >
                    {
                        attendingUsers.map(u => {

                            return (
                                <Badge pill variant="primary" className="mx-1">{u.user.name}</Badge>
                            );
                        })
                    }
                </div>
            </article>
            <article className="events__container">
                <h1> Tentative: </h1>
                <div className="events" >
                    {
                        tentativeUsers.map(u => {

                            return (
                                <Badge pill variant="primary" className="mx-1">{u.user.name}</Badge>
                            );
                        })
                    }
                </div>
            </article>
            <article className="events__container">
                <h1> Not Attending: </h1>
                <div className="events" >
                    {
                        notAttendingUsers.map(u => {

                            return (
                                <Badge pill variant="primary" className="mx-1">{u.user.name}</Badge>
                            );
                        })
                    }
                </div>
            </article>

        </div>
    )
}