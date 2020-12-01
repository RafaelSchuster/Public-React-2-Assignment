import React from 'react';

function TweetItem(props) {
    return (
        <div
            className='tweetItem'>
            <span
                className='userName'>
                {props.username}
            </span>
            <span
                className='tweetDate'>
                {props.date}
            </span>
            <span
                className='tweetTxt'>
                {props.text}
            </span>
        </div>
    )
}

export default TweetItem;