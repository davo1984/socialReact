import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Row, Col, Container, Card, Form } from 'reactstrap';

function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO if passport does this for me how to check?

        if (password !== confirmPassword) {
            return (alert('Password does not equal Confirm Password.  Consider using a password manager'));
        };
        const data = { name: name, email: email, password: password };
        // console.log(data);
        axios.post('http://localhost:8000/api/register', data)
            .then(response => {
                // console.log('user:' + response.data.user.name);
                // console.log(response);
                // console.log('Z');
                // console.log(JSON.stringify(response));
                // console.log('A');
                // console.log('user:' + response.data.user.email);
                // console.log('B');
                // let userData = {
                //   user: response.data.user,
                //   token: response.data.token,
                //   timestamp: new Date().toString()
                // };
                // console.log(userData);
                // console.log('C');

                // Convert the object into JSON string and save it into storage
                // localStorage.setItem('userData', JSON.stringify(userData));
                // console.log(JSON.stringify(userData));
                // <Redirect to="/viewStream/" />);
                history.push("/viewStream");
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <Container>
            <Row>
                {/* justify-content-center offset-3 */}
                <Col sm="auto" md="auto" lg={{ size: "auto", offset: 4 }}>
                    <Card>
                        <Form onSubmit={handleSubmit}>
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
                    what everybody will see as you. You can change it at any time!</small>
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

                            <Button
                                color="primary"
                                type="submit"
                            >
                                Register
                </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Register;