import React, { Component } from "react";
import styled from "styled-components";
import ResultItems from "./resultItems";

const Favorites = styled.div`
  background: #f8fefa;
  margin-top: auto;
  min-height: 200px;
  padding: 1em 15px;
  h3 {
    color: #4a9363;
    font-size: 2em;
    margin: 0;
    margin-bottom: 15px;
    padding: 0 15px;
  }
`;

const StyledResults = styled.section`
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 15em);
`;

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }

  // handles favoriting results
  FavoriteResult(e, result, remove) {
    // look for exisiting favorited result
    const isFavorited = this.state.favorites.find(
      fav =>
        fav.result.body === result.body && fav.result.title === result.title
    );

    // create a new favorite if it doesn't exist or remove from list
    //
    if (isFavorited && remove) {
      //
      // removes favorite from list

      // save array to preserve state array's immutability
      let prevArry = [...this.state.favorites];

      // save index of current favorite
      let indexOf = prevArry.indexOf(isFavorited);

      // remove index from favorites list
      prevArry.splice(indexOf, 1);

      // save new favorites array
      this.setState({
        favorites: [...prevArry]
      });
    } else if (isFavorited && isFavorited.count >= 1) {
      //
      // Increments favorite count

      // save array to preserve state array's immutability
      let prevArry = [...this.state.favorites];

      // construct a new object | add one to count
      const newFavorite = Object.assign({}, isFavorited, {
        count: isFavorited.count + 1
      });

      // save index of current favorite
      let indexOf = prevArry.indexOf(isFavorited);

      // prepend array until index | insert new object to existing index | append indexs after new
      const newArray = [
        ...prevArry.slice(0, indexOf),
        newFavorite,
        ...prevArry.slice(indexOf + 1)
      ];

      // store new array in state
      this.setState({ favorites: [...newArray] });
    } else if (!isFavorited) {
      // create and store a new favorite with count of 1
      const newFavorite = { count: 1, result };
      this.setState({ favorites: [...this.state.favorites, newFavorite] });
    }
  }

  /**
   * Returns result for display
   *
   * @param {JSON} - result - The unicode to parse.
   * @return {array} - array - Array containing result components.
   */

  render() {
    // check to see if favorites over 1 exist
    const enoughFavorties = this.state.favorites.find(fav => fav.count > 1);

    return (
      <StyledResults>
        {/* {this.state.resultData && ( */}
        <ResultItems
          favorites={this.state.favorites}
          FavoriteResult={this.FavoriteResult.bind(this)}
          results={this.props.resultData}
        />
        {/* )} */}
        <Favorites>
          <h3>Favorites</h3>
          {/* renders favorites when there are favorites */}
          {enoughFavorties && (
            <ResultItems
              favorites={this.state.favorites}
              FavoriteResult={this.FavoriteResult.bind(this)}
              results={this.state.favorites}
              isFavoriteList={true}
            />
          )}
        </Favorites>
      </StyledResults>
    );
  }
}
