import React, { useState } from 'react';
import { Button, Container, Row, Col, Jumbotron, Form } from 'react-bootstrap';
import { goToHome } from '../Router';
import { joinGame } from '../redux/actions/gameSetupActions';
import { useDispatch } from 'react-redux';


function JoinGameOptions({ history }) {
    const dispatch = useDispatch();
    const [nameField, setNameField] = useState('');
    const [gameIdField, setGameIdField] = useState('');

    function handleJoinGame(e) {
        e.preventDefault();
        dispatch(joinGame(nameField,gameIdField, history));
        setNameField('');
        setGameIdField('');
    }

    function nameOnChange(e) {
        setNameField(e.target.value);
    }

    function gameIdOnChange(e) {
        setGameIdField(e.target.value);
    }

    //Can have flag in store for different errors like game not found or name already taken
    //if statements that only render stuff when flag is true
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
                                        <Form.Control type='input' value={nameField} onChange={nameOnChange}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='numberOfPlayers'>
                                        <Form.Label>Game Code: </Form.Label>
                                        <br></br>
                                        <Form.Control type='input' value={gameIdField} onChange={gameIdOnChange}></Form.Control>
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