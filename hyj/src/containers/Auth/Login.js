import React, { Component } from 'react';
import { Authentication } from 'components/Auth';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import FacebookLogin from 'react-facebook-login';

const Positioner = {
    position: 'absolute',
    left: '50%',
    marginTop: '4rem',
    marginBottom: '4rem',
    transform: 'translate(-50%, 0)'
}

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    handleLogin(id, pw){
        return this.props.loginRequest(id, pw).then(
            (response) => {
                if(this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        username: id,
                        _id: response
                    };
 
                    console.log(response);

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
 
                    Materialize.toast('반갑습니다, ' + id + '!', 2000);
                    this.props.history.push('/');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">아이디 또는 비밀번호가 일치하지 않습니다.</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    responseFacebook() {
        console.log('facebook Login');
    }

    render() {
        return (
            <div style={Positioner}>
                <Authentication mode={true} onLogin={this.handleLogin}/>
                <FacebookLogin
                    appId="518276648939123"  // facebook developer 페이지에 생성한 앱의 아이디
                    autoLoad={false}
                    fields="email"    // 페이스북에서 가져올 필드
                    cssClass="my-facebook-button-class"    // 사용할 스타일
                    callback={this.responseFacebook}    // 콜백함수 지정( container에 생성 )
                    icon="fa-facebook-square"        // 아이콘 지정
                    />
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};
 
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);