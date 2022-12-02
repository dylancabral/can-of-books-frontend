import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BestBooks from './components/BestBooks';
import About from './components/About'
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
          <Container>
            <Router>
              <Header />
              {this.props.auth0.isAuthenticated ? 
              <Routes>
                <Route exact path="/" element={<BestBooks />}></Route>
                <Route exact path="/About" element={<About />}></Route>
                <Route exact path="/user" element={<Profile />}></Route>
              </Routes>
               : <h2>Please Log in</h2>}
            </Router>
          </Container>
 
        <Footer />
      </>
    )
  }
}

export default withAuth0(App);
