import React from 'react';
import { Navbar, Container, Row, Col, Image } from 'react-bootstrap';
import HomeIcon from '../home.svg';
import { goToHome } from '../Router';
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setError } from '../redux/actions/errorActions';

function Appbar({ history }) {
  const dispatch = useDispatch();

  function clearErrors() {
    dispatch(setError('newGameError', ''));
    dispatch(setError('joinGameError', ''));
    dispatch(setError('lobbyError', ''));
  }

  return (
    <React.Fragment>
      <Navbar bg='dark'>
        <Navbar.Brand style={{ color: 'white' }}>
          <Container style={{ padding: '0px' }}>
            <Row>
              <Col style={{ paddingLeft: '10px', margin: 0 }}>
                <Link to='/'>
                  <Image src={HomeIcon} alt='' width='30px' onClick={() => { clearErrors(); goToHome(history); }}>
                  </Image>
                </Link>
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