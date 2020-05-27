import React, { useState } from 'react';
import { Container } from 'reactstrap';
// import { Switch, Route } from 'react-router-dom';
import ViewStream from './components/ViewStream';
// import Register from './components/Register';
// import Post from './components/Post';
import Landing from './components/Landing';
import './App.css';

function App() {
    const [pageId, setPageId] = useState(0);
    // create state holds post id to load DONE
    // send setpostid state to viewstream where it is clicked on
    // send postid to post component
    // send posts to post component & send down as a prop
    //      setPageId(response.data.posts);
    if (pageId === 1) {
        return (<ViewStream setPageId={setPageId} />)
    } if (pageId === 0) {
        return (<Landing setPageId={setPageId}/>)
    } if (pageId === 3) {
        return (<ViewStream postId={3} setPageId={setPageId} />)
    }

    return (
        <main>
            <Container>
                {/* <Switch> */}
                    {/* <Route exact path="/" component={Landing} />

                    <Route path="/post" component={Post} /> */}

                    {/* <Route path="/register" component={Register} /> */}

                    {/* <Route path="/viewStream" component={ViewStream} />
                </Switch> */}
            </Container>
        </main>
    );
}
export default App;
