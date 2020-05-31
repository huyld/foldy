import styled, { css } from 'styled-components';

interface StyledFoldyItemProps {
  componentCssClass: string,
  itemCount: number,
  itemHeight: number | string,
  order: number,
  duration: number,
  collapsingDelay: number,
  expandingDelay: number,
}

const StyledFoldyItem = styled.div<StyledFoldyItemProps>`
  position: absolute;
  top: 0;
  height: ${props => typeof props.itemHeight === 'string' ? props.itemHeight : props.itemHeight + 'px'};
  width: 100%;
  background-color: white;
  perspective: inherit;

  transition: transform ${props => props.duration}ms ease-in;
  transform-style: preserve-3d;
  transform-origin: center top;

  z-index: 1;

  ${props => generateTransformProperties(props.itemCount, props.duration, props.order, props.collapsingDelay, props.expandingDelay)}

  & > .${props => props.componentCssClass}__content {
    height: ${props => props.itemHeight}px;
    width: 100%;
    display: inline-block;
    transform-style: preserve-3d;

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
      backface-visibility: hidden;
      background-color: whitesmoke;
      z-index: 2;
    }
  }

  & > .${props => props.componentCssClass}__tail {
    position: relative;
    perspective: inherit;
  }

  & > .${props => props.componentCssClass}__back {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: rotateX(180deg);
    backface-visibility: hidden;
    z-index: 2;
  }
`;

function generateTransformProperties(itemCount: number, transitionDuration: number, order: number, collapsingDelay: number, expandingDelay: number) {
  let styles;
  if (order > 0) {
    styles = css`
      &.foldy-item--${order} {
        transform: rotateX(180deg);
        transition-delay: ${collapsingDelay}ms;
      }

      .foldy-list.open &.foldy-item--${order} {
        transform: rotateX(0);
        transition-delay: ${expandingDelay}ms;
      }
    `;
  }
  return css`${styles}`;
}

export default StyledFoldyItem;
