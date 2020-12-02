import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TweetContext } from '../Context/TweetContext';


class Profile extends React.Component {
    static contextType = TweetContext;
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    userChange(event) {
        this.setState({ user: event.target.value })
    }
    onSubmiting(event) {
        event.preventDefault();
        const userName = {
            user: this.state.user
        }
        this.context.userChange(userName);
    }
    render() {
        return (
            <div>
                <span className="profile" >Profile</span>
                <Form
                    onSubmit={event => this.onSubmiting(event)}
                    className="form-group">
                    <Form.Label className='userLabel'>User Name</Form.Label>
                    <FormControl
                        as="textarea"
                        className="form-control userNameBox"
                        id=''
                        rows={1}
                        onChange={event => this.userChange(event)}
                        placeholder='User Name..'>
                    </FormControl>
                    <Button
                        variant="primary"
                        className='userBtn'
                        type='submit'
                    >Save
                </Button>
                </Form>
            </div>
        )
    }
}
export default Profile;