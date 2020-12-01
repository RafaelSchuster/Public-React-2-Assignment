import React from 'react';
import TweetItem from './tweetItem';

function TweetList (props) {
        return <ul>
            {props.tweets.map(tweet =>
                <TweetItem
                key = {tweet.date}
                username = 'test'
                text = {tweet.text}
                date = {tweet.date}
                />
            )}
        </ul>     
    } 

export default TweetList;
