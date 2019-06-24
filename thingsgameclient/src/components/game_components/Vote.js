import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Vote({ history }) {
    const gameInfo = useSelector(state => state.gameInfo);
    const playerInfo = useSelector(state => state.playerInfo);
    const name = useSelector(state => state.name);

    function handleAnswer(e) {
        e.preventDefault();
    }

    function createDropDown() {
        let players = [];
        for (let key in playerInfo) {
            players.push(key);
        }
        return (
            <DropdownButton title='Vote for player'>
                {
                    players.map(player =>
                        <Dropdown.Item key={player}>{player}</Dropdown.Item>
                    )
                }
            </DropdownButton>
        )
    }

    function getDropDown() {
        switch (playerInfo[name].state) {
            case 'voting':
                return createDropDown()
            default:
                return (
                    <React.Fragment></React.Fragment>
                )
        }
    }

    function generatePlayerAnswer(player) {
        return (
            <React.Fragment key={player.name}>
                <h5>{player.answer}</h5>
                {
                    getDropDown()
                }
                <div style={{ marginBottom: '15px', borderBottom: '2px solid white', paddingBottom:'15px' }}></div>
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
        return players;
    }

    return (
        <React.Fragment>
            <h5>Topic:</h5>
            <h5 style={{ marginBottom: '15px', fontStyle: 'italic', borderBottom: '2px solid white', paddingBottom:'15px' }}>{gameInfo.topic}</h5>
            {
                turnPlayerInfoIntoArray().map(player =>
                    generatePlayerAnswer(player)
                )
            }
        </React.Fragment>
    );
}

export default Vote;