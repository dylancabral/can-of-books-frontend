import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';

class UpdateBookForm extends React.Component {

  handleBookSubmit = (e) => {
    e.preventDefault();
    // get the data from the form
    let bookToUpdate = {
      title: e.target.title.value || this.props.book.title,
      description: e.target.description.value || this.props.book.description,
      status: e.target.status.value || this.props.book.status,
      _id: this.props.book._id,
      __v: this.props.book.__v
    }
    // console.log('updated Books: ', bookToUpdate);
    this.props.updateBook(bookToUpdate);
  }


  render() {
    // console.log('Book we are updating: ', this.props.book);
    return (
      <Container>
        <Form onSubmit={this.handleBookSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder={this.props.book.title}/>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder={this.props.book.description}/>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" placeholder={this.props.book.status}/>
          </Form.Group>
          <Button type="submit">Update Book</Button>
        </Form>
      </Container>
    )
  }
}

export default UpdateBookForm;
