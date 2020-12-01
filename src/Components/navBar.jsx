import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

function NavigationBar() {
    return (
        <div className = 'navContainer'>
            <Navbar bg="dark" variant="dark" className = "navBar">
                <Nav className="mr-auto">
                    <Nav.Link href="/" className="navLink">Home</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
            </Navbar>
        </div>

    )
}

export default NavigationBar;