import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
// import { BrowserRouter as NavLink } from "react-router-dom";
// import BestBooks from './BestBooks';
// import About from './About'

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>My Favorite Books</Navbar.Brand>
          <NavItem>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/user">Profile</Link>
          </NavItem>
          {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Navbar >
      </>
    )
  }
}

export default withAuth0(Header);
