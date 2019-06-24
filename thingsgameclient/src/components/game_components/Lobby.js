import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { startRound } from '../../redux/actions/gameSetupActions';
import { goToHome } from '../../Router';

function Lobby({ history }) {
    const gameInfo = useSelector(state => state.gameInfo);
    const playerInfo = useSelector(state => state.playerInfo);
    const dispatch = useDispatch();

    function handleStartRound(e) {
        e.preventDefault();
        dispatch(startRound(gameInfo.gameId));
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
            <h4>Game Code: {gameInfo.gameId}</h4>
            <h5>Players:</h5>
            <ListGroup>
                {
                    turnPlayerInfoIntoArray().map(player =>
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