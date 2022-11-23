// import axios from 'axios';
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';


class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <>
        <Container className="mt-5">
          <Form onSubmit={this.props.handleBookSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Button type="submit">Add Book</Button>
          </Form>
        </Container>
      </>
    )
  }
}

export default BookForm;
