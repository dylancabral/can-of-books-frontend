import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BestBooks from './components/BestBooks';
import About from './components/About'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import { Container } from 'react-bootstrap';
// import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    // let books = this.state.books.map(book => (
    //   <p>{books.title} is about {books.description} and we as a group have {books.status} it</p>
    // ));
    console.log('hello world!');
    return (
      <>
        <Container>
          <Router>
            <nav>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
            </nav>
            <Header />
            <Routes>
              <Route
                exact path="/"
                element={<BestBooks />}
              >
              </Route>
              <Route
                exact path="/About"
                element={<About />}
              >
              </Route>
            </Routes>
            <Footer />
          </Router>
        </Container>
      </>
    )
  }
}

export default App;
