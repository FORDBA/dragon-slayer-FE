import React from "react"
import { Route } from "react-router-dom"
import { UserProvider } from "./Users/UserProvider"
import { UserDetail } from "./Users/UserDetail"
import { ProfessionProvider } from "./Professions/ProfessionProvider"



export const ApplicationViews = (props) => {
    return (
        <>
            <UserProvider>
                <ProfessionProvider>
                    <Route exact path="/profile/:userId(\d+)">
                        <UserDetail />
                    </Route>
                </ProfessionProvider>
            </UserProvider>




        </>
    )
}