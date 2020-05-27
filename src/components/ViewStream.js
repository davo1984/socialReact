import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Row, Col, Container,
    Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ViewPost from './ViewPost';
import Header from './Header';
import axios from 'axios';

function ViewStream(props) {
    // also change DATABASE in Landing.js ViewPost.js
    const DATABASE = "http://localhost:8000";
    // const DATABASE = "https://social-node-277819.uc.r.appspot.com/";
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



    // QQQ didn't ian say to get rid of useEffect, not needed?
    // after render
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {

        console.log('in fetchData: userData, data', userData, data);
        axios.get(DATABASE + '/api/post', data)
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
        localStorage.clear();
        let userData = {
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

        axios.post(DATABASE + '/api/createPost', data, config)
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
            <Row>
                <Col>
                    <Header doingWhat={doingWhat}
                        logoutUser={logoutUser}
                        setPageId={props.setPageId}
                    />
                </Col>
            </Row>
            {console.log('before toggle', postId)}
            {toggle ?
                <Row>
                    <Col>
                        <ViewPost
                            setPageId={props.setPageId} 
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
                                    <ReactQuill>
                                        <div style={{height: 9+'rem'}}
                                            type="textarea"
                                            theme="snow" 
                                            value={body} 
                                            name="postBody"
                                            id="postBody"
                                            onChange={setBody}/>
                                    </ReactQuill> 
                                </FormGroup>
                                <Button color="primary" type="submit"
                                    onClick={submitPost}>Submit Your Post</Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        {/* {console.log('postsList')} */}
                        {postsList.length > 0 ? postsList.map((post, key) =>
                            <div lg="4" md="6" sm="auto" xs="auto"
                                key={key}
                                style={{ minWidth: 12 + 'rem', maxWidth: 18 + 'rem' }}
                                className="card m-2"
                                onClick={() => myfunction(post.id)}>
                                <div className="card-header bg-success">{post.title}</div>
                                <div className="card-body bg-light">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: post.body
                                        }}></div>
                                </div>
                                <div className="card-footer bg-success">{post.user.name}</div>
                            </div>
                        ) : null}
                    </Row>
                </div>
            }
        </Container>
    )
}
export default ViewStream;