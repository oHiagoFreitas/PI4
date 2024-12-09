// src/pages/AtletasConsultor.js

import React from 'react';
import Sidebar2 from '../Components/BackofficeConsultor/SideBar2';
import Navbar from '../Components/Navbar';
import AtletaTitle from '../Components/AtletasView/AtletasTitle'
import AtletasTable2 from '../Components/BackofficeConsultor/AtletasView/AtletasTable2'

import '../Style/Backoffice.css';



function AtletasConsultor() {
    
    return (
        <div className="backoffice-container">
            <Sidebar2 />
            <div className="main-content">
                <Navbar />
                <div className='sub-main-content'>
                    <AtletaTitle/>
                    <AtletasTable2/>
                    
                </div>
            </div>
        </div>
    );
}

export default AtletasConsultor;
