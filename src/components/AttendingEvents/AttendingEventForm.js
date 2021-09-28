import React, { useContext, useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useParams } from "react-router"
import { AttendingEventContext } from "./AttendingEventsProvider"
import "./attendingEvents.css"


export const AttendingForm = ({ eventId }) => {
    const [attending, setAttending] = useState({
        statusId: 0
    })
    const { addAttendingEvent, getAttendingEventById, updateAttendingEvent, getAttendingEvents, attendingEvents, statuses, getStatuses } = useContext(AttendingEventContext)
    const currentUser = parseInt(sessionStorage.getItem("guild_user"))
    const { rsvpId } = useParams()

    const handleInputChange = (e) => {

        const newAttending = { ...attending }
        newAttending[e.target.id] = e.target.value
        setAttending(newAttending)
    }
    useEffect(() => {
        getStatuses()
        getAttendingEvents(eventId)
    }, [eventId])

    useEffect(() => {
        if (rsvpId) {
            getAttendingEventById(rsvpId)
                .then(resp => {

                    setAttending(resp)

                })
        }
    }, [rsvpId])

    const handleSubmitClick = (e) => {
        e.preventDefault()
        const statusId = parseInt(attending.statusId)
        const prior = attendingEvents.find(e => e.userId === currentUser)
        if (statusId !== 0) {
            if (prior) {
                updateAttendingEvent({
                    id: prior.id,
                    statusId: statusId,
                    eventId: eventId,
                    userId: parseInt(sessionStorage.getItem("guild_user"))
                })
                    .then(() => getAttendingEvents(eventId))

            } else {

                addAttendingEvent({

                    statusId: statusId,
                    eventId: eventId,
                    userId: parseInt(sessionStorage.getItem("guild_user"))
                })
                    .then(() => getAttendingEvents(eventId))


            }

        }
        else window.alert('Please Select a Status')
    }

    return (
        <>
            <div className="attendForm">

                <label htmlFor="status">Are You Attending? </label>
                <select value={attending.statusId} name="status" id="statusId" onChange={handleInputChange} className="form-control" required >
                    <option value="0">Select Status</option>
                    {statuses.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.status}
                        </option>
                    ))}
                </select>
                <Button className="d-block ml-auto my-2" type="button" onClick={handleSubmitClick}>RSVP</Button>
            </div>
        </>
    )
}
