import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import HomeContainer from './containers/HomeContainer/HomeContainer';

class App extends Component {
	
	render() {
		return (
			<Switch>
				<Route exact  path="/" component={HomeContainer}></Route>
			</Switch>
		);
	}
}

export default withRouter(App);
