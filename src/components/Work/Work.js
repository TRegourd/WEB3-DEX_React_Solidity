import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/gameon-json/work";

class Work extends Component {
    state = {
        data: {},
        workData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    workData: res.data.workData
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="work-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end mb-4">
                                <div className="intro-content">
                                    <span className="intro-text">{this.state.data.sub_heading}</span>
                                    <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.workData.map((item, idx) => {
                            return (
                                <div key={`wd_${idx}`} className="col-12 col-sm-6 col-lg-4 item">
                                    {/* Single Work */}
                                    <div className="single-work">
                                        <i className={item.icon} />
                                        <h4>{item.title}</h4>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default Work;