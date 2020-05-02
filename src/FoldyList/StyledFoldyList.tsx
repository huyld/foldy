import styled, { css } from 'styled-components';

interface StyledFoldyListProps {
  itemCount: number,
  itemHeight: number | string,
  transitionDuration: number,
}

const StyledFoldyList = styled.div<StyledFoldyListProps>`
  position: relative;
  width: 100%;
  height: ${props => typeof props.itemHeight === 'string' ? props.itemHeight : props.itemHeight + 'px'};
  background-color: lightcoral;
  perspective: 1000px;

  ${props => generateAnimations(props.itemCount, props.itemHeight, props.transitionDuration)}
`;

function generateAnimations(itemCount: number, itemHeight: number | string, transitionDuration: number) {
  const marginBottom = typeof itemHeight === 'string'
    ? 'auto'
    : (itemHeight * (itemCount - 1)) + 'px';

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
      margin-bottom: ${marginBottom};
    }
  `;
}

export default StyledFoldyList;
