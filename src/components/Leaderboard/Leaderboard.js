import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/gameon-json-1/leaderboard";

class Leaderboard extends Component {
    state = {
        data: {},
        leaderboardData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    leaderboardData: res.data.leaderboardData
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="leaderboard-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive">
                                <table className="table token-content table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">{this.state.data.heading_1}</th>
                                            <th scope="col">{this.state.data.heading_2}</th>
                                            <th scope="col">{this.state.data.heading_3}</th>
                                            <th scope="col">{this.state.data.heading_4}</th>
                                            <th scope="col">{this.state.data.heading_5}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.leaderboardData.map((item, idx) => {
                                            return (
                                                <tr key={`lbd_${idx}`}>
                                                    <td>{item.rank}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.key}</td>
                                                    <td>{item.locked}</td>
                                                    <td>{item.balance}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <nav>
                                <ul className="page-numbers">
                                    <li><a className="page-numbers" href="#">1</a></li>
                                    <li><span aria-current="page" className="page-numbers current">2</span></li>
                                    <li><span className="page-numbers dots">…</span></li>
                                    <li><a className="page-numbers" href="#">4</a></li>
                                    <li><a className="next page-numbers" href="#"><i className="icon-arrow-right" /></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Leaderboard;