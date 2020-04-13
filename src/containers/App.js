import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

import Header from '../components/header';
import Footer from '../components/footer';
import Login from '../components/auth/login';
import { Route, Switch, Redirect } from 'react-router-dom';
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
                <Provider store={store} >
                    <Header ref='head' />
                    <Switch>
                        <Route exact path='/single_post' component={Single_post} />
                        {/* <Route path='/timeline' component={Timeline} /> */}
                        <Route exact path='/login'
                            render={(props) => <Login {...props} headerRefreshHandler={this.headerCommunicationHandler} />}
                        />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/postupload' component={PostUpload} />
                        <Route exact path='/timeline' component={Timeline} />
                        <Redirect from='/' to='/timeline'/>
                    </Switch>
                    <Footer />
                </Provider>
            </div>
        );
    }
}