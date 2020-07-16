import React from 'react'
import {Link} from 'react-router-dom'

import style from '../../../styles/body/posts/ListOfPosts.module.css'


const PostDetail = ({id, user_id, title, body, pub_date}) => {
    return (
        <div key={id} className={style.post}>
            <div className={style.title}> <Link to={`/post/${id}`}>{title}</Link>  </div>
            <div className={style.pub_date}> Published at <strong>{new Date(pub_date).toLocaleString("ru")}</strong> by <i>{user_id}</i></div>
            <br/>
        </div>
    )
}

const ListOfPosts = ({lop}) => {

    return (<div className={style.list}>

        {lop.map(PostDetail)}

        </div>
    )
}

export default ListOfPosts