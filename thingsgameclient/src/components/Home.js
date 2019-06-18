import React from 'react';
import { Container, Row, Col, Button, Jumbotron } from 'react-bootstrap';
import { goToNewGameOptions, goToJoinGameOptions } from '../Router';

function Home({ history }) {
    return (
        <Container>
            <Row>
                <Col>
                    <br></br>
                    <Jumbotron>
                        <center>
                            <h2>
                                Things: The Game
                            </h2>
                            <h6>
                                Created by: Alex King
                            </h6>
                            <br></br>
                            <Button variant='primary' block onClick={() => goToNewGameOptions(history)}>
                                New Game
                            </Button>
                            <br></br>
                            <Button variant='secondary' block onClick={() => goToJoinGameOptions(history)}>
                                Join Game
                            </Button>
                        </center>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;