import React, { Component } from "react";
import Search from "./search";
import Results from "./results";
import styled from "styled-components";

const StyledApp = styled.section`
  height: 100%;
  width: 100%;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      limit: 5,
      query: "",
      resultData: [],
      data: []
    };
  }

  componentDidMount() {
    this.fetchData(); // GET data on start
  }

  // Fetch data and save store
  fetchData() {
    // construct url
    const URL = `https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR`;
    const PARAMS = `?limit=1000`;

    // GET from url
    fetch(`${URL}${PARAMS}`)
      .then(res => res.json()) // convert to json
      .then(json => this.setState({ data: json })) // save data for filtering later
      .catch(error => console.error(error)); // log errors
  }

  runQuery() {
    if (this.state.query === "") return; // don't run an empty query

    // filter data array based on keywords
    let searchResults = this.state.data.filter(data =>
      data.keywords.toLowerCase().includes(this.state.query.toLowerCase())
    );

    // save results for displaying
    this.setState({
      resultData: searchResults
    });
  }

  // Store and update search string
  updateQuery(ev) {
    this.setState({ query: ev.target.value });
    // clear waste data
    if (ev.target.value === "") this.setState({ resultData: [] });
  }

  render() {
    return (
      <StyledApp>
        <Search
          runQuery={this.runQuery.bind(this)}
          updateQuery={this.updateQuery.bind(this)}
        />
        <Results resultData={this.state.resultData} />
      </StyledApp>
    );
  }
}

export default App;
