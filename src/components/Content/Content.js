import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/gameon-json/content";

class Content extends Component {
    state = {
        data: {},
        contentData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    contentData: res.data.contentData
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="content-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6">
                            <div className="content intro">
                            <span className="intro-text">{this.state.data.sub_heading}</span>
                            <h2>{this.state.data.heading}</h2>
                            <p>{this.state.data.excerpt}</p>
                            <ul className="list-unstyled items mt-5">
                                {this.state.contentData.map((item, idx) => {
                                    return (
                                        <li key={`cd_${idx}`} className="item">
                                            {/* Content List */}
                                            <div className="content-list d-flex align-items-center">
                                                <div className="content-icon">
                                                <span className={item.featured}>
                                                    <i className={item.icon} />
                                                </span>
                                                </div>
                                                <div className="content-body ml-4">
                                                <h3 className="m-0">{item.title}</h3>
                                                <p className="mt-3">{item.content}</p>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            {/* Blockchain Animation */}
                            <div className="wrapper-animation d-none d-md-block">
                                <div className="blockchain-wrapper">
                                    <div className="pyramid">
                                        <div className="square">
                                            <div className="triangle" />
                                            <div className="triangle" />
                                            <div className="triangle" />
                                            <div className="triangle" />
                                        </div>
                                    </div>
                                    <div className="pyramid inverse">
                                        <div className="square">
                                            <div className="triangle" />
                                            <div className="triangle" />
                                            <div className="triangle" />
                                            <div className="triangle" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Content;