import React from "react"
import { Link, useHistory } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import "./NavBar.css"
import Logo from "./Dragon Slayer Logo.png"
import { Button } from "react-bootstrap"

export const NavBar = (props) => {
  const history = useHistory()

  const handleClickLogout = e => {
    e.preventDefault()

    sessionStorage.removeItem("guild_user")
    history.push("/login")
  }
  const userId = parseInt(localStorage.getItem("guild_user"))
  return (
    <Navbar expand="md">
      <Navbar.Brand as={Link} to="/">
        <img className="navbar__logo" src={Logo} alt="Tax Return Manager" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav container ">
        <Nav className="mr-auto container-fluid">
          <Button variant="outline-primary" className="mx-2 my-1" onClick={() => history.push("/")}>My Profile</Button>
          <Button variant="outline-primary" className="mx-2 my-1" onClick={() => history.push("/workflows")}>Members</Button>
          <Button variant="outline-primary" className="mx-2 my-1" onClick={() => history.push("/workflows/completed")}>Bosses</Button>
          <Button variant="outline-primary" className="mx-2 my-1" onClick={() => history.push("/users")}>Events</Button>
          <Button variant="outline-primary" className="mx-2 my-1 ml-md-auto" onClick={handleClickLogout}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
