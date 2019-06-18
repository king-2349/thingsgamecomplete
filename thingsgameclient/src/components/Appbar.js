import React from 'react';
import { Navbar, Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../logo.svg';

function Appbar() {
  return (
    <React.Fragment>
      <Navbar bg='dark'>
        <Link to='/'>
          <Navbar.Brand style={{ color: 'white' }}>
            <Container style={{ padding: '0px' }}>
              <Row>
                <Col style={{ padding: '0px' }}><h5><Image src={Logo} alt='' width='50px'></Image>Things: The Game</h5></Col>
              </Row>
            </Container>
          </Navbar.Brand>
        </Link>
      </Navbar>
    </React.Fragment>
  );
}

export default Appbar;