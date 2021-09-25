import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { RankProvider } from "./Ranks/RankProvider"
import { ProfessionProvider } from "./Professions/ProfessionProvider"
import { UserProvider } from "./Users/UserProvider"
import { RoleProvider } from "./Roles/RoleProvider"
import { ClassProvider } from "./Classes/ClassProvider"
import { RaceProvider } from "./Races/RaceProvider"

export const Guild = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("guild_user")) {
                return (
                    <>
                        <NavBar />
                        <ApplicationViews />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login">
            <Login />
        </Route>


        <RoleProvider>
            <ClassProvider>
                <RaceProvider>
                    <RankProvider>
                        <ProfessionProvider>
                            <UserProvider>
                                <Route path="/register">
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