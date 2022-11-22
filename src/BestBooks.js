import axios from 'axios';
import React from 'react';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

/* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async() => {
  try{ 
    let results = await axios.get(`${process.env.REACT_APP_SERVER}/Books`)
    this.state({
      books:results.data,
    });
  }catch(err){
    console.log('we have an error', err.response.data)
  };
  }

componentDidMount(){
  this.getBooks();
}
  
  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
