import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { submitTopic, backToLobby } from '../../redux/actions/gameActions';

function Topic({ history }) {
    const dispatch = useDispatch();
    const gameInfo = useSelector(state => state.gameInfo);
    const playerInfo = useSelector(state => state.playerInfo);
    const name = useSelector(state => state.name);
    const [topicField, setTopicField] = useState('');

    function handleTopicSubmit(e) {
        e.preventDefault();
        dispatch(submitTopic(gameInfo.gameId, topicField));
        setTopicField('');
    }

    function topicOnChage(e) {
        setTopicField(e.target.value);
    }

    function getView() {
        switch (playerInfo[name].state) {
            case 'topic':
                return (
                    <React.Fragment>
                        <h5>Enter topic for round:</h5>
                        <Form onSubmit={(e) => { handleTopicSubmit(e) }}>
                            <Form.Group controlId='topicSubmission'>
                                <Form.Label>Topic: </Form.Label>
                                <br></br>
                                <Form.Control type='input' value={topicField} onChange={topicOnChage}></Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary' block>
                                Submit Topic
                            </Button>
                        </Form>
                    </React.Fragment>
                )
            case 'waiting':
                return (
                    <h5 style={{ marginBottom: '15px', fontStyle: 'italic' }}>Waiting for topic submission...</h5>
                )
            default:
                return (<p></p>)
        }
    }

    return (
        <React.Fragment>
            {getView()}
            <br></br>
            <Button variant='primary' block onClick={() => dispatch(backToLobby(gameInfo.gameId))}>
                Back to Lobby
            </Button>
        </React.Fragment>
    );
}

export default Topic;