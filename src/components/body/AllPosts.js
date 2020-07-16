import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

import ListOfPosts from './posts/ListOfPosts'

function Updater(){
    const [, setValue] = useState(0);
    return () => setValue(value => ++value);
}

const getPosts = async (f) => {
    if(!document.globalState.page) document.globalState.page = 1;

    let skip = (document.globalState.page - 1) * 10;
    let limit = 30

    let a = await fetch(`http://${document.serverUrl}/api/posts?limit=${limit}&offset=${skip}`, {
        method : 'GET'
    });

    a = await a.json()

    document.globalState.allPosts = a

    f()
}

const AllPosts = () => {
    const forceUpdate = Updater();

    if(!document.globalState.allPosts)
    {
        getPosts(forceUpdate)
        return null;
    }
    else {
        return <ListOfPosts lop={document.globalState.allPosts}/>
    }
}


export default AllPosts