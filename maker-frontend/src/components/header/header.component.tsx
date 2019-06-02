import React, { Fragment } from 'react';
import styled from 'styled-components';
import { HeaderProps } from '@containers/header/header.container';
import './header.component.scss';

const HeaderInput = styled('input')`
  width: 100%;
  border-radius: 0.75rem;
  border: 0px solid transparent;
  padding: 0.5rem;

  font-size: 1rem;
  font-weight: 400;
  outline: none;
`;

class HeaderComponent extends React.Component<HeaderProps> {
  public onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      searchPost, limit, offset, game,
    } = this.props;
    searchPost({
      searchInput: event.target.value,
      limit,
      offset,
      game,
    });
  };

  render() {
    const { searchInput } = this.props;

    return (
      <Fragment>
        <div id="header-input-container">
          <HeaderInput
            type="text"
            placeholder="원하는 게임 이름을 검색하세요."
            value={searchInput}
            onChange={this.onChange}
          />
        </div>
        <div id="header-logo-container">
          <span>Game Friends Maker</span>
        </div>
      </Fragment>
    );
  }
}

export default HeaderComponent;
