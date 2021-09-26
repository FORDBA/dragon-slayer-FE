import React from "react"
import { Route } from "react-router-dom"
import { UserProvider } from "./Users/UserProvider"
import { UserDetail } from "./Users/UserDetail"
import { ProfessionProvider } from "./Professions/ProfessionProvider"
import { UserList } from "./Users/UserList"
import { DungeonProvider } from "./Dungeons/DungeonProvider"
import { BossProvider } from "./Bosses/BossProvider"
import { BossList } from "./Bosses/BossList"
import { BossDetail } from "./Bosses/BossDetail"
import { EventProvider } from "./Events/EventProvider"
import { EventList } from "./Events/EventList"
import { EventDetail } from "./Events/EventDetail"
import { BossForm } from "./Bosses/BossForm"
import { RankProvider } from "./Ranks/RankProvider"
import { RoleProvider } from "./Roles/RoleProvider"
import { ClassProvider } from "./Classes/ClassProvider"
import { RaceProvider } from "./Races/RaceProvider"
import { Register } from "./auth/Register"
import { EventForm } from "./Events/EventForm"
import { CommentProvider } from "./BossComments/BossCommentProvider"
import { CommentForm } from "./BossComments/BossCommentForm"




export const ApplicationViews = (props) => {
    return (
        <>
            <UserProvider>
                <ProfessionProvider>
                    <Route exact path="/profile/:userId(\d+)">
                        <UserDetail />
                    </Route>
                    <Route exact path="/members">
                        <UserList />
                    </Route>
                </ProfessionProvider>
            </UserProvider>
            <CommentProvider>
                <DungeonProvider>
                    <BossProvider>
                        <Route exact path="/bosses">
                            <BossList />
                        </Route>
                        <Route exact path="/bosses/:bossId(\d+)">
                            <BossDetail />
                        </Route>
                        <Route exact path="/bosses/create">
                            <BossForm />
                        </Route>
                        <Route exact path="/bosses/edit/:bossId(\d+)">
                            <BossForm />
                        </Route>
                        <Route exact path="/bossComments/edit/:commentId(\d+)">
                            <CommentForm />
                        </Route>
                    </BossProvider>
                </DungeonProvider>
            </CommentProvider>
            <DungeonProvider>
                <EventProvider>
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                    <Route exact path="/events/:eventId(\d+)">
                        <EventDetail />
                    </Route>
                    <Route exact path="/events/edit/:eventId(\d+)">
                        <EventForm />
                    </Route>
                    <Route exact path="/events/create">
                        <EventForm />
                    </Route>
                </EventProvider>
            </DungeonProvider>
            <RoleProvider>
                <ClassProvider>
                    <RaceProvider>
                        <RankProvider>
                            <ProfessionProvider>
                                <UserProvider>
                                    <Route path="/profile/edit/:userId(\d+)">
                                        <Register />
                                    </Route>
                                </UserProvider>
                            </ProfessionProvider>
                        </RankProvider>
                    </RaceProvider>
                </ClassProvider>
            </RoleProvider>




        </>
    )
}