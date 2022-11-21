import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/gameon-json/footer";

class Footer extends Component {
    state = {
        data: {},
        socialData: [],
        widgetData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    socialData: res.data.socialData,
                    widgetData: res.data.widgetData
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <footer className="footer-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 text-center">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Logo */}
                                <a className="navbar-brand" href="/">
                                    <img src={this.state.data.img} alt="" />
                                </a>
                                {/* Social Icons */}
                                <div className="social-icons d-flex justify-content-center my-4">
                                    {this.state.socialData.map((item, idx) => {
                                        return (
                                            <a key={`fsd_${idx}`} className="facebook" href={item.link} target="_blank">
                                                <i className={item.icon} />
                                                <i className={item.icon} />
                                            </a>
                                        );
                                    })}
                                </div>
                                <ul className="list-inline">
                                    {this.state.widgetData.map((item, idx) => {
                                        return (
                                            <li key={`fwd_${idx}`} className="list-inline-item"><a href={item.link}>{item.text}</a></li>
                                        );
                                    })}
                                </ul>
                                {/* Copyright Area */}
                                <div className="copyright-area py-4">{this.state.data.copyright} <a href={this.state.data.ownerLink} target="_blank">{this.state.data.owner}</a></div>
                            </div>
                            {/* Scroll To Top */}
                            <div id="scroll-to-top" className="scroll-to-top">
                                <a href="#header" className="smooth-anchor">
                                    <i className="fa-solid fa-arrow-up" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;