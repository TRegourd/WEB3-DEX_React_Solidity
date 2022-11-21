import React, { Component } from 'react';

const initData = {
    sub_heading: "Contact Us",
    heading: "Get In Touch!",
    btn: "Submit Message",
    icon_1: "icon text-effect icon-location-pin m-0",
    icon_2: "icon text-effect icon-call-out m-0",
    icon_3: "icon text-effect icon-envelope-open m-0",
    title_1: "Gameon Inc.",
    title_2: "Call Us",
    title_3: "Reach Us",
    address: "2709 Euclid Avenue, Irvine, California",
    map_heading: "Get Google Map Link",
    map_link: "https://www.google.com/maps",
    phone_1: "+805-298-8971",
    phone_2: "+626-773-0240",
    mail_1: "info@yourcompany.com",
    mail_2: "support@webmail.com"
}

class Contact extends Component {
    state = {
        initData: {}
    }
    componentDidMount(){
        this.setState({
            initData: initData
        })
    }
    render() {
        return (
            <section className="apply-area contact">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-7">
                            <div className="apply-form card no-hover">
                                {/* Intro */}
                                <div className="intro d-flex justify-content-between align-items-end mb-4">
                                    <div className="intro-content">
                                        <span className="intro-text">{this.state.initData.sub_heading}</span>
                                        <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                    </div>
                                </div>
                                <form id="contact-form" method="POST" action="assets/php/form.php">
                                    <div className="form-group">
                                        <label htmlFor="first-name">First name</label>
                                        <input type="text" id="first-name" name="first-name" placeholder="John" required="required" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="last-name">Last name</label>
                                        <input type="text" id="last-name" name="last-name" placeholder="Deo" required="required" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" id="email" name="email" placeholder="name@yourmail.com" required="required" />
                                        <small className="form-text mt-2">Enter your email address</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone (Optional)</label>
                                        <input type="text" id="phone" name="phone" placeholder="E.g. +220 541 0014" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Message</label>
                                        <textarea id="description" name="message" placeholder="Message" cols={30} rows={3} required="required" defaultValue={""} />
                                        <small className="form-text mt-2">Briefly describe what you need</small>
                                    </div>
                                    <button type="submit" className="btn btn-bordered active">{this.state.initData.btn} <i className="icon-login ml-2" /></button>
                                </form>
                                <p className="form-message" />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="contact-items mt-4 mt-md-0">
                                {/* Single Card */}
                                <div className="card no-hover staking-card">
                                    <div className="media">
                                        <i className="icon text-effect icon-location-pin m-0" />
                                        <div className="media-body ml-4">
                                            <h4 className="m-0">{this.state.initData.title_1}</h4>
                                            <p className="my-3">{this.state.initData.address}</p>
                                            <a className="notice" href={this.state.initData.map_link} target="_blank">{this.state.initData.map_heading}</a>
                                        </div>
                                    </div>
                                </div>
                                {/* Single Card */}
                                <div className="card no-hover staking-card my-4">
                                    <div className="media">
                                        <i className="icon text-effect icon-call-out m-0" />
                                        <div className="media-body ml-4">
                                            <h4 className="m-0">{this.state.initData.title_2}</h4>
                                            <span className="d-inline-block mt-3 mb-1">{this.state.initData.phone_1}</span>
                                            <span className="d-inline-block">{this.state.initData.phone_2}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Single Card */}
                                <div className="card no-hover staking-card">
                                    <div className="media">
                                        <i className="icon text-effect icon-envelope-open m-0" />
                                        <div className="media-body ml-4">
                                            <h4 className="m-0">{this.state.initData.title_3}</h4>
                                            <span className="d-inline-block mt-3 mb-1">{this.state.initData.mail_1}</span>
                                            <span className="d-inline-block">{this.state.initData.mail_2}</span>
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

export default Contact;