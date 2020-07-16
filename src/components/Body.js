import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './body/Login'
import Posts from './body/Posts'
import AddPosts from './body/AddPosts'
import Signup from './body/Signup'
import PostDetail from './body/PostDetail'
import AllPosts from './body/AllPosts'


const Body = () =>

    <Switch>

        <Route path="/login" component={Login}/>
        <Route path="/singup" component={Signup}/>
        <Route path="/createpost" component={AddPosts}/>
        <Route path="/posts" component={Posts}/>
        <Route path="/post/:postid/" component={PostDetail}/>
        <Route path="/allposts" component={AllPosts}/>

    </Switch>


export default Body