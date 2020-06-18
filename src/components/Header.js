import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory();

    return (
        <>
            <Navbar color="info" light expand="md" className="border-rounded" fixed="top">
                <NavbarBrand href="/">Social Node</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    {/* {postsList.length > 0 ? postsList.map((post, key) =>
                                        <tr><td onClick={() => myfunction(post.id)}>{post.title}</td></tr>
                                    ) : null} */}
                    <NavLink
                        href="/">View Posts</NavLink>
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
                <NavbarText>
                    <NavItem>Welcome {props.userName}
                        </NavItem>
                        {/* <NavLink
                            onClick={() => props.logoutUser()}>Logout
                        </NavLink> */}
                </NavbarText>
            </Navbar>
        </>
    )
}
export default Header;