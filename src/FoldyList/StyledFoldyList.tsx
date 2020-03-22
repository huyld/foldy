import styled, { css } from 'styled-components';

interface StyledFoldyListProps {
  itemCount: number,
  itemHeight: number,
  transitionDuration: number,
}

const StyledFoldyList = styled.div<StyledFoldyListProps>`
  ${(props => generateKeyframes(props.itemCount, props.itemHeight))}

  position: relative;
  width: 100%;
  height: ${props => props.itemHeight}px;
  background-color: lightcoral;
  perspective: 1000px;

  ${props => generateAnimations(props.itemCount, props.transitionDuration)}
`;

function generateKeyframes(itemCount: number, itemHeight: number) {
  return css`
    @keyframes increase-height-${itemCount} {
      0% {
        margin-bottom: 0;
      }
      100% {
        margin-bottom: ${itemHeight * (itemCount - 1)}px;
      }
    }
    @keyframes decrease-height-${itemCount} {
      0% {
        margin-bottom: ${itemHeight * (itemCount - 1)}px;
      }
      100% {
        margin-bottom: 0;
      }
    }
  `;
}

function generateAnimations(itemCount: number, transitionDuration: number) {
  return css`
    &.foldy-list--${itemCount}.active {
      animation: ${transitionDuration}ms ease-out 0s 1 alternate both increase-height-${itemCount};
    }
    &.foldy-list--${itemCount}.expanded:not(.active) {
      animation: ${transitionDuration}ms ease-in 0s 1 alternate both decrease-height-${itemCount};
    }
  `;
}

export default StyledFoldyList;
