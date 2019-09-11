import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Home, Auth, Quiz } from 'page';
import HeaderContainer from 'containers/Base/HeaderContainer';

class App extends Component {

    constructor(props) {
        super(props);

        this.Loginlink = this.Loginlink.bind(this);
        this.Registerlink = this.Registerlink.bind(this);
        this.selectlink = this.selectlink.bind(this);

    }

    Loginlink(){
        this.props.history.push('/auth/login');
    }

    Registerlink(){
        this.props.history.push('/auth/register');
    }

    selectlink(content, isLoggedIn){
        if(isLoggedIn){
            this.props.history.push('/quiz/searchPackage/'+content);
        }else{
            this.props.history.push('/auth/fail');
        }
    }

    render() {
        return (
            <div>
                <HeaderContainer Loginlink={this.Loginlink} Registerlink={this.Registerlink} selectlink={this.selectlink}/>
                <Route exact path="/" component={Home}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/quiz" component={Quiz}/>
            </div>
        );
    }
}

export default App;