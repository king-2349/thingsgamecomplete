import React from 'react';
import { ListGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { backToLobby } from '../../redux/actions/gameActions';

function Results({ history }) {
    const gameInfo = useSelector(state => state.gameInfo);
    const playerInfo = useSelector(state => state.playerInfo);
    const dispatch = useDispatch();

    function handleBackToLobby(e) {
        e.preventDefault();
        dispatch(backToLobby(gameInfo.gameId));
    }

    function turnPlayerInfoIntoArray(){
        let players = [];
        for(let key in playerInfo){
            players.push({
                name:key,
                ...playerInfo[key]
            })
        }
        return players;
    }

    return (
        <React.Fragment>
            <h5>Results:</h5>
            <ListGroup>
                {
                    turnPlayerInfoIntoArray().map(player =>
                        <ListGroup.Item key={player.name} style={{ color: 'white' }}>
                            <Container>
                                <Row>
                                    <Col xs={9} style={{textAlign:'left'}}>{player.name}</Col>
                                    <Col xs={3} style={{textAlign:'right'}}>{'+'+player.roundPoints}</Col>
                                </Row>
                                <Row>
                                    <Col>{player.answer}</Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>)
                }
            </ListGroup>
            <br></br>
            <Button variant='primary' block onClick={(e) => handleBackToLobby(e)}>
                Back to Lobby
            </Button>
        </React.Fragment>
    );
}

export default Results;