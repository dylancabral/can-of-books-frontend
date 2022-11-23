import axios from 'axios';
import React from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import BookForm from './BookForm'


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
    } catch (err) {
      console.log('we have an error', err.response.data)
    };
  }

  postBook = async (aBook) => {
    try {
      // make the request to add a book to my server
      // axios.post will return the book that was added to the database with the ID and version number
      // axios.post takes in 2 parameters: the URL endpoint, and the thing we want added:
      let bookThatWasAdded = await axios.post(`${process.env.REACT_APP_SERVER}/books`, aBook);
      console.log(bookThatWasAdded);
      this.setState({
        books: [...this.state.books, bookThatWasAdded.data]
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  deleteBook = async (id) => {
    // ex URL:
    // http://localhost:3001/books/637bceabc57c693faee21e8f
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;
      // do not assume that axios.delete() will return a value
      await axios.delete(url);
      // // this is ok for today's lab
      // this.getbooks();
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      })
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
    }
    this.postBook(newBook);
    console.log(newBook);

  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    let carouselBooks = this.state.books.map((book) => (
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
          <Button
            variant="dark"
            onClick={() => this.deleteBook(book._id)}
          >
            Delete Book
          </Button>
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
        <BookForm
          handleBookSubmit={this.handleBookSubmit}
        />
      </>
    )
  }
}

export default BestBooks;
