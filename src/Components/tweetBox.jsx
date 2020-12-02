import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button, Container, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TweetContext } from '../Context/TweetContext';
import { getTweet, createTweet } from '../lib/api';

let tweetText;
let newTweet;

function TweetBox() {
    const { tweet, setTweet } = useContext(TweetContext);
    const { length, setLength } = useContext(TweetContext);
    const { userId } = useContext(TweetContext);

    function tweetInput(event) {
        tweetText = event.target.value;
    }

    setTweet(tweetText);
    if (tweet) setLength(tweet.length);

    function onSubmiting(event) {
        event.preventDefault();
        newTweet = {
            content: tweet,
            userName: userId,
            date: new Date().toISOString()
        }
        addTweet(newTweet);
    }

    function addTweet(newTweet) {
        createTweet(newTweet);
    }

    return (
        <TweetContext.Consumer>
            {() => {
                return <Container>
                    <Form
                        onSubmit={event => onSubmiting(event)}
                        className="form-group">
                        <FormControl
                            as="textarea"
                            className="form-control tweetBox"
                            id=''
                            rows={10}
                            defaultValue={tweet}
                            onChange={event => tweetInput(event)}
                            placeholder='What you have in mind...'>
                        </FormControl>
                        <Button
                            disabled={length > 140}
                            variant="primary"
                            className='tweetBtn'
                            type='submit'
                        >Tweet
                        </Button>
                    </Form>
                    <Alert
                        className="maxChar"
                        show={length > 140}
                        variant={'danger'}
                    >
                        The tweet can't contain more then 140 chars.
                </Alert>
                </Container>
            }}
        </TweetContext.Consumer>
    )
}
export default TweetBox;