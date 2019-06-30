import React from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { submitVote, backToLobby } from '../../redux/actions/gameActions';

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
        if (player.state === 'out') {
            return <React.Fragment></React.Fragment>
        }
        return (
            <DropdownButton title='Vote for player' onSelect={(key, e) => handleVote(key, e, player.answer)}>
                {
                    players.map(playerName => {
                        if (playerName === name) {
                            return <React.Fragment key={playerName}></React.Fragment>
                        }
                        return <Dropdown.Item eventKey={playerName} key={playerName}>{playerName}</Dropdown.Item>
                    })
                }
            </DropdownButton>
        )
    }

    function getDropDown(player) {
        switch (playerInfo[name].state) {
            case 'voting':
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
                if (player.name === name) {
                    return <h5 style={{ marginBottom: '15px', textDecoration: 'line-through', color: 'red' }}>{'Your answer:'}</h5>
                }
                return <h5 style={{ marginBottom: '15px', textDecoration: 'line-through', color: 'red' }}>{player.name + ':'}</h5>
            default:
                if (player.name === name) {
                    return <h5 style={{ marginBottom: '15px' }}>{'Your answer:'}</h5>
                }
                return <h5 style={{ marginBottom: '15px' }}>{'????:'}</h5>
        }
    }

    function generatePlayerAnswer(player) {
        if (player.name === name) {
            return <React.Fragment key={player.name}></React.Fragment>
        }
        return (
            <React.Fragment key={player.name}>
                {getAnswerName(player)}
                {drawPlayerAnswerText(player)}
                {getDropDown(player)}
                <div style={{ marginBottom: '15px', borderBottom: '2px solid white', paddingBottom: '15px' }}></div>
            </React.Fragment>
        );
    }
    //Fix voting screen

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function turnPlayerInfoIntoArray() {
        let players = [];
        for (let key in playerInfo) {
            players.push({
                name: key,
                ...playerInfo[key]
            })
        }
        return shuffle(players);
    }

    function getStatus() {
        switch (playerInfo[name].state) {
            case 'out':
                return <h5 style={{ color: 'red' }}>Status: OUT</h5>
            case 'voting':
                return <h5 style={{ color: 'green' }}>Status: VOTE</h5>
            default:
                return <h5 style={{ color: 'yellow' }}>Status: WAIT</h5>
        }
    }

    function drawPlayerAnswerText(player) {
        switch (player.state) {
            case 'out':
                return <h5 style={{ marginBottom: '15px', fontStyle: 'italic', textDecoration: 'line-through', color: 'red' }}>{player.answer}</h5>
            default:
                return <h5 style={{ marginBottom: '15px', fontStyle: 'italic' }}>{player.answer}</h5>
        }
    }

    return (
        <React.Fragment>
            {getStatus()}
            <h5>Topic:</h5>
            <h5 style={{ marginBottom: '15px', fontStyle: 'italic', paddingBottom: '15px' }}>{gameInfo.topic}</h5>
            {getAnswerName({ name: name, state: playerInfo[name].state })}
            {drawPlayerAnswerText({ name: name, state: playerInfo[name].state, answer: playerInfo[name].answer })}
            <div style={{ marginBottom: '15px', borderBottom: '2px solid white', paddingBottom: '15px' }}></div>
            {
                turnPlayerInfoIntoArray().map(player =>
                    generatePlayerAnswer(player)
                )
            }
            <br></br>
            <Button variant='primary' block onClick={() => dispatch(backToLobby(gameInfo.gameId))}>
                Back to Lobby
            </Button>
        </React.Fragment>
    );
}

export default Vote;