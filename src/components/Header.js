import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Col,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color="info" light expand="md">
                <NavbarBrand href="/">David's Node</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink
                            onClick={() => props.logoutUser()}>Logout
                        </NavLink>
                    </NavItem>
                <NavLink
                    href="/">Refresh</NavLink>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Future Actions
                        </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            Edit Tags Followed
                        </DropdownItem>
                        <DropdownItem>
                            Edit Users Followed
                        </DropdownItem>
                        <DropdownItem>
                            Organize Aspect Groups
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => props.logoutUser()}>
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
            <NavbarText>Simple Text</NavbarText>
        </Navbar>
        </>
    )
}
export default Header;