import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Card, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, CardHeader, CardFooter,
    Row, Col, Container, Table, Jumbotron,
    Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import ViewPost from './ViewPost';
import Header from './Header';
import axios from 'axios';

function ViewStream(props) {
    const [value, setValue] = useState('');
    const history = useHistory();
    const [postsList, setPostsList] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    let doingWhat = 'ViewStream';
    let userData = JSON.parse(localStorage.getItem('userData'));

    console.log('in Posts, userData follows');
    console.log({ userData });
    if (!userData || !userData.token) {
        props.setPageId(0);
    }
    let data = {
        user_id: userData.user.id,
        headers: {
            Authorization: 'Bearer ' + userData.token
        }
    };

    function timerDifference(createdTime) {
        console.log('createdTime', createdTime);
        let currentTime = new Date().getTime();
        let difference = currentTime - createdTime;
        let days = Math.floor(difference / 86400000);
        let hours = Math.floor(difference / 3600000);     //milliseconds per hour
        let minutes = Math.floor(difference / 60000);      //milliseconds per minute    

        if (minutes < 1) {
            return " Just now";
        }
        if (minutes === 1) {
            return "1 minute ago";
        }
        if (minutes < 60) {
            return minutes + " minutes ago";
        }
        if (hours === 1) {
            return hours + " hour ago";
        }

        if (hours < 24) {
            return hours + " hours ago";
        }
        if (days === 1) {
            return days + " day ago"
        }
        if (days > 1) {
            return days + " days ago"
        }


    }


    // QQQ didn't ian say to get rid of useEffect, not needed?
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {

        console.log('in fetchData: userData, data', userData, data);
        // axios get
        axios.get('http://localhost:8000/api/post', data)
            .then(response => {
                console.log('success', response);
                setPostsList(response.data.posts);
            })
            .catch(error => {
                console.log(error);
                alert(error);
                // history.push("/Landing");
            })
    }

    function logoutUser() {
        let data = {
            user_id: userData.user.id,
            headers: { Authorization: 'Bearer ' + userData.token }
        };

        axios.get('http://localhost:8000/api/logout', data)
            .then(response => {
                console.log('success', response);
                setPostsList(response.data.posts);
            })
            .catch(error => {
                console.log(error);
                alert(error);
                // history.push("/Landing");
            })

        localStorage.clear();
        userData = {
            user: null,
            token: null,
            timestamp: null
        };
        props.setPageId(0);
        // TODO set logout on Laravel side with axios call
    }

    const submitPost = (e) => {
        e.preventDefault();
        if (!body) {
            console.log('no post to submit!');
            return
        }
        let userData = JSON.parse(localStorage.getItem('userData'));
        console.log('in componentDidMount--useEffect');
        const config = {
            headers: {
                // 'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + userData.token,
                'Accept': 'application/json'
            }
        };

        data = {
            title: title,
            body: body,
            user_id: userData.user.id,
        }
        console.log('userData', userData);
        console.log('axios config', config);
        console.log('axios data', data);

        axios.post('http://localhost:8000/api/createPost', data, config)
            .then(response => {
                console.log('success', response.data);
                setBody('');
                setTitle('');
                fetchData();
            })
            .catch(error => {
                console.log(error);
                alert(error);
            })
    }

    console.log('PostsList =', postsList);
    let [toggle, setToggle] = useState(false);
    let [postId, setPostId] = useState(0);

    const myfunction = (props) => {
        console.log('in function', props);
        setToggle(!toggle);
        setPostId(props);
    }

    return (
        <Container>
            <Row className="my-3">
                <Col>
                    <Header doingWhat={doingWhat}
                        logoutUser={logoutUser}
                        setPageId={props.setPageId}
                    />
                </Col>
            </Row>
            {console.log('before toggle', postId)}
            {toggle ?
                <Row className="my-2">
                    <Col>
                        <ViewPost
                            doingWhat={doingWhat}
                            postId={postId}
                            setPostsList={setPostsList}
                            postsList={postsList}
                            setToggle={setToggle}
                            toggle={toggle}
                            fetchData={fetchData} />
                    </Col>
                </Row>
                :
                <div>
                    <Row>
                        <Col className="mx-auto my-3">
                            <Jumbotron>
                                <Form onSubmit={submitPost}>
                                    <FormGroup>
                                        <Label for="postTitle">Post Title</Label>
                                        <Input type="text"
                                            onChange={(e) => setTitle(e.target.value)}
                                            value={title}
                                            name="postTitle"
                                            id="postTitle" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="postBody">Post Body</Label>

                                        <ReactQuill 
                                            value={body} 
                                            onChange={setBody}
                                            type="textarea"
                                            name="postBody"
                                            id="postBody" />

                                        {/* <Input type="textarea"
                                            onChange={(e) => setBody(e.target.value)}
                                            value={body}
                                            name="postBody"
                                            id="postBody" /> */}
                                    </FormGroup>
                                    <Button color="primary" type="submit"
                                        onClick={submitPost}>Submit Your Post</Button>
                                </Form>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row>
                        {postsList.length > 0 ? postsList.map((post, key) =>
                            <Col lg="4" md="6" sm="auto" xs="auto">
                                <div className="card my-3 bg-success" onClick={() => myfunction(post.id)}>
                                    <div className="card-header bg-secondary">{post.user.name}</div>
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.body}</p>
                                    </div>
                                    <div className="card-footer bg-secondary">
                                        {timerDifference(post.updated_at)}
                                    </div>
                                </div>
                            </Col>
                        ) : null}
                    </Row>
                </div >
            }
        </Container >
    )
}
export default ViewStream;