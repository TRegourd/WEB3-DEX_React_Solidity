import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Staking from '../components/Staking/StakingOne';
import Cta from '../components/Cta/Cta';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';

class StakingOne extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Staking Style 1" subpage="Staking" page="Staking Style 1" />
                <Staking />
                <Cta />
                <Footer />
                <ModalSearch />
                <ModalMenu />
            </div>
        );
    }
}

export default StakingOne;