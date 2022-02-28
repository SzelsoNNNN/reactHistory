import React, { Component } from 'react'
import Board from './Board.js'

class Game extends Component {
    constructor(props) {
      super(props)
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext   : true,
        xWins     : 0,
        oWins     : 0
      }
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1)
      const current = history[history.length - 1]
      const squares = current.squares.slice()
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O"
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext   : !this.state.xIsNext
      })
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext   : (step % 2) === 0
      })
    }

    resetGame() {
      this.setState({
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext   : true
      })
    }

    resetStats() {
      if(window.confirm(`Czy chcesz zresetować wszystkie statystyki?`)) {
        this.setState({
          history: [
            {
              squares: Array(9).fill(null)
            }
          ],
          stepNumber: 0,
          xIsNext   : true,
          xWins     : 0,
          oWins     : 0
        })
      }
    }

    addWin(player) {
      if(player === 'X') {
        const newWinsX = this.state.xWins + 1
        this.setState({xWins : newWinsX})
      } else if(player === 'O') {
        const newWinsO = this.state.oWins + 1
        this.setState({oWins : newWinsO})
      }
    }
  
    render() {
      const history = this.state.history
      const current = history[this.state.stepNumber]
      const winner  = calculateWinner(current.squares)
  
      const moves   = history.map((step, move) => {
        const desc  = move ? `Idź do ${move} ruchu` : 'Wróć do początku';
        return (
          <li key={move}>
            <button className="historyBtn" onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      })

      let status
      if (winner) {
        status = `Wygrał gracz ${winner}`
        this.resetGame()
        this.addWin(winner)
      } else {
        status = `Następny gracz: ${this.state.xIsNext ? "X" : "O"}`
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <button className="resetBtn" onClick={() => this.resetGame()}>Zresetuj grę</button>
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
          <div className="stats">
            Statystyki <button onClick={() => { this.resetStats() }} className="resetBtn">Zresetuj statystyki</button> <br />
            Wygrane gracza X: {this.state.xWins} <br />
            Wygrane gracza O: {this.state.oWins}
          </div>
        </div>
      )
    }
}

const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
}

export default Game