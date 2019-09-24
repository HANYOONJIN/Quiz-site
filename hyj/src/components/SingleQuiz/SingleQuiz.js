import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SingleQuizItem from './SingleQuizItem';
import 'whatwg-fetch';
import axios from 'axios';
import update from 'react-addons-update';

const Positioner = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    marginTop:'3%', 
    textAlign:'center',
    marginBottom:'5%'
}

const linkDiv = {
    marginBottom: '1rem',
    textAlign: 'right',
    color: 'gray',
    cursor: 'pointer'
}

const linkStyle = {
    color: 'gray',
    fontSize: '1rem'
}

class SingleQuiz extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quizListData: [],
            loginData: {},
            plusQuiz: [],
            content: '',
            level: 'ALL'
        }

        this.type = this.type.bind(this);
        this.getQuizList = this.getQuizList.bind(this);
        this.tagClick = this.tagClick.bind(this);
        this.plusClick = this.plusClick.bind(this);
        this.plusQuiz = this.plusQuiz.bind(this);
        this.search = this.search.bind(this);
        this.recommend = this.recommend.bind(this);

        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        const {content} = this.props; 
        console.log('componentDidMount'+content);
        this.type();
    }

    componentWillUpdate(nextProps){
        if(this.props.type=='search'&&this.state.content!=nextProps.content){
            console.log('updateprev : '+nextProps.content);
            this.search(nextProps.content);
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
          });
    }

    type() {
        const { type } = this.props;

        function getCookie(name) {
            var value = "; " + document.cookie; 
            var parts = value.split("; " + name + "="); 
            if (parts.length == 2) return parts.pop().split(";").shift();
        }
        let loginData = getCookie('key');
        loginData = JSON.parse(atob(loginData));

        this.setState({loginData: loginData});

        let id = loginData._id;

        let tag = this.props.tag;

        if(type=='all'||type=='new'){
            this.getQuizList();
        }else if(type=='mine'){
            this.mine(id);
        }else if(type=='another'){
            this.another(id);
        }else if(type=='exist'){
            this.exist(id);
        }else if(type=='noneExist'){
            this.noneExist(id);
        }else if(type=='tagSelect'){
            this.tagClick(tag);
        }else if(type=='search'){
            this.search(this.props.content);
        }else if(type=='recommend'){
            this.recommend(id);
        }
    }

    getQuizList() {
        axios.get('/api/board/quizList')
		.then((response) => {
            this.setState({
                quizListData : response.data.data.map(
                    info => ({
                        num: info.num,
                        quizname: info.quizname,
                        tag: info.tag,
                        id: info.id
                    })
                ),
                plusQuiz : response.data.data.map(
                    info => ({
                        num: info.num,
                        select: false
                    })
                )
            });
		})
		.catch((err)=>{
			console.log('Error fetching quizList',err);
        });
    }

    mine(id) {
        axios.post('/api/board/mineQuiz', {id})
		.then((response) => {
            this.setState({
                quizListData : response.data.data.map(
                    info => ({
                        num: info.num,
                        quizname: info.quizname,
                        tag: info.tag,
                        id: info.id 
                    })
                )
            });
		})
		.catch((err)=>{
			console.log('Error fetching mine',err);
        });
    }

    another(id) {
        axios.post('/api/board/anotherQuiz', {id})
		.then((response) => {
            this.setState({
                quizListData : response.data.data.map(
                    info => ({
                        num: info.num,
                        quizname: info.quizname,
                        tag: info.tag,
                        id: info.id 
                    })
                )
            });
		})
		.catch((err)=>{
			console.log('Error fetching another',err);
        });
    }
    
    exist(id) {
        axios.post('/api/board/existQuiz', {id})
		.then((response) => {
            this.setState({
                quizListData : response.data.data.map(
                    info => ({
                        num: info.num,
                        quizname: info.quizname,
                        tag: info.tag,
                        id: info.id 
                    })
                )
            });
		})
		.catch((err)=>{
			console.log('Error fetching exist',err);
        });
    }

    noneExist(id) {
        axios.post('/api/board/noneExistQuiz', {id})
		.then((response) => {
            this.setState({
                quizListData : response.data.data.map(
                    info => ({
                        num: info.num,
                        quizname: info.quizname,
                        tag: info.tag,
                        id: info.id 
                    })
                )
            });
		})
		.catch((err)=>{
			console.log('Error fetching noneExist',err);
        });
    }

    search(content) {
        this.setState({
            content: content
        });

        axios.post('/api/board/searchQuiz', {content})
		.then((response) => {
            console.log(response);
            this.setState({
                quizListData : response.data.data.map(
                    info => ({
                        num: info.num,
                        quizname: info.quizname,
                        tag: info.tag,
                        id: info.id 
                    })
                )
            });
		})
		.catch((err)=>{
			console.log('Error fetching searchQuiz',err);
        });
    }

    recommend(id) {
        let level = this.state.level;
        if(level=='ALL') level = '';
        axios.post('/api/board/recommendQuiz', {id, level})
		.then((response) => {
            this.setState({
                quizListData : response.data.data.map(
                    info => ({
                        num: info.num,
                        quizname: info.quizname,
                        tag: info.tag,
                        id: info.id 
                    })
                )
            });
		})
		.catch((err)=>{
			console.log('Error fetching recommendQuiz',err);
        });
    } 

    tagClick(tag) {
        axios.post('/api/board/selectTag',{tag})
        .then((response) => {
            console.log(response.data.data);
            this.setState({
                quizListData : response.data.data.map(
                    info => ({
                        num: info.num,
                        quizname: info.quizname,
                        tag: info.tag,
                        id: info.id 
                    })
                )
            });
        })
        .catch((err)=>{
            console.log('Error fetching selectTag',err);
        });
    }

    plusClick(num){
        console.log(num);
        this.setState({
            plusQuiz: this.state.plusQuiz.map(
              info => num === info.num
                ? {num: info.num, select: !info.select}
                : info
            )
        });
    }

    plusQuiz() {
        const { plusQuiz } = this.props;

        for(var i=0; i<this.state.plusQuiz.length; i++){
            if(this.state.plusQuiz[i].select==true){
                plusQuiz(this.state.plusQuiz[i].num);
            }
        }
    }

    render() {
        const bar = (
            <div className="header-wrap">
                <button className="singlebutton6" style={{right:'10px', position:'fixed'}} onClick={this.props.newlink}>CREATE</button>
            </div>
        );

        const View = (
            this.state.quizListData.map(data => {
                return (<SingleQuizItem num={data.num}
                                quizName={data.quizname}
                                tag={data.tag}
                                id={data.id}
                                loginId={this.state.loginData._id}
                                key={data.num}/>);
                }
            )
        );

        const plusView = (
            this.state.quizListData.map(data => {
                return (<SingleQuizItem num={data.num}
                                quizName={data.quizname}
                                tag={data.tag}
                                id={data.id}
                                loginId={this.state.loginData._id}
                                key={data.num}
                                type='new'
                                plusClick={this.plusClick}/>);
                }
            )
        );

        return (
            <div>
                {this.props.type=='new' ?
                <div>
                    <div style={Positioner}>
                        <div style={linkDiv} onClick={this.plusQuiz}>등록</div>
                        <div style={linkDiv} onClick={this.props.exit}>닫기</div>
                        {plusView}
                    </div>
                </div>
                :
                <div>
                    <div style={Positioner}>
                        {this.props.type=='recommend' ? 
                            <div style={{textAlign:'center', height:'50px'}}>
                                    <select className="optionStyle" style={{width:'15%', height:'100%', fontSize:'12px', verticalAlign:'middle'}} 
                                    name='level' value={this.state.level} onChange={this.handleChange}>
                                        <option value="ALL">전체</option>
                                        <option value="high">&nbsp;&nbsp;상</option>
                                        <option value="middle">&nbsp;&nbsp;중</option>
                                        <option value="low">&nbsp;&nbsp;하</option>
                                    </select>
                                    <i className="material-icons" 
                                    onClick={() => this.recommend(this.state.loginData._id)}
                                    style={{color:'#a4a4a4', fontSize:'50px', cursor: 'pointer', verticalAlign:'middle'}}>repeat</i>
                            </div>
                        : null
                        }
                        <div style={linkDiv}><Link to='/quiz/singlequiz' style={linkStyle}>전체 보기</Link></div>
                        {View}
                    </div>
                    {bar}
                </div>
                }
            </div>
            
        );
    }
}

export default SingleQuiz;