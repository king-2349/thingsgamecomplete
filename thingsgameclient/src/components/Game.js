import React from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Lobby from './game_components/Lobby';
import Answer from './game_components/Answer';
import Topic from './game_components/Topic';
import Vote from './game_components/Vote';
import Results from './game_components/Results';
import { goToHome } from '../Router';

function Game({ history }) {
    const gameInfo = useSelector(state => state.gameInfo);

    if (gameInfo.gameId === '') {
        goToHome(history);
    }

    function renderGameState() {
        switch (gameInfo.gameState) {
            case 'lobby':
                return <Lobby history={history} />
            case 'topic':
                return <Topic history={history} />
            case 'answering':
                return <Answer history={history} />
            case 'voting':
                return <Vote history={history} />
            case 'results':
                return <Results history={history} />
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
                            {renderGameState()}
                        </Jumbotron>
                    </center>
                </Col>
            </Row>
        </Container>
    );
}

export default Game;