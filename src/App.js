import React from 'react';
import {BrowserRouter} from 'react-router-dom'

import Header from './components/Header'
import Body from './components/Body'

import './styles/App.css'

const App = () =>

    <BrowserRouter>

        <Header/>

        <Body/>

    </BrowserRouter>

export default App;
