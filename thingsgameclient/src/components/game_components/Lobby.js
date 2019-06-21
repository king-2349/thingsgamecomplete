import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { goToHome } from '../../Router';

function Lobby({ history }) {
    const playerInfo = useSelector(state => state.playerInfo);
    const dispatch = useDispatch();

    function handleStartRound(e) {
        e.preventDefault();
        //dispatch some action that emits event 'startRound'
    }

    return (
        <React.Fragment>
            <h5>Players:</h5>
            <ListGroup>
                {
                    playerInfo.map(player =>
                        <ListGroup.Item key={player.name} style={{ color: 'white' }}>
                            {player.name}
                        </ListGroup.Item>)
                }
            </ListGroup>
            <br></br>
            <Button variant='primary' block onClick={(e) => handleStartRound(e)}>
                Start Round
            </Button>
            <Button variant='secondary' block onClick={() => goToHome(history)}>
                Leave Game
            </Button>
        </React.Fragment>
    );
}

export default Lobby;