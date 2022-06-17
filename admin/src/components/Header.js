import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import logo from './logo.png';
import {Link} from "react-router-dom";


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
                        <Nav.Link as={Link} to="/nguyenlieu" style={{marginLeft: '5px'}}>Nguyên liệu</Nav.Link>
                        {/* <Nav.Link as={Link} to="/monan" style={{marginLeft: '15px'}}>Món ăn</Nav.Link> */}
                        <Nav.Link as={Link} to="/themnguyenlieu" style={{marginLeft: '15px'}}>Thêm nguyên liệu</Nav.Link>
                        {/* <Nav.Link as={Link} to="/themmonan" style={{marginLeft: '15px'}}>Thêm món ăn</Nav.Link> */}
                        
                        {/* <Nav.Link as={Link} to="/contact" style={{marginLeft: '15px'}}>Contact</Nav.Link> */}
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;