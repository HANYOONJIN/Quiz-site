import React, { Component } from 'react';
import { FailItem } from 'components/Auth';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';

const Positioner = {
    position: 'absolute',
    left: '50%',
    marginTop: '4rem',
    marginBottom: '4rem',
    transform: 'translate(-50%, 0)'
}

class Fail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={Positioner}>
                <FailItem/>
            </div>
        );
    }
}
 
export default Fail;