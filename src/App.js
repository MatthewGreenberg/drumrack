import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './GlobalStyle'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import MediaWrapper from './Media/MediaWrapper/MediaWrapper'
import Home from './Home/Home'
import Nav from './Nav/Nav'
import Demo from './Demo/Demo'

const GRAPHCMS_API = process.env.REACT_APP_GRAPHCMS_ENDPOINT

const client = new ApolloClient({
  uri: GRAPHCMS_API,
  cache: new InMemoryCache(GRAPHCMS_API),
})

const theme = {
  gray: 'rgba(255,255,255,0.6)',
  darkGray: 'rgba(255,255,255,0.8)',
  darkerGray: '#0F0F0F',
  lightGray: '#EAEAEA',
  textColor: '#2D2D2D',
  blue: '#3250F0',
  mobile: '400px',
  tablet: '768px',
  laptop: '1000px',
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
}

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ToastContainer transition={Slide} hideProgressBar={true} />
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/media">
            <MediaWrapper />
          </Route>
          <Route path="/demo">
            <Demo />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  </ThemeProvider>
)

export default App
