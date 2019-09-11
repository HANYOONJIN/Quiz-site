import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Wrapper = {
    marginTop: '0.5rem'
}

const Title = {
    marginTop: '1rem',
    fontSize: '1.3rem',
    color: 'gray',
    textAlign: 'center',
    background: 'white'
}

const linkDiv = {
    marginTop: '1rem',
    textAlign: 'center',
    color: 'blue',
    fontSize: '0.8rem',
    display: 'inline-block'
}

const linkStyle = {
    color: 'gray',
    fontSize: '1rem'
}

const Positioner = {
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -70%)'
}

// 너비, 그림자 설정
const ShadowedBox = {
    background: 'white',
    marginTop: '1rem'
}

// 로고
const LogoWrapper = {
    background: 'gray',
    height: '0.1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

// children 이 들어가는 곳
const Contents = {
    background: 'white',
    padding: '2rem',
    height: 'auto'
}

class Fail extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        const View = (
            <div>
                <div style={Wrapper}>
                    로그인이 필요한 메뉴입니다.
                </div>
                <div style={linkDiv}>&nbsp;&nbsp;로그인 하시겠습니까?&nbsp;
                <Link to='/auth/login' style={linkStyle}>SignIN</Link>
                </div>
            </div>
        );

        return (
            <div>
                <div style={ShadowedBox} className="ShadowedBox card-1">
                   <div style={LogoWrapper}></div>
                   <div style={Title}>제한</div>
                    <div style={Contents}>
                        {View}
                    </div>
                </div>
            </div>
        );
    }
}

export default Fail;