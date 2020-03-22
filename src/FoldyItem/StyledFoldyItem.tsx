import styled, { css } from 'styled-components';

interface StyledFoldyItemProps {
  componentCssClass: string,
  itemCount: number,
  itemHeight: number,
  order: number,
  transitionDuration: number,
}

const StyledFoldyItem = styled.div<StyledFoldyItemProps>`
  position: absolute;
  top: 0;
  height: ${props => props.itemHeight}px;
  width: 100%;
  background-color: white;

  transition: transform ${props => props.transitionDuration}ms ease-in;
  transform-style: preserve-3d;
  transform-origin: center top;

  z-index: 1;

  ${props => generateTransformProperties(props.itemCount, props.transitionDuration, props.order)}

  & > .${props => props.componentCssClass}__content {
    height: ${props => props.itemHeight}px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      width: 100%;
      transform: rotateX(180deg);
      transform-style: preserve-3d;
      backface-visibility: hidden;
      background-color: whitesmoke;
      z-index: 2;
    }
  }

  & > .${props => props.componentCssClass}__tail {
    position: relative;
  }

  & > .${props => props.componentCssClass}__back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotateX(180deg);
    backface-visibility: hidden;
    z-index: 2;
  }
`;

function generateTransformProperties(itemCount: number, transitionDuration: number, order: number) {
  let styles = '';
  if (order > 0) {
    styles += `
      &.foldy-item--${order} {
        transform: rotateX(180deg);
        transition-delay: ${transitionDuration * (order - 1)}ms;
      }

      .foldy-list.active &.foldy-item--${order} {
        transform: rotateX(0);
      }

      .foldy-list.expanded &.foldy-item--${order} {
        transition-delay: ${(itemCount - (order + 1)) * transitionDuration}ms;
      }
    `;
  }
  return css`${styles}`;
}

export default StyledFoldyItem;
