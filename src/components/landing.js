import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Row, Col, Container, Jumbotron } from 'reactstrap';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Modal, ModalHeader, ModalBody } from 'reactstrap';

function Landing(props) {
    // const [pageId, setPageId] = useState(0);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();

    // if logged in GOTO ViewStream
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        props.setPageId(1);
    }

    // modal
    const { className } = props;
    const [registerModal, setRegisterModal] = useState(false);
    const toggleRegister = () => setRegisterModal(!registerModal);
    const [loginModal, setLoginModal] = useState(false);
    const toggleLogin = () => setLoginModal(!loginModal);
    const cancelRegister = () => setRegisterModal(history.push("/"));
    const cancelLogin = () => setLoginModal(history.push("/"));
    // const cancelLogin = () => props.setPageId(0);
    // modal

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return (alert('Password does not equal Confirm Password.  Consider using a password manager'));
        };
        const data = { name: name, email: email, password: password };
        // console.log(data);
        axios.post('http://localhost:8000/api/register', data)
            .then(response => {
                // setRegisterModal(!registerModal);
                // setLoginModal(!loginModal);
                let userData = {
                    user: response.data.user,
                    token: response.data.token,
                    timestamp: new Date().toString()
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                console.log(JSON.stringify(userData));
                props.setPageId(1);
                // history.push("/viewStream");
            })
            .catch(error => {
                alert(error);
                history.push("/");
            });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password);
        const data = { email: email, password: password };

        axios.post('http://localhost:8000/api/login', data)
            .then(response => {
                let userData = {
                    user: response.data.user,
                    token: response.data.token,
                    timestamp: new Date().toString()
                };
                console.log(userData);
                console.log('C');

                // Convert the object into JSON string and save it into storage
                localStorage.setItem('userData', JSON.stringify(userData));
                console.log(JSON.stringify(userData));
                props.setPageId(1);
                // history.push("/viewStream");
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <Container>
            <Row>
                <Col lg="4" md="6" sm="auto" xs="auto">
                    <Jumbotron>
                        <h1 className="display-5">Own your data</h1>
                        <p className="lead">You own your data, not us.</p>
                        <p>Many networks use your data to make money by analyzing your interactions and using this information to advertise things to you. diaspora* doesn’t use your data for any purpose other than allowing you to connect and share with others. </p>
                        {/* <Link to="login" className="btn btn-primary"
                        // onClick={() => props.setWhereAmI('login')}
                        >Login</Link> */}
                        <Button color="primary" onClick={toggleLogin}>Login</Button>
                    </Jumbotron>
                </Col>

                <Col lg="4" md="6" sm="auto" xs="auto">
                    <Jumbotron>
                        <h1 className="display-5">Choose your audience</h1>
                        <p className="lead">Share with the group you choose.</p>
                        <p>Diaspora*’s aspects allow you to share with just those people you want to. You can be as public or as private as you like. Share a funny photo with the whole world, or a deep secret just with your closest friends. You’re in control. </p>
                        <Button color="success" onClick={toggleRegister}>Register</Button>
                    </Jumbotron>
                </Col>

                <Col lg="4" md="12" sm="auto" xs="auto">
                    <Jumbotron>
                        <h1 className="display-5">Be who you want to be</h1>
                        <p className="lead">Appear how you wish to.</p>
                        <p>A lot of networks insist that you use your real identity. Not diaspora*. Here you can choose who you want to be, and share as much or as little about yourself as you want. It really is up to you how you want to interact with other people. </p>
                        <Button
                            color="info"
                            href="https://diasporafoundation.org/"
                            target="_blank"
                            role="button"
                        >
                            About diaspora
                </Button>
                    </Jumbotron>
                </Col>
            </Row>

            <Modal isOpen={registerModal} toggleRegister={toggleRegister} className={className}>
                <ModalHeader toggleRegister={toggleRegister}>Create an Account</ModalHeader>
                <ModalBody centered>
                    <Form onSubmit={handleRegister}></Form>
                    {/* <Button color="primary" onClick={toggleRegister}>Do Something</Button>{' '} */}
                    <Form onSubmit={handleRegister}>
                        <div className="form-group text-left">
                            <label htmlFor="name">User Name</label>
                            <input type="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="form-control"
                                id="name"
                                aria-describedby="nameHelp"
                                placeholder="Enter User Name"
                            />
                            <small id="nameHelp" className="form-text text-muted">This will be your Screen Name,
                            what everybody will see as you. You can change it at any time!
                            </small>
                        </div>

                        <div className="form-group text-left">
                            <label htmlFor="email">Email address</label>
                            <input type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                            />
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
                                Password request changes are sent to this address.
                            </small>
                        </div>

                        <div className="form-group text-left">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="form-control"
                                id="password"
                                placeholder="Password"
                            />
                        </div>

                        <div className="form-group text-left">
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                className="form-control"
                                id="confirmPassword"
                                aria-describedby="confirmPasswordHelp"
                                placeholder="Confirm Password"
                            />
                            <small id="confirmPasswordHelp" className="form-text text-muted">
                                Making sure that you typed your password correctly.
                            </small>
                        </div>
                        {/* <Button color="primary" type="submit" onClick={toggleRegister}>Login</Button>{' '} */}
                        <Button color="primary" type="submit" onClick={handleRegister}>Register</Button>{' '}
                        <Button color="secondary" onClick={cancelRegister}>Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>

            <Modal isOpen={loginModal} toggleLogin={toggleLogin} className={className}>
                <ModalHeader toggleLogin={toggleLogin}>Welcome Back</ModalHeader>
                <ModalBody centered>
                    <Form onSubmit={handleLogin}>
                        <div className="form-group text-left">
                            <label htmlFor="email">Email address</label>
                            <input type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                name="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                name="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                            />
                        </div>
                        <Button color="primary" type="submit" onClick={handleLogin}>Login</Button>{' '}
                        {/* <Button color="primary" onClick={toggleLogin}>Do Something</Button>{' '} */}
                        <Button color="secondary" isOpen={loginModal} toggleLogin={toggleRegister} onClick={cancelLogin}>Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>

        </Container>
    );
}
export default Landing;