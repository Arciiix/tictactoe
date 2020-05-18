import React from "react";
import "../Styles/Home.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; //cross icon
import { faCircle } from "@fortawesome/fontawesome-free-regular"; //circle icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameCode: "test123", //dev
      playerSymbol: faCircle, //dev
      opponentNickname: "test nick", //dev
      currTurn: "przeciwnik", //dev
      score: 0, //dev
      opponentScore: 0, //dev
    };
  }
  render() {
    return (
      <div className="grid-container">
        <div className="playerSymbol">
          <span>Jesteś </span>
          <FontAwesomeIcon icon={this.state.playerSymbol} />
        </div>
        <div className="opponentsNickname">
          <span>
            Grasz z <b>{this.state.opponentNickname}</b>
          </span>
        </div>
        <div className="board">
          <table className="boardTable">
            <tr>
              <td style={{ borderTop: "none", borderLeft: "none" }}></td>
              <td style={{ borderTop: "none" }}></td>
              <td style={{ borderTop: "none", borderRight: "none" }}></td>
            </tr>
            <tr>
              <td style={{ borderLeft: "none" }}></td>
              <td></td>
              <td style={{ borderRight: "none" }}></td>
            </tr>
            <tr>
              <td style={{ borderBottom: "none", borderLeft: "none" }}></td>
              <td style={{ borderBottom: "none" }}></td>
              <td style={{ borderBottom: "none", borderRight: "none" }}></td>
            </tr>
          </table>
        </div>
        <div className="whoseTurn">
          <span>
            Teraz <b>{this.state.currTurn}</b>
          </span>
        </div>
        <div className="score">
          <span>
            {this.state.score}:{this.state.opponentScore}
          </span>
        </div>
        <div className="gameId">
          <span>Kod gry: {this.state.gameCode}</span>
        </div>
      </div>
    );
  }
}
