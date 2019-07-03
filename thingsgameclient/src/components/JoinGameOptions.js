import React, { useState } from 'react';
import { Button, Container, Row, Col, Jumbotron, Form } from 'react-bootstrap';
import { goToHome } from '../Router';
import { joinGame } from '../redux/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../redux/actions/errorActions';


function JoinGameOptions({ history }) {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors);
    const [nameField, setNameField] = useState('');
    const [gameIdField, setGameIdField] = useState('');

    function handleJoinGame(e) {
        e.preventDefault();
        if (nameField !== '' && gameIdField !== '') {
            dispatch(setError('joinGameError', ''));
            dispatch(joinGame(nameField, gameIdField, history));
            setNameField('');
            setGameIdField('');
        }
        else if (nameField === '') {
            dispatch(setError('joinGameError', 'Name cannot be blank'));
        }
        else {
            dispatch(setError('joinGameError', 'Game code cannot be blank'));
        }
    }

    function nameOnChange(e) {
        setNameField(e.target.value);
        if (errors.joinGameError !== '') {
            dispatch(setError('joinGameError', ''));
        }
    }

    function gameIdOnChange(e) {
        setGameIdField(e.target.value);
        if (errors.joinGameError !== '') {
            dispatch(setError('joinGameError', ''));
        }
    }

    function printError() {
        if (errors.joinGameError !== '') {
            return <React.Fragment><br></br><h5>{errors.joinGameError}!!!</h5></React.Fragment>
        }
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
                                <Button variant='secondary' block onClick={() => { dispatch(setError('joinGameError', '')); goToHome(history) }}>
                                    Back
                                </Button>
                                {printError()}
                            </center>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );

}

export default JoinGameOptions;