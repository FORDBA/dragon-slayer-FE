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




        </>
    )
}