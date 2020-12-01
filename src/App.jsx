import React from 'react';
import './App.css';
import TweetBox from './Components/tweetBox';
import TweetList from './Components/tweetList';
import * as localForage from 'localforage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    }
  }

  addTweet(newTweet) {
    this.setState(state => {
      return {
        tweets: [newTweet, ...state.tweets]
      }
    });
  }

  componentDidMount() {
    localForage.getItem('tweets').then((storedData) => {
      if (storedData) {
        this.setState({ tweets: storedData });
      };
    });
  }

  componentWillUpdate(nextProps, nextState) {
    localForage.setItem('tweets', nextState.tweets);
  }

  render() {
    const { tweets } = this.state;
    return <div>
      <TweetBox onAddTweet={newTweet => this.addTweet(newTweet)} />
      <TweetList tweets={tweets}></TweetList>
    </div>
  }
}

export default App;
