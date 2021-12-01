import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export const  ModelPopup = () => {
  return (
    <div className="container px-0 py-5 mx-auto">
    <div className="row justify-content-center mx-0 mx-md-auto">
        <div className="col-lg-10 col-md-11 px-1 px-sm-2">
            <div className="card border-0 px-3">
                <div className="d-flex row py-5 px-5 bg-light">
                    <div className="px-3 mx-2 col-4" style={{backgroundColor:"#98FB98"}}>
                        <p className="sm-text mb-0">OVERALL RATING</p>
                        <h4>4.8</h4>
                    </div>
                    <div className="white-tab mx-2 col-6" style={{color:"#014421"}}>
                        <p className="sm-text mb-0" style={{color:"#014421"}}>ALL REVIEWS</p>
                        <h4  style={{color:"#014421"}}>124</h4>
                    </div>
                </div>
               
                <div className="review p-5">
                    <div className="row d-flex">
                        <div className="profile-pic"><img src="https://i.imgur.com/Mcd6HIg.jpg" width="60px" height="60px"/></div>
                        <div className="d-flex flex-column pl-3">
                            <h4>Emily</h4>
                            <p className="grey-text">30 min ago</p>
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>
    </div>
</div>
  );
};
