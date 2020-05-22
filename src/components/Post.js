import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Container, Table } from 'reactstrap';


function Post(props) {
    let userData = '';

    localStorage.getItem('userData', JSON.stringify(userData));
    console.log(JSON.stringify(userData));

    console.log('in Posts');
    // let response = '';      // never used!

    useEffect((didUpdate) => {
        console.log('in componentDidMount--useEffect');

        // const response = 
        axios.post('http://localhost:8000/api/post')
            .then(response => {
                console.log(response);

                //TODO get response out of component!
                // console.log(JSON.stringify(response));
            })
            .catch(error => {
                console.log(error);
            });

        // return () => {
        //     response
        // };
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <Table responsive striped bordered hover>
                        <tbody>
                            <tr>
                                <td>TEST VALUE
                                    {/* {props.data.post.title.map((post, key) =>
                                        <tr><td>{post} {post.body}</td></tr>
                                    )} */}
                                </td>
                            </tr>
                            <tr><td>second row test value</td></tr>
                            <tr><td>THIRD row test value</td></tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
export default Post;