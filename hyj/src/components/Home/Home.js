import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import update from 'react-addons-update';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const View = (
            this.props.List.map( data => {
                return (<HomeItem
                    title={data.title}
                    key={data.num}/>
                    )
                })
            );

        return (
            <div style={{display:'inline-block', width:'22%'}}>
                <div style={{textAlign:'center', fontSize:'18px', color:'gray', marginBottom:'1rem'}}><b>{this.props.mode?'문제집 최신 글':'문제 최신 글'}</b></div>
                {View}
                <div style={{height:'1px', backgroundColor:'gray'}}></div>
            </div>
        );
    }
}

class HomeItem extends Component {

    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <div style={{borderTop:'1px solid gray', padding:'1rem', margin: 0, color:'gray', fontSize:'15px'}}>
                {this.props.title.length >= 20 ? this.props.title.slice(0,20)+'...' : this.props.title}
            </div>
        );
    }
}

export default Home;