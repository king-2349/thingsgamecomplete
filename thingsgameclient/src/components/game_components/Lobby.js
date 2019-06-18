import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { goToHome } from '../../Router';

function Lobby({ history }) {
    const gameState = useSelector(state => state.gameState);

    return (
        <React.Fragment>
            <h5>Players:</h5>
            <ListGroup>
                {
                    gameState.players.map(player =>
                        <ListGroup.Item key={player.name} style={{ color: 'white' }}>
                            {player.name}
                        </ListGroup.Item>)
                }
            </ListGroup>
            <br></br>
            <Button variant='primary' block onClick={(e) => { }}>
                Start Round
            </Button>
            <Button variant='secondary' block onClick={() => goToHome(history)}>
                Leave Game
            </Button>
        </React.Fragment>
    );
}

export default Lobby;