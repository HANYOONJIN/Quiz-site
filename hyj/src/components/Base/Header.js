import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Header extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        search: '',
        type: 'type'
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(e){
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
    }

    handleKeyPress(e){
      if(e.charCode==13) {
        this.handleSearch();
        this.setState({
          search: ''
        });
      }
    }

    handleSearch(){
      this.props.selectlink(this.state.search, this.props.isLoggedIn);
    }

    render() {
 
      const loginButton = (
        <button className="singlebutton5" onClick={this.props.Loginlink}>LOGIN</button>
      );
      const logoutButton = (
        <button className="singlebutton5" onClick={this.props.onLogout}>LOGOUT</button>
      );
      const registerButton = (
        <button className="singlebutton5" onClick={this.props.Registerlink}>JOIN</button>
      );
      const modifyButton = (
        <button className="singlebutton5">MODIFY</button>
      );

      //style={{boxShadow: 'none'}}

        return (
          <div id="header_3">
				    <div>
						
              <Link to='/'><h1 id="logo_3">QUIZ</h1></Link>
					    <nav className="nav">
                            <ul className="nav__menu">
                              <li className="nav__menu-item">
                                  <Link to='/'>홈</Link>
                              </li>
                              <li
                                  className="nav__menu-item"
                              >
                                  <Link to={this.props.isLoggedIn ? "/quiz/packagelist" : "/auth/fail"}>문제집</Link>
                                  <Submenu1 isLoggedIn={this.props.isLoggedIn}/>
                              </li>
                              <li className="nav__menu-item">
                                  <Link to={this.props.isLoggedIn ? "/quiz/singlequiz" : "/auth/fail"}>문제</Link>
                                  <Submenu2 isLoggedIn={this.props.isLoggedIn}/>
                              </li>
                              <li className="nav__menu-item">
                                  <a></a>
                              </li>
                              <li className="nav__menu-item">
                                  <a></a>
                              </li>
                            </ul>
                            <div className="right input-field" style={{height:'100%'}}>
                              <input name="search" type="search" placeholder="검색어를 입력하세요." 
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                                value={this.state.search}
                                required/>
                              <label className="label-icon" for="search" style={{height:'100%'}}><i className="material-icons">search</i></label>
                              <i className="material-icons">close</i>
                            </div>
                        </nav>
						<div id="banner_3">
							<div>
								<section>
                  { this.props.isLoggedIn ? logoutButton : loginButton }
                  { this.props.isLoggedIn ? null : registerButton }
								</section>			
							</div>
						</div>

				</div>
			</div>
        );
    }
}

class Submenu1 extends React.Component {
    render() {
      return (
        <ul className="nav__submenu">
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/packagelist" : "/auth/fail"}>전체 문제집</Link>
          </li>
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/existPackageList" : "/auth/fail"}>풀었던 문제집</Link>
          </li>
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/noneExistPackageList" : "/auth/fail"}>풀지 않은 문제집</Link>
          </li>
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/minePackageList" : "/auth/fail"}>내가 낸 문제집</Link>
          </li>
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/anotherPackageList" : "/auth/fail"}>남이 낸 문제집</Link>
          </li>
          <li className="nav__submenu-item ">
          <Link to={this.props.isLoggedIn ? "/quiz/recoPackageList" : "/auth/fail"}>추천 문제집</Link>
          </li>
        </ul>
        )
      }
    }
    
class Submenu2 extends React.Component {
    render() {
      return (
        <ul className="nav__submenu">
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/singlequiz" : "/auth/fail"}>전체 문제</Link>
          </li>
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/existQuiz" : "/auth/fail"}>풀었던 문제</Link>
          </li>
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/noneExistQuiz" : "/auth/fail"}>풀지 않은 문제</Link>
          </li>
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/mineQuiz" : "/auth/fail"}>내가 낸 문제</Link>
          </li>
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/anotherQuiz" : "/auth/fail"}>남이 낸 문제</Link>
          </li>
          <li className="nav__submenu-item ">
            <Link to={this.props.isLoggedIn ? "/quiz/recoQuiz" : "/auth/fail"}>추천 문제</Link>
          </li>
        </ul>
        )
      }
    }

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  Loginlink: PropTypes.func,
  Registerlink: PropTypes.func
};

Header.defaultProps = {
  isLoggedIn: false,
  onLogout: () => { console.error("logout function not defined");},
  Loginlink: () => { console.error("Loginlink function not defined");},
  Registerlink: () => { console.error("Registerlink function not defined");}
};

export default Header;
