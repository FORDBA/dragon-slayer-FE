import React, { useEffect, useContext } from "react";
import { ListGroup, Row, Button } from "react-bootstrap";
import { CommentContext } from "./BossCommentProvider";
import { BsGearFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md"
import { useHistory } from "react-router";
import "../Bosses/Bosses.css"


export const CommentList = ({ bossId }) => {
    const { comments, getCommentsByBossId, deleteComment } = useContext(CommentContext);
    const history = useHistory()

    useEffect(() => {
        getCommentsByBossId(bossId);
    }, [bossId]);



    return (
        <div className="commentContainer">
            <div
                className="noteList"
                style={{ maxHeight: "250px", overflowY: "scroll" }}
            >
                <ListGroup>
                    {comments.map((c) => {
                        const isOwnNote = c.userId === parseInt(sessionStorage.getItem("guild_user"))


                        return (

                            <ListGroup.Item key={c.id}>
                                <h3>{c.comment}</h3>

                                <h5>{c.user.name}</h5>
                                <Row className="justify-content-between">
                                    <div className="d-flex">
                                        {isOwnNote &&
                                            <Button className="d-block ml-auto my-2" type="submit" onClick={() => deleteComment(c)}><MdDelete style={{ fontSize: '20px' }} /></Button>
                                        }

                                        {isOwnNote &&
                                            <Button className="d-block ml-auto my-2" type="submit" onClick={() => history.push(`/bossComments/edit/${c.id}`)}><BsGearFill style={{ fontSize: "20px" }} /></Button>
                                        }
                                    </div>
                                </Row>
                            </ListGroup.Item>

                        );
                    })}
                </ListGroup>
            </div>
        </div>
    );
};
