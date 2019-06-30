import React, { useState } from 'react';
import { Button, Container, Row, Col, Jumbotron, Form } from 'react-bootstrap';
import { goToHome } from '../Router';
import { newGame } from '../redux/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../redux/actions/errorActions';

function NewGameOptions({ history }) {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors);
    const [nameField, setNameField] = useState('');

    function handleNewGame(e) {
        e.preventDefault();
        dispatch(newGame(nameField, history));
        setNameField('');
    }

    function nameOnChange(e) {
        setNameField(e.target.value);
        if (errors.newGameError !== '') {
            dispatch(setError('newGameError',''));
        }
    }

    function printError() {
        if (errors.newGameError !== '') {
            return <React.Fragment><br></br><h5>{errors.newGameError}!!!</h5></React.Fragment>
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
                                <h3>New Game Options</h3>
                                <Form onSubmit={(e) => { handleNewGame(e) }}>
                                    <Form.Group controlId='playerName'>
                                        <Form.Label>Name: </Form.Label>
                                        <br></br>
                                        <Form.Control type='input' value={nameField} onChange={nameOnChange}></Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary' block>
                                        Start
                                    </Button>
                                </Form>
                                <br></br>
                                <Button variant='secondary' block onClick={() => goToHome(history)}>
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

export default NewGameOptions;