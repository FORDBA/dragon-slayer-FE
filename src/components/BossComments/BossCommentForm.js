import React, { useContext, useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { useHistory, useParams } from "react-router"
import { CommentContext } from "./BossCommentProvider"
import "../Bosses/Bosses.css"

// export const NoteForm = () => {
export const CommentForm = ({ bossId }) => {
    const [comment, setComment] = useState({})
    const { addComment, updateComment, getCommentById, getCommentsByBossId } = useContext(CommentContext)
    const { commentId } = useParams()
    const history = useHistory()

    const handleTextareaChange = (e) => {
        const newComment = { ...comment }
        newComment[e.target.id] = e.target.value
        setComment(newComment)
    }

    useEffect(() => {
        if (commentId) {
            getCommentById(commentId)
                .then(resp => {
                    console.log(resp)
                    setComment(resp)

                })
        }
    }, [])

    const handleSubmitCommentClick = (e) => {
        e.preventDefault()
        if (comment.comment.trim().length) {
            if (commentId) {
                updateComment({
                    id: comment.id,
                    comment: comment.comment,
                    bossId: comment.bossId,
                    userId: parseInt(sessionStorage.getItem("guild_user"))
                })
                    .then(() => history.push(`/bosses/${comment.bossId}`))
                    .then(() => {
                        const clearedComment = { ...comment }
                        clearedComment.comment = ""
                        setComment(clearedComment)

                    })
            } else {

                const newComment = {

                    comment: comment.comment,
                    bossId: bossId,
                    userId: parseInt(sessionStorage.getItem("guild_user"))
                }

                addComment(newComment)
                    .then(() => getCommentsByBossId(bossId))
                    .then(() => {
                        const clearedComment = { ...comment }
                        clearedComment.comment = ""
                        setComment(clearedComment)

                    })

            }

        }
        else alert('Please enter a Comment')
    }

    return (
        <Form className="commentForm">


            <Form.Control as="textarea" id="comment" onChange={handleTextareaChange} value={comment.comment} name='content' placeholder="Enter Comment Here..." />
            <Button className="d-block ml-auto my-2" type="submit" onClick={handleSubmitCommentClick}>{!commentId ? "Comment" : "Update"}</Button>
        </Form>
    )
}
