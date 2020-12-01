import React from 'react'
import { Alert, Button, Container, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

class TweetBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: '',
            length: 0,
        }
    }
    tweetInput(event) {
        this.setState({ tweet: event.target.value })
        this.setState({ length: event.target.value.length })
    }
    onSubmiting(event) {
        event.preventDefault()
        const newTweet = {
            text : this.state.tweet,
            date : new Date().toString().split(' ').slice(0,5).join(' ') 
        }
        this.props.onAddTweet(newTweet)
    }
    render() {
        return (
            <Container>
                <Form
                    onSubmit={event => this.onSubmiting(event)}
                    className="form-group">
                    <FormControl
                        as="textarea"
                        className="form-control tweetBox"
                        id=''
                        rows={10}
                        onChange={event => this.tweetInput(event)}
                        placeholder='What you have in mind...'>
                    </FormControl>
                    <Button
                        disabled={this.state.length > 140}
                        variant="primary"
                        className='tweetBtn'
                        type='submit'
                    >Tweet
                </Button>
                </Form>
                <Alert
                    className="maxChar"
                    show={this.state.length > 140}
                    variant={'danger'}
                >
                    The tweet can't contain more then 140 chars.
                    </Alert>

            </Container>
        )

    }

}
export default TweetBox;