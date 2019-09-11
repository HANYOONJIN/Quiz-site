import React, { Component } from 'react';
import { PackageList } from 'components/Quiz';
import { SingleQuiz } from 'components/SingleQuiz';
import { decorate, observable, action } from 'mobx';
import {observer} from "mobx-react"

class searchPackage extends React.Component {

    constructor(props) {
        super(props);

        this.content = '';
        this.type = 'package';

        this.newlink = this.newlink.bind(this);
        this.newlink2 = this.newlink2.bind(this);

        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount(){
        this.content = this.props.match.params.content;
    }

    componentDidUpdate(){
        this.content = this.props.match.params.content;
    }

    newlink(){
        this.props.history.push('/quiz/newpackage');
    }

    newlink2(){
        this.props.history.push('/quiz/newquiz');
    }

    handleChange(e){
        this[e.target.name] = e.target.value;
    }

    render() {
        return (
            <div>
                <div style={{textAlign:'center', marginTop:'2rem'}}>
                    <select className="optionStyle" style={{width:'20%', fontSize:'12px'}} name='type' value={this.type} onChange={this.handleChange}>
                        <option value="package">문제집</option>
                        <option value="quiz">&nbsp;문 제</option>
                    </select>
                </div>
                {this.type == 'package'
                ?
                <PackageList newlink={this.newlink} type='search' content={this.content}/>
                :  
                <SingleQuiz newlink={this.newlink2} type='search' content={this.content}/>
                }
                
            </div>
        );
    }
}

decorate(searchPackage, {
    content: observable,
    type: observable,
    newlink: action,
    handleChange: action
  })

export default observer(searchPackage);
