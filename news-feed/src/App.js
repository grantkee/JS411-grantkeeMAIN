import React from 'react';
import './App.css';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      term: '',
      author: '',
      date: '',
      errorMsg: '',
      news: []
     }
  }

  onChange = (event) => {
    const result = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;

    this.setState({
      [name] : result
    });
  }

  

  render() { 
    return ( <div>Hi</div> );
  }
}
 
export default NewsFeed;