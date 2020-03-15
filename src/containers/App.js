import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


class App extends Component {
	constructor(){
		super()
		this.state = {
			searchField: '',
			robots: []
		}
	}

	onSearch = (event) => {
		this.setState({searchField: event.target.value})
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({robots: users}))
	}

	render () {
		const { robots, searchField } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})

		return !robots.length ?
			<h1 className="f1 tc">Loading</h1> :
			(
				<div className = "tc">
					<h1 className="f1">RoboList</h1>
					<SearchBox searchChange={this.onSearch}/>
					<Scroll>
						<CardList robots={filteredRobots} />
					</Scroll>
				</div>
			);
		}
}

export default App;