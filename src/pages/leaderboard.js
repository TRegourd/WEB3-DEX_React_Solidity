import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Board from '../components/Leaderboard/Leaderboard';
import Cta from '../components/Cta/Cta';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';

class Leaderboard extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Leaderboard" subpage="Pages" page="Leaderboard" />
                <Board />
                <Cta />
                <Footer />
                <ModalSearch />
                <ModalMenu />
            </div>
        );
    }
}

export default Leaderboard;