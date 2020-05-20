import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import { Row, Col, Container, Table } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function ViewPost(props) {
    props.doingWhat = 'ViewPost';
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
            headers:{
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
            <h5 onClick={() => props.setToggle(!props.toggle)}>{
                commentsList[0].title}</h5>
            <p>{commentsList[0].user.name}</p>
            {/* <p>{commentsList[0].title}</p> */}
            <p>{commentsList[0].body}</p>
            <p>++++++++++comments below++++++++++</p>
            {commentsList[0].comments.length > 0 ?
                commentsList[0].comments.map((comment, key) =>
                    <p key={key}>{comment.body},{comment.user.name}</p>
                )
                :
                null
            }
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
            <Button className="mx-auto my-2" color="primary" 
                    type="submit" 
                    onClick={submitComment}>Submit Comment</Button>
        </div>
    )
}
export default ViewPost;