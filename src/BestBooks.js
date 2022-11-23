import axios from 'axios';
import React from 'react';
import { Carousel, Container } from 'react-bootstrap';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`)
      console.log(results.data);
      this.setState({
        books: results.data,
      });
    } catch(err) {
      console.log('we have an error', err.response.data)
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    let carouselBooks = this.state.books.map((book, index) => (
      <Carousel.Item key={book._id}>
        <img
          className="books"
          src="https://images.unsplash.com/photo-1523593288094-3ccfb6b2c192?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1014&q=80"
          alt={book.title}
        />
        <Carousel.Caption>
          <h3 style={{ backgroundColor: 'black', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>Book: {book.title}
          </h3>
          <p>
            Book is About:{book.description}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    ))
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? (
          <Container>
            <Carousel>
              {carouselBooks}
            </Carousel>
          </Container>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
