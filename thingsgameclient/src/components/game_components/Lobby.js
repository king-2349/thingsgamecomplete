import React from 'react';
import { ListGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { startRound } from '../../redux/actions/gameActions';
import { goToHome } from '../../Router';
import { setError } from '../../redux/actions/errorActions';

function Lobby({ history }) {
    const errors = useSelector(state => state.errors);
    const gameInfo = useSelector(state => state.gameInfo);
    const playerInfo = useSelector(state => state.playerInfo);
    const dispatch = useDispatch();

    function handleStartRound(e) {
        e.preventDefault();
        dispatch(startRound(gameInfo.gameId));
    }

    function turnPlayerInfoIntoArray() {
        let players = [];
        for (let key in playerInfo) {
            players.push({
                name: key,
                ...playerInfo[key]
            })
        }
        return players;
    }

    function printError() {
        if (errors.lobbyError !== '') {
            return <React.Fragment><br></br><h5>{errors.lobbyError}!!!</h5></React.Fragment>
        }
    }

    return (
        <React.Fragment>
            <h4>Game Code: {gameInfo.gameId}</h4>
            <h5>Players:</h5>
            <ListGroup>
                {
                    turnPlayerInfoIntoArray().map(player =>
                        <ListGroup.Item key={player.name} style={{ color: 'white' }}>
                            <Container>
                                <Row>
                                    <Col xs={9} style={{ textAlign: 'left' }}>{player.name}</Col>
                                    <Col xs={3} style={{ textAlign: 'right' }}>{player.points}</Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>)
                }
            </ListGroup>
            <br></br>
            <Button variant='primary' block onClick={(e) => handleStartRound(e)}>
                Start Round
            </Button>
            <Button variant='secondary' block onClick={() => { dispatch(setError('lobbyError', '')); goToHome(history) }}>
                Leave Game
            </Button>
            {printError()}
        </React.Fragment>
    );
}

export default Lobby;