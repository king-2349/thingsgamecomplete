import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Answer({ history }) {
    const gameInfo = useSelector(state => state.gameInfo);

    function handleAnswer(e) {
        e.preventDefault();
    }

    return (
        <React.Fragment>
            <h5>Topic:</h5>
            <h5 style={{ marginBottom: '15px', fontStyle: 'italic'}}>{gameInfo.topic}</h5>
            <Form onSubmit={(e) => handleAnswer(e)}>
                <Form.Group controlId='answerField'>
                    <Form.Control type='input'></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' block>
                    Submit Answer
                </Button>
            </Form>
        </React.Fragment>
    );
}

export default Answer;