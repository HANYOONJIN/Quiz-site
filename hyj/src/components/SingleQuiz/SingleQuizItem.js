import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { autorun } from 'mobx';
import PropTypes from 'prop-types';

const Title = {
    fontSize: '1rem',
    color: 'gray',
    textAlign: 'left',
    display: 'inline-block',
    paddingLeft: '1rem',
    width: '80%'
}

const Title2 = {
    fontSize: '1rem',
    color: 'red',
    textAlign: 'left',
    display: 'inline-block',
    paddingLeft: '1rem',
    width: '80%'
}

const Positioner = {
    marginTop: '1.5rem',
    height: '60px',
    background: 'white',
    display: 'inline-block',
    cursor: 'pointer'
}

const Label = {
    fontSize: '1rem',
    color: 'gray',
    textAlign: 'right',
    display: 'inline-block',
    paddingRight: '1rem',
    width: '20%'
}

class SingleQuizItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bool : false,
            tagArray: [],
            checked : false
        }

        this.plusClick = this.plusClick.bind(this);
    }

    componentDidMount() {
        let tag = this.props.tag;
        tag = tag.replace(/(\s*)/g,"");
        tag = tag.substring(1);
        let splitTag = tag.split('#');

        this.setState({
            tagArray: splitTag
        });
    }

    plusClick() {
        const { num, plusClick } = this.props;

        plusClick(num);

        this.setState({
            checked: !this.state.checked
        });
    }

    render() {
        let link_write = '/quiz/writequiz/'+this.props.num;
        let link_read = '/quiz/readquiz/'+this.props.num;

        const tag =
            this.state.tagArray.map(data => (
                <span><Link to={'/quiz/tagSelectQuiz/'+data}><a style={{backgroundColor:'blue', color:'white', fontSize:'11px', padding:'0.3px'}}>{data}</a></Link>&nbsp;&nbsp;</span>
                )
            )

        return (
            <div>
                {this.props.type=='new' ?
                <div style={Positioner} className='ShadowedBox2 card-3'  onClick={this.plusClick}>
                    <div style={this.state.checked ? Title2 : Title}><b>{this.props.quizName}</b></div>
                </div>
                :
                <div style={Positioner} className='ShadowedBox2 card-3'>
                    <Link to={ this.props.id == this.props.loginId ? link_write : link_read }>
                        <div style={Title}><b>{this.props.quizName}</b></div>
                    </Link>
                    <div style={Label}>{tag}</div>
                </div>
                }
            </div>
        );
    }
}

export default SingleQuizItem;