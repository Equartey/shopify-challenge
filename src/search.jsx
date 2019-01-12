import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #4a9363;
  border: 0;
  box-shadow: 0;
  cursor: pointer;
  fill: #fff;
  margin-left: 15px;
  padding: 2px;
  width: 50px;
  transform: scaleX(-1);

  :hover {
    opacity: 0.9;
  }
  :focus {
    outline: #4a9363 auto 5px;
  }
`;
const Header = styled.h1`
  background: linear-gradient(to right, #2e598f, #43866c);
  color: #fff;
  font-size: 3em;
  margin: 0;
  padding: 1em 0;
  text-align: center;
`;
const SearchBar = styled.input`
  border: 1px solid #888;
  flex: 1 1 auto;
  font-size: 2em;
  padding-left: 0.5em;

  :focus {
    border: 1px solid #4a9363;
    outline: #4a9363 auto 5px;
  }
`;
const SearchWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 15px;
  width: 100%;
`;
const StyledSearch = styled.section`
  width: 100%;
`;

export default class Search extends React.PureComponent {
  // handles key presses in input box
  handleKeyPress = ev => {
    // only run query on enter key
    if (ev.key === "Enter") {
      this.props.runQuery();
    }
  };

  render() {
    return (
      <StyledSearch>
        <Header>Toronto Waste Lookup</Header>
        <SearchWrap>
          <SearchBar
            onChange={this.props.updateQuery}
            onKeyPress={this.handleKeyPress}
          />
          <Button onClick={this.props.runQuery}>
            {/* SVG courtesy of Ionicons */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z" />
            </svg>
          </Button>
        </SearchWrap>
      </StyledSearch>
    );
  }
}
