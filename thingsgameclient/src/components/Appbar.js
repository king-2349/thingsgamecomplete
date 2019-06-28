import React from 'react';
import { Navbar, Container, Row, Col, Image } from 'react-bootstrap';
import Logo from '../icons8-home.svg';
import { goToHome } from '../Router';
import { withRouter } from 'react-router-dom';

function Appbar({ history }) {
  return (
    <React.Fragment>
      <Navbar bg='dark'>
        <Navbar.Brand style={{ color: 'white' }}>
          <Container style={{ padding: '0px' }}>
            <Row>
              <Col style={{ paddingLeft: '10px', margin: 0 }}>
                <Image src={Logo} alt='' width='30px' onClick={() => { goToHome(history); }}>
                </Image>
              </Col>
              <Col style={{ paddingLeft: '0px', margin: 0 }}>
                <h5>Things: The Game</h5>
              </Col>
            </Row>
          </Container>
        </Navbar.Brand>
      </Navbar>
    </React.Fragment>
  );
}

export default withRouter(Appbar);