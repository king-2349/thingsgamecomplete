import React from 'react';
import { Button, Container, Row, Col, Jumbotron, Form } from 'react-bootstrap';
import { goToHome } from '../Router';
import { joinGame } from '../redux/actions/gameSetupActions';
import {useDispatch} from 'react-redux';


function JoinGameOptions({ history }) {
    const dispatch = useDispatch();
    
    function handleJoinGame(e) {
        e.preventDefault();
        dispatch(joinGame(e.target[0].value, e.target[1].value, history));
    }

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col>
                        <br></br>
                        <Jumbotron>
                            <center>
                                <h3>Join Game Options</h3>
                                <Form onSubmit={(e) => handleJoinGame(e)}>
                                    <Form.Group controlId='playerName'>
                                        <Form.Label>Name: </Form.Label>
                                        <br></br>
                                        <Form.Control type='input'></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='numberOfPlayers'>
                                        <Form.Label>Game Code: </Form.Label>
                                        <br></br>
                                        <Form.Control type='input'></Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary' block>
                                        Start
                                    </Button>
                                </Form>
                                <br></br>
                                <Button variant='secondary' block onClick={() => goToHome(history)}>
                                    Back
                                </Button>
                            </center>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );

}

export default JoinGameOptions;