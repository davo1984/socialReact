import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import { Row, Col, Container, Table } from 'reactstrap';
import {
    Col, Row,
    Form, FormGroup, Label, Input, Button, Table, Jumbotron,
    Card, CardHeader, CardFooter, CardBody, CardText, CardTitle
} from 'reactstrap';

function ViewPost(props) {
    // props.doingWhat = 'ViewPost';
    const [body, setBody] = useState('');
    console.log('in ViewPost', props.postId, props.postsList);
    const commentsList = props.postsList.filter(
        post => post.id === props.postId);
    console.log('commentsList', commentsList);

    const submitComment = (e) => {
        e.preventDefault();
        if (!body) {
            console.log('no comment to submit!');
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
            body: body,
            user_id: userData.user.id,
        }
        console.log('userData', userData);
        console.log('axios config', config);
        console.log('axios data', data);
        axios.post('http://localhost:8000/api/createComment', data, config)
            .then(response => {
                console.log('success', response.data);
                setBody('');
                props.fetchData();
            })
            .catch(error => {
                console.log(error);
                alert(error);
            })
    }

    return (
        <div>
            <Row className="my-5">
            <Col>
            <Card>
                <CardHeader tag="h5">{commentsList[0].user.name}</CardHeader>
                <CardBody>
                    <CardTitle>{commentsList[0].title}</CardTitle>
                    <CardText>{commentsList[0].body}</CardText>
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
                            <tr><td key={key}>{comment.body} - {comment.user.name}{" "}{comment.updated_at}</td></tr>)
                        :
                        null
                    }
                </tbody>
            </Table>
            </Col>
            </Row>
            <Row>
                <Col>
            <Jumbotron>
                <Form onSubmit={submitComment}>
                    <FormGroup>
                        <FormGroup>
                            <Label for="bodyText">Add Your Comment</Label>
                            <Input type="textarea"
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                                name="body"
                                id="bodyText" />
                        </FormGroup>

                    </FormGroup>
                </Form>
                <Button className="mx-auto my-2" color="success"
                    type="submit"
                    onClick={submitComment}>Submit Comment</Button>
            </Jumbotron>
            </Col>
            </Row>
        </div>
    )
}
export default ViewPost;