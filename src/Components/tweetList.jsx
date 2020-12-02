import React, { useEffect, useState, useContext } from 'react'
import { TweetContext } from '../Context/TweetContext';
import TweetItem from './tweetItem';

function TweetList() {
    const { tweets, setTweets } = useContext(TweetContext);
    return (
        <TweetContext.Consumer>
            {context => {
                return (<ul>
                    {tweets && tweets.tweets.map(tweet =>
                        <TweetItem
                            key={tweet.date}
                            username={tweet.userName}
                            text={tweet.content}
                            date={tweet.date}
                        />
                    )}
                </ul>
                )
            }}
        </TweetContext.Consumer>
    )
}

export default TweetList;
