import axios from 'axios';

const serverUrl = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com';

export function getTweet(){
    return axios.get(`${serverUrl}/tweet`);
}

export function createTweet(tweet){
    return axios.post(`${serverUrl}/tweet`, tweet);
}