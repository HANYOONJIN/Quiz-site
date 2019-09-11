import React from 'react';
import { Route } from 'react-router-dom';
import { HomeContainer } from 'containers/Home';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HomeContainer/>
            </div>
        );
    }
}

export default Home;
