import React from 'react';
import './App.css';
import NavigationBar from './Components/navBar';
import TweetBox from './Components/tweetBox';
import TweetList from './Components/tweetList';
import { getTweet, createTweet } from './lib/api';
import Profile from './Components/profile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import * as localForage from 'localforage';


let timer;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdraft: '',
      tweets: [],
      loading: false
    }
  }

  componentDidMount() {
    this.fetchTweet();
  }

  addTweet(newTweet) {
    const { loading } = this.state;
    try {
      if (!loading) {
        this.setState({ loading: true });
        createTweet(newTweet).then(() => {
          this.fetchTweet();
        })
      };
    } catch (error) {
      alert("Nope");
    }
    timer = setTimeout(() => {
      alert("Sorry, your tweet wasn't uploaded :(")
      this.setState({ loading: false })
    }, 22000)
  }

  userChange(user) {
    localForage.setItem('user', user.user)
  }

  async fetchTweet() {
    clearTimeout(timer)
    this.setState({ loading: true });
    localForage.getItem('user').then((storedData) => {
      this.setState({ userdraft: storedData });
    })
    const response = await getTweet();
    const tweet = response.data;
    this.setState({ tweets: tweet.tweets, loading: false });
  }


  render() {
    const { tweets, loading, userdraft } = this.state;
    return (
      <Router>
        <Switch>
          <Route path='/' exact>
            <div>
              {loading && <h5 className="loading" >Loading...</h5>}
              <NavigationBar />
              <TweetBox userdraft={userdraft} onAddTweet={newTweet => this.addTweet(newTweet)} />
              <TweetList tweets={tweets}></TweetList>
            </div>
          </Route>
          <Route path="/profile">
            <NavigationBar />
            <Profile userChange={user => this.userChange(user)} />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
