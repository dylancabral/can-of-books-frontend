import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books:[]
    }
  }

  getBooks = async () => {
    try{
      let results = await axios.get(`${REACT_APP_SERVER}/books`);
      this.setState({
        books: results.data
      })
    }catch(error){
      console.log('we have an error here', error.response.data)
    }
  }
  render() {
    let books = this.state.books.map(book => (
      <p>{books.title} is about {books.description} and we as a group have {books.status} it</p>
    ))
    console.log('hello world!');
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
            <Route
            exact path="/About"
            element={<About/>}

            >

            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
