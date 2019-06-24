import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { submitAnswer } from '../../redux/actions/gameSetupActions';

function Answer({ history }) {
    const dispatch = useDispatch();
    const gameInfo = useSelector(state => state.gameInfo);
    const playerInfo = useSelector(state => state.playerInfo);
    const name = useSelector(state => state.name);
    const [answerField, setAnswerField] = useState('');

    function handleAnswer(e) {
        e.preventDefault();
        dispatch(submitAnswer(gameInfo.gameId, name, answerField))
        setAnswerField('');
    }

    function answerOnChange(e) {
        setAnswerField(e.target.value);
    }

    function getView() {
        switch (playerInfo[name].state) {
            case 'unanswered':
                return (
                    <Form onSubmit={(e) => handleAnswer(e)}>
                        <Form.Group controlId='answerField'>
                            <Form.Label>Answer: </Form.Label>
                            <br></br>
                            <Form.Control type='input' value={answerField} onChange={answerOnChange}></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' block>
                            Submit Answer
                        </Button>
                    </Form>
                )
            case 'answered':
                return (
                    <h5>Waiting on others to submit answer...</h5>
                )
            default:
                return (
                    <React.Fragment></React.Fragment>
                )
        }
    }

    return (
        <React.Fragment>
            <h5>Topic:</h5>
            <h5 style={{ marginBottom: '15px', fontStyle: 'italic' }}>{gameInfo.topic}</h5>
            {getView()}
        </React.Fragment>
    );
}

export default Answer;