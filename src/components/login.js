import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Row, Col, Container, Card, Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function Login(props) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    // modal
    const { className  } = props;
    const [ modal, setModal ] = useState(true);
    const toggle = () => setModal( !modal );
    const cancel = () => setModal( history.push("/") );
    // modal

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        const data = { email: email, password: password };

        axios.post('http://localhost:8000/api/login', data)
            .then(response => {
                // console.log(response);

                // console.log('user:' + response.data.user.name);
                // console.log('Z');
                // console.log(JSON.stringify(response));
                // console.log('A');
                // console.log('user:' + response.data.user.email);
                // console.log('B');
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
                // <Redirect to="/viewStream/" />);
                history.push("/viewStream");
            })
            .catch(error => {
                console.log(error);
            });

    }

    return (
        <Container>
            {/* <div> */}
                {/* <Button color="success" onClick={toggle}>{buttonLabel}</Button> */}
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody centered>
                        <Form onSubmit={handleSubmit}>    {/* onSubmit={this.handleSubmit(e)} */}
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
                            <Button color="primary" type="submit" onClick={toggle}>Login</Button>{' '}
                            {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '} */}
                            <Button color="secondary" onClick={cancel}>Cancel</Button>
                        </Form>
                    </ModalBody>
                    {/* <ModalFooter>
          </ModalFooter> */}
                </Modal>
            {/* </div> */}
        </Container>
    )
}
export default Login;