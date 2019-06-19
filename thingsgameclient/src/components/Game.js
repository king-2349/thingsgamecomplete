import React from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Lobby from './game_components/Lobby';
import Answer from './game_components/Answer';

function Game({ history }) {
    const gameId = useSelector(state => state.gameId);
    const gameInfo = useSelector(state => state.gameInfo);

    function renderGameState() {
        switch (gameInfo.gameState) {
            case 'lobby':
                return <Lobby history={history} />
            case 'answer':
                return <Answer history={history} />
            default:
                return <Lobby history={history} />
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <center>
                        <br></br>
                        <Jumbotron>
                            <h4>Game Code: {gameId}</h4>
                            {renderGameState()}
                        </Jumbotron>
                    </center>
                </Col>
            </Row>
        </Container>
    );
}

export default Game;