import axios from 'axios';
import React from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import BookCards from './BookCard';
import BookForm from './BookForm'
import { withAuth0 } from '@auth0/auth0-react';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showForm: false
    }
  }

  //REST FUNCTIONS//

  //gets books from mongo
  getBooks = async () => {
    // if (this.props.auth0.isAuthenticated) {

    //   // get the token from Auth0
    //   const res = await this.props.auth0.getIdTokenClaims();

    //   // extract the token from the response
    //   // MUST use double underscore
    //   const jwt = res.__raw;

    //   // this is from the axios docs, we can send a config object to make our axios calls. We need it to send our token to the server:
    //   let config = {
    //     method: 'get',
    //     baseURL: process.env.REACT_APP_SERVER,
    //     url: '/books',
    //     headers: {
    //       "Authorization": `Bearer ${jwt}`
    //     }
    //   }
    //   let bookResults = await axios(config);

    //   this.setState({
    //     books: bookResults,
    //   });

    //   // // Old way we are used to making axios requests:
    //   // let url = `${process.env.REACT_APP_SERVER_URL}/books`;
    //   // let bookResults = await axios.get(url);
    // }
    try {
      let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`)
      this.setState({
        books: results.data,
      });

    } catch (err) {
      console.log('we have an error', err.response.data)
    };
  }

  //adds new book obj to mongo
  postBook = async (aBook) => {
    try {
      // make the request to add a book to my server
      // axios.post will return the book that was added to the database with the ID and version number
      // axios.post takes in 2 parameters: the URL endpoint, and the thing we want added:
      let bookThatWasAdded = await axios.post(`${process.env.REACT_APP_SERVER}/books`, aBook);
      // console.log(bookThatWasAdded);
      this.setState({
        books: [...this.state.books, bookThatWasAdded.data]
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  //deletes book obj with matching ids in mongo
  deleteBook = async (id) => {
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

  //updates book obj with matching ids in mongo
  updateBook = async (bookToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`;
      let updatedBookObj = await axios.put(url, bookToUpdate);

      let updateBookArr = this.state.books.map(book => {
        return book._id === bookToUpdate._id ? updatedBookObj.data : book;
      });
      this.setState({
        books: updateBookArr
      });
    } catch (err) {
      console.log('ITS A TRAP!', err.response.data)
    }
  }

  //on submit
  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
    }
    this.postBook(newBook);
    // console.log(newBook);

  }

  //checks if things worked correctly
  componentDidMount() {
    this.getBooks();
  }

  render() {
    //maps through each item in books array (in state) and makes a new carousel item
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
        </Carousel.Caption>
      </Carousel.Item>
    ))

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {/* render Carousel */}
        {this.state.books.length > 0 ? (
          <Container>
            <Carousel>
              {carouselBooks}
            </Carousel>
          </Container>
        ) : (
          <h3>No Books Found :(</h3>
        )}

        {/* Add Form */}
        <Container>
          <Button onClick={() => this.setState({ showForm: true })}>
            Add Book
          </Button>
          {this.state.showForm &&
            <BookForm handleBookSubmit={this.handleBookSubmit} />
          }
          {
            this.state.books.length > 0 &&
            <>
              {/* makes cards that let you edit data for objects in mongo */}
              <BookCards
                books={this.state.books}
                deleteBook={this.deleteBook}
                updateBook={this.updateBook}
              />
            </>
          }
        </Container>
      </>
    )
  }
}

export default withAuth0(BestBooks);
