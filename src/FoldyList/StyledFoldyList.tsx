import styled, { css } from 'styled-components';

interface StyledFoldyListProps {
  itemCount: number,
  itemHeight: number,
  transitionDuration: number,
}

const StyledFoldyList = styled.div<StyledFoldyListProps>`
  position: relative;
  width: 100%;
  height: ${props => props.itemHeight}px;
  background-color: lightcoral;
  perspective: 1000px;

  ${props => generateAnimations(props.itemCount, props.itemHeight, props.transitionDuration)}
`;

function generateAnimations(itemCount: number, itemHeight: number, transitionDuration: number) {
  return css`
    &.foldy-list--${itemCount} {
      transition-property: margin-bottom;
      transition-duration: ${transitionDuration}ms;
      transition-delay: 0s;
      transition-timing-function: ease-in;
      margin-bottom: 0;
    }
    &.foldy-list--${itemCount}.open {
      transition-property: margin-bottom;
      transition-duration: ${transitionDuration}ms;
      transition-delay: 0s;
      transition-timing-function: ease-out;
      margin-bottom: ${itemHeight * (itemCount - 1)}px;
    }
  `;
}

export default StyledFoldyList;
