import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { submitVote } from '../../redux/actions/gameSetupActions';

function Vote({ history }) {
    const gameInfo = useSelector(state => state.gameInfo);
    const playerInfo = useSelector(state => state.playerInfo);
    const name = useSelector(state => state.name);
    const dispatch = useDispatch();

    function handleVote(key, e, answer) {
        let vote = {
            name: key,
            answer: answer
        };
        dispatch(submitVote(gameInfo.gameId, name, vote));
    }

    function createDropDown(player) {
        let players = [];
        for (let key in playerInfo) {
            players.push(key);
        }
        return (
            <DropdownButton title='Vote for player' onSelect={(key, e) => handleVote(key, e, player.answer)}>
                {
                    players.map(playerName =>
                        <Dropdown.Item eventKey={playerName} key={playerName}>{playerName}</Dropdown.Item>
                    )
                }
            </DropdownButton>
        )
    }

    function getDropDown(player) {
        switch (playerInfo[name].state) {
            case 'voting':
                if (player.name === name) {
                    return <React.Fragment></React.Fragment>
                }
                return createDropDown(player)
            default:
                return (
                    <React.Fragment></React.Fragment>
                )
        }
    }

    function getAnswerName(player) {
        switch (player.state) {
            case 'out':
                return player.name + ":"
            default:
                return '????:'
        }
    }

    function generatePlayerAnswer(player) {
        return (
            <React.Fragment key={player.name}>
                <h5>{getAnswerName(player)}</h5>
                <h5 style={{ marginBottom: '15px', fontStyle: 'italic' }}>{player.answer}</h5>
                {
                    getDropDown(player)
                }
                <div style={{ marginBottom: '15px', borderBottom: '2px solid white', paddingBottom: '15px' }}></div>
            </React.Fragment>
        );
    }

    function turnPlayerInfoIntoArray() {
        let players = [];
        for (let key in playerInfo) {
            players.push({
                name: key,
                ...playerInfo[key]
            })
        }
        return players.sort((a,b) => Math.random()-.5);
    }

    function getStatus() {
        switch (playerInfo[name].state) {
            case 'out':
                return 'OUT'
            case 'voting':
                return 'VOTE'
            default:
                return 'WAIT'
        }
    }

    return (
        <React.Fragment>
            <h5>Status: {getStatus()}</h5>
            <h5>Topic:</h5>
            <h5 style={{ marginBottom: '15px', fontStyle: 'italic', borderBottom: '2px solid white', paddingBottom: '15px' }}>{gameInfo.topic}</h5>
            {
                turnPlayerInfoIntoArray().map(player =>
                    generatePlayerAnswer(player)
                )
            }
        </React.Fragment>
    );
}

export default Vote;