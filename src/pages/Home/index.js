import React, { Component } from 'react'
import Game from './Game.js'

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Game />
            </div>
        )
    }
}

export default Home