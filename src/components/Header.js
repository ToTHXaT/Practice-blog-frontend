import React from 'react'
import {Link} from 'react-router-dom'

import style from '../styles/Header.module.css'

const Header = () =>

    <div className={style.navbar}>
        <Link to="/login" className={style.link}> Log in </Link>
        <Link to="/singup" className={style.link}> Sing up </Link>
        <Link to="/posts" className={style.link}> My posts </Link>
        <Link to="/createpost" className={style.link}> Create Post </Link>
        <Link to="/allposts" className={style.link}> All Posts </Link>
    </div>


export default Header