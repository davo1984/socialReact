import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Row, Col, Container, Table } from 'reactstrap';
import {
    Col, Row,
    Form, FormGroup, Label, Input, Button, Table, Jumbotron,
    Card, CardHeader, CardFooter, CardBody, CardText, CardTitle
} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

function ViewPost(props) {
    let [newComment, setNewComment] = useState();
    const history = useHistory();
    // also change DATABASE in ViewStream.js Landing.js
    // const DATABASE = "http://localhost:8000";
    const DATABASE = "https://social-278718.appspot.com";

    // props.doingWhat = 'ViewPost';
    let [commentBody, setCommentBody] = useState('');
    console.log('in ViewPost', props.postId, props.postsList);
    const commentsList = props.postsList.filter(
        post => post.id === props.postId);
    console.log('commentsList', commentsList);
    console.log('new comment body', commentBody);

    const submitComment = (e) => {
        e.preventDefault();
        if (!commentBody) {
            console.log(props.postId, 'no comment to submit!', commentBody);
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

        let data = {
            post_id: props.postId,
            body: commentBody,
            user_id: userData.user.id,
        }
        console.log('userData', userData);
        console.log('axios config', config);
        console.log('axios data', data);
        axios.post(DATABASE + '/api/createComment', data, config)
            .then(response => {
                console.log('success', response.data);
                setCommentBody('');
                props.fetchData();
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
        history.push("/");
    }

    return (
        <div>
            <Row className="my-5">
                <Col>
                    <Card>
                        <CardHeader tag="h5">{commentsList[0].user.name}</CardHeader>
                        <CardBody>
                            <CardTitle>
                                <div dangerouslySetInnerHTML={{
                                    __html: commentsList[0].title
                                }}></div>
                            </CardTitle>
                            <CardText><div dangerouslySetInnerHTML={{
                                __html: commentsList[0].body
                            }}></div>
                            </CardText>
                            {/* <Button>Go somewhere</Button> */}
                        </CardBody>
                        <CardFooter className="text-muted">{commentsList[0].updated_at}</CardFooter>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table responsive striped bordered hover>
                        <thead>Comments</thead>
                        <tbody>
                            {commentsList[0].comments.length > 0 ?
                                commentsList[0].comments.map((comment, key) =>
                                    <tr><td key={key}>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: comment.body
                                            }}></div>
                                 - {comment.user.name}{" "}{comment.updated_at}</td></tr>)
                                :
                                null
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* <Jumbotron> */}
                    <Form onSubmit={submitComment}>
                        <FormGroup>
                            <Label for="commentText">Add Your Comment</Label>
                            <ReactQuill
                                style={{ height: 9 + 'rem', marginBottom: 3+'rem' }}
                                theme="snow"
                                value={commentBody}
                                name="commentText"
                                id="commentText"
                                onChange={setCommentBody} />
                            {/* </ReactQuill> */}
                            {/* <Input type="textarea"
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                                name="body"
                                id="bodyText" /> */}
                        </FormGroup>
                        <Button
                            // className="mx-auto my-2" 
                            color="success"
                            type="submit"
                            onClick={submitComment}>Submit Comment</Button>
                    </Form>
                    {/* </Jumbotron> */}
                </Col>
            </Row>
        </div>
    )
}
export default ViewPost;