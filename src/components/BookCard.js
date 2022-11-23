import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import UpdateBookForm from './UpdateBookForm';

class BookCards extends React.Component {
  render() {
    // renders out the book card components below into a list
    let renderBooks = this.props.books.map((book) => (
      <BookCard 
        book={book} 
        key={book._id}
        deleteBook={this.props.deleteBook}
        updateBook={this.props.updateBook}
      />
    ));

    return (
      <>
        <Container>
          <ListGroup>
            {renderBooks}
          </ListGroup>
        </Container>
      </>
    )
  }
}


//second component in this page.
// all the information needed for each book card in the book cards array
class BookCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  render() {
    return (
      <>
      <ListGroup.Item>
        {this.props.book.title}
        <div>
        <Button 
          variant="dark"
          onClick={() => this.props.deleteBook(this.props.book._id)}
        >
          Delete Book
        </Button>
        <Button
          onClick={() => this.setState({ showUpdateForm: true})}
        >
          Update Book
        </Button>
        </div>
      </ListGroup.Item>
      {
        this.state.showUpdateForm && 
        <UpdateBookForm 
          book={this.props.book}
          updateBook={this.props.updateBook}
        />
      }
      </>
    )
  }
}

export default BookCards;
