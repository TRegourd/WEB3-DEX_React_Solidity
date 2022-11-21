import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/gameon-json/staking";

class StakingOne extends Component {
    state = {
        data: {},
        tabData: [],
        tabContent: [],
        features: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    tabData: res.data.tabData,
                    tabContent: res.data.tabContent,
                    features: res.data.features
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="staking-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <div className="card no-hover staking-card single-staking">
                                <h3 className="m-0">{this.state.data.heading}</h3>
                                <span className="balance">{this.state.data.balance}</span>
                                <ul className="nav nav-tabs staking-tabs border-0 my-3 my-md-4" id="myTab" role="tablist">
                                    {this.state.tabData.map((item, idx) => {
                                        return (
                                            <li key={`std_${idx}`} className="nav-item" role="presentation">
                                                <a className={item.tabClass} id={item.tabID} data-toggle="tab" href={item.tabLink} role="tab" aria-selected="true">{item.title}</a>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="tab-content mt-md-3" id="myTabContent">
                                    {this.state.tabContent.map((item, idx) => {
                                        return (
                                            <div key={`stcd_${idx}`} className={item.tabClass} id={item.tabID} role="tabpanel">
                                                <div className="staking-tab-content">
                                                    {/* Info Box */}
                                                    <div className="info-box d-flex justify-content-between">
                                                        <div className="info-left">
                                                            <ul className="list-unstyled">
                                                                <li><strong>Lock period:</strong> {item.period}</li>
                                                                <li><strong>Extends lock on registration:</strong> {item.lock}</li>
                                                                <li><strong>Early unstake fee:</strong> {item.fee}</li>
                                                                <li><strong>Status:</strong> {item.status}</li>
                                                            </ul>
                                                        </div>
                                                        <div className="info-right d-flex flex-column">
                                                            <span>{item.apy}</span>
                                                            <span>APY*</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="input-box my-4">
                                    <div className="input-area d-flex flex-column flex-md-row mb-3">
                                        <div className="input-text">
                                            <input type="text" placeholder={0.00} />
                                            <a href="#">Max</a>
                                        </div>
                                        <a href="#" className="btn input-btn mt-2 mt-md-0 ml-md-3">{this.state.data.input_btn_1}</a>
                                    </div>
                                    <div className="input-area d-flex flex-column flex-md-row">
                                        <div className="input-text">
                                            <input type="text" placeholder={0.00} />
                                            <a href="#">Max</a>
                                        </div>
                                        <a href="#" className="btn input-btn mt-2 mt-md-0 ml-md-3">{this.state.data.input_btn_2}</a>
                                    </div>
                                </div>
                                <span>{this.state.data.content}</span>
                                <span className="mt-3"><strong>{this.state.data.note}</strong></span>
                            </div>
                        </div>
                        <div className="col-12 col-md-5">
                            <div className="staking-items mt-4 mt-md-0">
                                {/* Single Card */}
                                {this.state.features.map((item, idx) => {
                                    return (
                                        <div key={`fsd_${idx}`} className={item.className}>
                                            <h3 className="m-0">{item.title}</h3>
                                            <p>{item.content}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default StakingOne;