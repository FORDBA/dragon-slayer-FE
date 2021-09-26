import React, { useState } from "react"


export const CommentContext = React.createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])



    const getCommentsByBossId = (id) => {
        return fetch(`http://localhost:8088/bosses/${id}/comments?_expand=user&_expand=boss`)
            .then(res => res.json())
            .then(data => data.reverse())
            .then(setComments)
    }
    const getCommentById = (id) => {
        return fetch(`http://localhost:8088/comments/${id}?_expand=user&_expand=boss`)
            .then(res => res.json())

    }


    const addComment = boss => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boss)
        })

    }
    const updateComment = comment => {
        return fetch(`http://localhost:8088/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })

    }
    const deleteComment = (commentId) => {
        return fetch(`http://localhost:8088/comments/${commentId}`, {
            method: "DELETE"
        })

    }

    return (
        <CommentContext.Provider value={{
            comments, addComment, getCommentsByBossId,
            deleteComment, updateComment, getCommentById
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}