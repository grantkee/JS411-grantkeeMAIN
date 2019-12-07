import React, {Component} from 'react';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      author: '',
      term: '',
      date: '',
      errorMsg: '',
      news: []
     };
  }

  onChange = (event) => {
    const result = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
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
        if (info.hits.length === 0) {
          this.setState({ news: [{title: "No results match", author:null, created_at:null}]})
        } else {
          this.setState({news: info.hits})
        }
      })
      .catch( error => this.errorMsg = error)
  }

 searchByAuthor = ( author ) => {
   fetch(`http://hn.algolia.com/api/v1/search?tags=author_${ author }`)
   .then( res => res.json())
   .then( info => {
     if (info.hits.length === 0) {
      this.setState({ news: [{title: "No results match", author:null, created_at:null}]})
     } else {
       this.setState({news: info.hits})
     }
   })
   .catch( error => this.errorMsg = error)
 }

 searchByDate = ( date ) => {
   let myDate = date.split('-')
   let searchDate = new Date(parseInt(myDate[2], 10), parseInt(myDate[1], 10), parseInt(myDate[0], 10) ).getTime();
   console.log(searchDate);
   fetch(`http://hn.algolia.com/api/v1/search_by_date?numericFilters=created_at_i=${ date }`)
   .then( res => res.json() )
   .then( info => {
     if (info.hits.length === 0) {
      this.setState({ news: [{title: "No results match", author:null, created_at:null}]})
     } else {
       this.setState({news: info.hits})
     }
   })
   .catch( error => this.error = error)
 }

  render() { 
    return ( 
      <div className='container'>
        <div className="search-term">
          <form onSubmit={this.dateSubmit}>
            <input 
              type='text'
              name='query'
              placeholder='Type search term here'
              value={this.state.term}
              onChange={this.onChange}/>
            <button>Search</button>
          </form>
        </div>
        <ul>
          {this.state.news.map((news) => (
            <li key={news.objectID}>
                <p>{news.title}</p>
              
            </li>
          ))}
        </ul>
      </div>
     );
  }
}
 
export default NewsFeed;