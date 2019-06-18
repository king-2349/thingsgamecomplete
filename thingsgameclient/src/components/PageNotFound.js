import React from 'react';
import { Container, Row, Col, Button, Jumbotron } from 'react-bootstrap';
import { goToHome } from '../Router';

function PageNotFound({ history }) {
    return (
        <Container>
            <Row>
                <Col>
                    <br></br>
                    <Jumbotron>
                        <center>
                            <h2>
                                Page Not Found
                            </h2>
                            <br></br>
                            <Button variant='secondary' block onClick={() => goToHome(history)}>
                                Home
                                </Button>
                            <br></br>
                        </center>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default PageNotFound;