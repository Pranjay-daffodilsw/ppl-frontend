import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import store from '../redux/store';

import Header from './Header';
import Footer from './Footer';
import Login from '../screens/login';
import Register from '../screens/register';
import Timeline from '../screens/Timeline';
import PostUpload from '../components/postUpload';
import Single_post from '../screens/single_post';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store} >
          <Header />
          <Switch>
            <Route exact path='/single_post' component={Single_post} />
            <Route exact path='/login'
              render={(props) => <Login {...props} />}
            />
            <Route exact path='/register' component={Register} />
            <Route exact path='/postupload' component={PostUpload} />
            <Route exact path='/timeline' component={Timeline} />
            <Redirect from='/' to='/timeline' />
          </Switch>
          <Footer />
        </Provider>
      </div>
    );
  }
}