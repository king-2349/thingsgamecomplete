import React from 'react';
import { Button, Container, Row, Col, Jumbotron, Form } from 'react-bootstrap';
import { goToHome } from '../Router';
//import { useDispatch } from 'react-redux';

import { startNewGame } from '../socket/GameSocket';

function NewGameOptions({ history }) {

    //const dispatch = useDispatch();

    function handleNewGame(e, history) {
        e.preventDefault();
        startNewGame(e.target[0].value, history);
    }

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col>
                        <br></br>
                        <Jumbotron>
                            <center>
                                <h3>New Game Options</h3>
                                <Form onSubmit={(e) => { handleNewGame(e, history) }}>
                                    <Form.Group controlId='playerName'>
                                        <Form.Label>Name: </Form.Label>
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

export default NewGameOptions;