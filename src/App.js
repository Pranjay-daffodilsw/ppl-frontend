import React from 'react';
import Header from './header';
import Footer from './footer';
import Login from './login';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import Register from './register';
import Timeline from './timeline';
import PostUpload from './postUpload';
import Single_post from './single_post';
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        // let categoryList = []
        // axios.get('http://localhost:3005/post/get/all')
        //     .then((response) => {
        //         response.data.map((value, index) => {
        //             if (categoryList.includes(value.category) === false) {
        //                 categoryList.push(`${value.category}`);
        //             }
        //         }
        //         )
        //     })
        //     .catch((err) => { console.log('axios error in App.js - ', err) })
        // this.state = {
        //     categoryList: categoryList
        // };
    }
    // componentDidMount() {
    //     console.log('App props - ', this.props);
    // }
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/single_post' component={Single_post} />
                    <Route path='/timeline' component={Timeline} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/postupload' component={PostUpload} />
                    <Redirect from='/' to='/timeline' />
                </Switch>
                <Footer />
            </div>
        );
    }
}