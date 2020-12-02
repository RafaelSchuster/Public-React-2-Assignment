import React, { useEffect, useState } from 'react';
import './App.css';
import NavigationBar from './Components/navBar';
import TweetBox from './Components/tweetBox';
import TweetList from './Components/tweetList';
import { getTweet, createTweet } from './lib/api';
import Profile from './Components/profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import * as localForage from 'localforage';
import { TweetContext } from './Context/TweetContext';
import { Spinner } from 'react-bootstrap';

let tweetResponse;

function App() {
  const [tweets, setTweets] = useState();
  const [tweet, setTweet] = useState();
  const [length, setLength] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState();

  async function fetchTweet() {
    const response = await getTweet();
    tweetResponse = response.data;
  }

  useEffect(() => {
    fetchTweet();
    setLoading(true);
    setInterval(() => {
      fetchTweet();
      setTweets(tweetResponse)
      setLoading(false);
    }, 10000);
    localForage.getItem('user').then((storedData) => {
      setUserId(storedData);
    })
  }, [])

  function userChange(user) {
    localForage.setItem('user', user.user);
  }

  return (
    <TweetContext.Provider value={{
      userChange: user => userChange(user),
      tweets, setTweets,
      tweet, setTweet,
      length, setLength,
      userId, setUserId,
      loading, setLoading,
    }}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <div>
              {loading && <Spinner animation="grow" variant="info" className="spin" />}
              <NavigationBar />
              <TweetBox />
              <TweetList></TweetList>
            </div>
          </Route>
          <Route path="/profile">
            <NavigationBar />
            <Profile />
          </Route>
        </Switch>
      </Router>
    </TweetContext.Provider>

  )
}
export default App;