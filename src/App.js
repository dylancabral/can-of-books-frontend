import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BestBooks from './components/BestBooks';
import About from './components/About'
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Container } from 'react-bootstrap';
// import axios from 'axios';


class App extends React.Component {
  render() {
    return (
      <>
        {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        {this.props.auth0.isAuthenticated ? 
        <>
          <Container>
            <Router>
              <Header />
              <Routes>
                <Route exact path="/" element={<BestBooks />}></Route>
                <Route exact path="/About" element={<About />}></Route>
                <Route exact path="/user" element={<Profile />}></Route>
              </Routes>
            </Router>
          </Container>
        </> : <h2>Please Log in</h2>}
        
        <Footer />
      </>
    )
  }
}

export default withAuth0(App);
