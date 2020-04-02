import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Login from '../components/auth/login';
import { Route, Switch } from 'react-router-dom';
import Register from '../components/auth/register';
import Timeline from '../containers/timeline';
import PostUpload from '../components/postUpload';
import Single_post from '../components/single_post';

export default class App extends React.Component {
    headerCommunicationHandler = () => {
        this.refs.head.refresh();
    }
    render() {
        
        return (
            <div>
                <Header ref='head' />
                <Switch>
                    <Route exact path='/single_post' component={Single_post} />
                    {/* <Route path='/timeline' component={Timeline} /> */}
                    <Route exact path='/login'
                        render={(props) => <Login {...props} headerRefreshHandler={this.headerCommunicationHandler} />}
                    />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/postupload' component={PostUpload} />
                    <Route path='/' component={Timeline} />
                    
                </Switch>
                <Footer />
            </div>
        );
    }
}