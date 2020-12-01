import React from 'react';
import './App.css';
import TweetBox from './Components/tweetBox';
import TweetList from './Components/tweetList';
import { getTweet, createTweet } from './lib/api';


let timer;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
   timer = setTimeout(()=>{
      alert("Sorry, your tweet wasn't uploaded :(")
      this.setState({loading : false})
    }, 5000)
  }


  async fetchTweet() {
    clearTimeout(timer)
    this.setState({ loading: true });
    const response = await getTweet();
    const tweet = response.data;
    this.setState({ tweets: tweet.tweets, loading: false });
  }

  render() {
    const { tweets, loading } = this.state;
    return <div>
      {loading && <h5 className="loading" >Loading...</h5>}
      <TweetBox onAddTweet={newTweet => this.addTweet(newTweet)} />
      <TweetList tweets={tweets}></TweetList>
    </div>
  }
}

export default App;
