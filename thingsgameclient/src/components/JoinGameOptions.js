import React from 'react';
import { Button, Container, Row, Col, Jumbotron, Form } from 'react-bootstrap';
import { goToHome } from '../Router';
import { joinNewGame } from '../socket/GameSocket';


function JoinGameOptions({ history }) {
    
    function handleJoinGame(e, history) {
        e.preventDefault();
        joinNewGame(e.target[1].value, e.target[0].value, history);
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
                                <Form onSubmit={(e) => handleJoinGame(e, history)}>
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