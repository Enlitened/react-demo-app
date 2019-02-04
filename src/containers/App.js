import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

  constructor(props) {
    super(props);
    console.log(this.testFunction());
    console.log('[App.js] inside constructor', props);
  }

  componentWillMount() {
    console.log('[App.js] inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] inside componentDidMount()');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.persons !== this.state.persons ||
  //          nextState.showPersons !== this.state.showPersons;
  // }


  testFunction = () => {

    var nums = [2,1,2,3,4];
    var k = 4;

    const temp = { start: 0, sum: 0 };
    let result = { start: 0, end: k, sum: 0 };

    for (let i = 0; i < nums.length; i++) {
        temp.sum += nums[i];

        if (temp.sum > result.sum) {
            result = { start: temp.start, end: i, sum: temp.sum };
        }

        if (temp.sum < 0) {
            temp.sum = 0;
            temp.start = i + 1;
        }
    }

    console.log(result.sum);
    return result;
  }

  state = {
    persons: [
      { id: '1', name: 'Colin', age: 33 },
      { id: '2', name: 'Joe', age: 22 },
      { id: '3', name: 'Bill', age: 27 }
    ],
    otherState: 'Some other value',
    showPersons: false,
    toggleClicked: 0,
    authenticated: false
  }

  deletePersonHandler = (personsIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personsIndex, 1);
    this.setState({persons: persons})
  }

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons:persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {    
    console.log('[App.js] inside render()');

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />;             
    }    

    return (      
      <Aux>
        <button onClick={() => {this.setState({showPersons:true})}}>Show Persons</button>
        <Cockpit 
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          login={this.loginHandler}
          appTitle={this.props.title}></Cockpit> 
        <AuthContext.Provider value={this.state.authenticated}>
          {persons} 
        </AuthContext.Provider>          
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!'));
  }
}

export default withClass(App, classes.App);
