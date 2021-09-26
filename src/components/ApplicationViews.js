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
                </BossProvider>
            </DungeonProvider>
            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
                <Route exact path="/events/:eventId(\d+)">
                    <EventDetail />
                </Route>
            </EventProvider>
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