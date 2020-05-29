import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField, requestRobots } from '../actions'

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		isPending: state.requestRobots.isPending,
		robots: state.requestRobots.robots,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearch: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}


class App extends Component {

	componentDidMount(){
		this.props.onRequestRobots()
	}

	render () {
		const { onSearch, searchField, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})

		return isPending 
			?
			<h1 className="f1 tc">Loading</h1> 
			: (
				<div className = "tc">
					<h1 className="f1">RoboList</h1>
					<SearchBox searchChange={onSearch}/>
					<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots} />
					</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

