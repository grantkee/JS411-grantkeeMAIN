import React, {Component} from 'react';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      author: '',
      term: '',
      date: '',
      errorMsg: '',
      feed: []
     };
  }

  onChange = (event) => {
    const result = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;

    this.setState({
      [name] : result
    });
  }

  termSubmit = (event) => {
    event.preventDefault();
    this.searchByTerm(this.state.term)
  }

  authorSubmit = ( event ) => {
    event.preventDefault()
    this.searchByAuthor(this.state.author)
  }
  
  dateSubmit = ( event ) => {
    event.preventDefault()
    this.searchByDate(this.state.date)
  }

  searchByTerm = (term) => {
      fetch(`http://hn.algolia.com/api/v1/search?query=${ term }`)
      .then( res => res.json())
      .then( info => {
          this.setState({news: info.hits})
      })
  }

 

  render() { 
    return ( <div>Hi</div> );
  }
}
 
export default NewsFeed;