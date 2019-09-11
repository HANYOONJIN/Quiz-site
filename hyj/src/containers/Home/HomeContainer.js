import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import update from 'react-addons-update';
import Home from 'components/Home/Home';

const Positioner = {
    textAlign:'center',
    marginTop: '3rem',
    padding: '2rem'
}

class HomeContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            packageListData : [],
            quizListData : []
        }

        this.getPackageList = this.getPackageList.bind(this);
        this.getQuizList = this.getQuizList.bind(this);
    }

    componentDidMount() {
        this.getPackageList();
        this.getQuizList();
    }
  
    getPackageList() {
        axios.get('/api/board/packageList5')
		.then((response) => {
            console.log(response.data.data)
            this.setState({
                packageListData : response.data.data.map(
                    info => ({
                        num: info.num,
                        title: info.title
                    })
                )
            });
		})
		.catch((err)=>{
			console.log('Error fetching packageList5',err);
        });
    }

    getQuizList() {
        axios.get('/api/board/quizList5')
		.then((response) => {
            this.setState({
                quizListData : response.data.data.map(
                    info => ({
                        num: info.num,
                        title: info.quizname
                    })
                )
            });
		})
		.catch((err)=>{
			console.log('Error fetching quizList5',err);
        });
    }

    render() {
        return (
            <div style={Positioner}>
                <span style={{margin:'3rem'}}><Home List={this.state.packageListData} mode={true}/></span>
                <span style={{margin:'3rem'}}><Home List={this.state.quizListData} mode={false}/></span>
            </div>
        );
    }
}

export default HomeContainer;