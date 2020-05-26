import React from "react";
import "../css/Home.css";
import socketIOClient from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const symbol = {
  x: "fas fa-times",
  o: "far fa-circle",
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "te3st", //dev
      nickname: "test", //dev
      playerSymbol: symbol.o, //dev
      opponentNickname: "", //dev
      currTurn: "przeciwnik", //dev
      score: 0, //dev
      opponentScore: 0, //dev
      loaded: false,
      err: "",
      board: this.makeBoard(),
      playerId: null,
    };
    this.io = null; //The socket client
  }
  makeBoard() {
    let array = [];

    for (let x = 0; x < 3; x++) {
      let temparray = [];
      for (let i = 0; i < 3; i++) {
        temparray.push({ symbol: "", player: "" });
      }
      array.push(temparray);
    }
    return array;
  }

  async componentDidMount() {
    let allGood = true;
    let socketStatus = await this.connect();
    if (!socketStatus) {
      allGood = false;
    }
    this.io.on("newPlayer", (data) => {
      this.setState({ opponentNickname: data.nickname });
    });
    if (allGood) {
      this.setState({ loaded: true });
    }
  }
  connect() {
    this.io = socketIOClient("http://localhost:9859", {
      query: `room=${this.state.room}&&nickname=${this.state.nickname}`,
    }); //dev
    return new Promise((resolve, reject) => {
      this.io.on("connected", (data) => {
        if (data.err != null) {
          this.setState({ err: `Error! Error code: ${data.err}` }, () => {
            resolve(false);
          });
        } else {
          this.setState({ room: data.room, playerId: data.playerId }, () => {
            if (data.opponentNickname != null) {
              this.setState({ opponentNickname: data.opponentNickname });
            }
            console.log(data);
            resolve(true);
          });
        }
      });
    });
  }
  render() {
    if (!this.state.loaded) {
      return (
        <div>
          <h1>Loading...</h1>
          <br />
          <h1>{this.state.err}</h1>
        </div>
      ); //dev
    } else {
      return (
        <div className="grid-container">
          <div className="playerSymbol">
            <span>Jesteś </span>
            <div>
              <i className={this.state.playerSymbol} />
            </div>
          </div>
          <div className="opponentsNickname">
            <span>
              {this.state.opponentNickname !== ""
                ? `Grasz z ${this.state.opponentNickname}`
                : "Oczekiwanie na przeciwnika"}
            </span>
          </div>
          <div className="board">
            <table className="boardTable">
              <tbody>
                <tr>
                  <td style={{ borderTop: "none", borderLeft: "none" }}>
                    <i className={symbol[this.state.board[0][0].symbol]} />
                  </td>
                  <td style={{ borderTop: "none" }}>
                    {" "}
                    <i className={symbol[this.state.board[0][1].symbol]} />
                  </td>
                  <td style={{ borderTop: "none", borderRight: "none" }}>
                    {" "}
                    <i className={symbol[this.state.board[0][2].symbol]} />
                  </td>
                </tr>
                <tr>
                  <td style={{ borderLeft: "none" }}>
                    {" "}
                    <i className={symbol[this.state.board[1][0].symbol]} />
                  </td>
                  <td>
                    <i className={symbol[this.state.board[1][1].symbol]} />
                  </td>
                  <td style={{ borderRight: "none" }}>
                    {" "}
                    <i className={symbol[this.state.board[1][2].symbol]} />
                  </td>
                </tr>
                <tr>
                  <td style={{ borderBottom: "none", borderLeft: "none" }}>
                    {" "}
                    <i className={symbol[this.state.board[2][0].symbol]} />
                  </td>
                  <td style={{ borderBottom: "none" }}>
                    {" "}
                    <i className={symbol[this.state.board[2][1].symbol]} />
                  </td>
                  <td style={{ borderBottom: "none", borderRight: "none" }}>
                    {" "}
                    <i className={symbol[this.state.board[2][2].symbol]} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="whoseTurn">
            <span
              style={{
                color:
                  this.state.currTurn.toLowerCase() === "ty"
                    ? "#30ef81"
                    : "white",
              }}
            >
              Teraz <b>{this.state.currTurn}</b>
            </span>
          </div>
          <div className="score">
            <span>
              <span style={{ color: "#30ef81" }}>{this.state.score}</span>:
              <span style={{ color: "#f21a38" }}>
                {this.state.opponentScore}
              </span>
            </span>
          </div>
          <div className="gameId">
            <span>
              Kod gry: <b>{this.state.room}</b>
            </span>
          </div>
        </div>
      );
    }
  }
}
