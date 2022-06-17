import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import logo from './logo.png';


function Header()  {
    return (
        <div>
            <Navbar bg="dark" variant={"dark"} expand="lg" style={{paddingTop: '2px', paddingBottom: '2px'}}>
                {/* <Navbar.Brand href="#home"> */}
                    <img
                        src={logo}
                        width="55"
                        height="55"
                        className="d-inline-block align-top"
                        style={{marginLeft: '20px', marginRight: '20px'}}
                        alt=""
                    />
                {/* </Navbar.Brand> */}
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" >
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px', fontSize: '18px' }}
                        navbarScroll
                    >
                        {/* <Nav.Link as={Link} to="/home" style={{marginLeft: '5px'}}>Trang chủ</Nav.Link> */}
                        {/* <Nav.Link as={Link} to="/contact" style={{marginLeft: '15px'}}>Contact</Nav.Link> */}
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;