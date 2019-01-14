import React, { PureComponent } from "react";
import styled from "styled-components";
const Description = styled.div`
  flex: 1 1 50%;
`;
const Title = styled.div`
  flex: 1 1 50%;
`;
const Result = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 25px 0;
  padding: 0 15px;

  :first-of-type {
    margin-top: 0;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 10px;
  }
`;
const Star = styled.div`
  cursor: pointer;
  fill: ${props => (props.favorites ? "#4a9363" : "#aaa")}
  height: 20px;
  margin-right: 10px;
  width: 20px;

  :hover {
    fill: #4a9363;
  }
`;

export default class ResultItems extends PureComponent {
  // ResultMarkup(result, isFavoriteList) {

  /**
   * Returns html unicode as a string
   *
   * @param {unicode} - unicode - The unicode to parse.
   * @return {html} - string - The HTML string to render.
   */
  HtmlDecode(unicode) {
    var e = document.createElement("div");
    e.innerHTML = unicode;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  render() {
    // Finds a specific favorite in the list and saves if fav count > 1
    const favCount = this.props.favorites.find(fav => {
      if (
        fav.result.body === this.props.results.body &&
        fav.result.title === this.props.results.title
      ) {
        return fav.count > 1;
      }
      return null;
    });

    const createResult = (result, isFavoriteList) => {
      return (
        <Result
          id={result.id}
          key={`${result.title}${result.body}`} // Uses result title & body as a 'cheap' unquie key
        >
          <Star
            favorites={favCount !== undefined}
            onClick={() =>
              this.props.FavoriteResult(this, result, isFavoriteList)
            }
          >
            {/* SVG courtesy of Ionicons */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z" />
            </svg>
          </Star>
          <Title>{result.title}</Title>
          <Description
            dangerouslySetInnerHTML={{
              __html: this.HtmlDecode(result.body)
            }}
          />
        </Result>
      );
    };

    // returns the markup for a result entry
    return this.props.results.map(createResult);
  }

  // }
}
