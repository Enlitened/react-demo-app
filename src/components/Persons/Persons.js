import React, { PureComponent } from 'react';
import Person from './Person/Person'
//import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary'

class Persons extends PureComponent {

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.persons !== this.props.persons ||
  //          nextProps.changed !== this.props.changed ||
  //          nextProps.clicked !== this.props.clcked;
  // }  

  constructor(props) {
    super(props);
    this.lastPersonRef = React.createRef();
  } 

  componentDidMount() {
    this.lastPersonRef.current.focus();
  }
  
  render() {
    return this.props.persons.map((person, index) => {
      return (
        <Person
          key={person.id}
          name={person.name}
          age={person.age}
          position={index}
          ref={this.lastPersonRef}          
          click={() => this.props.clicked(index)}                 
          changed={(event) => this.props.changed(event, person.id)} />      
      )
    })      
  }
}

export default Persons;