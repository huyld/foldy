import * as React from 'react';
import StyledFoldyItem from './StyledFoldyItem';

interface Props {
  order: number,
  itemHeight: number | string,
  itemRef: object,
  itemCount: number,
  expanding: boolean,
  duration: number,
  listTransitionDuration: number,
  back?: object,
  tail?: object,
}


class FoldyItem extends React.Component<Props> {

  render() {
    const componentCssClass = 'foldy-item';
    const { duration, itemCount, itemHeight, itemRef, listTransitionDuration, expanding, order } = this.props;
    const className = `${componentCssClass} ${componentCssClass}--${order}`

    const movingItemIdx = expanding
      ? itemCount - (1 + Math.floor(listTransitionDuration / duration))
      : 1 + Math.floor(listTransitionDuration / duration);

    const timeForMovingItemToFinish = listTransitionDuration % duration;
    let collapsingDelay = duration,
        expandingDelay = duration;
    if (expanding) {
      expandingDelay = order > movingItemIdx
        ? (order - movingItemIdx - 1) * duration + timeForMovingItemToFinish
        : 0;
    } else {
      collapsingDelay = order < movingItemIdx
        ? (movingItemIdx - order - 1) * duration + timeForMovingItemToFinish
        : 0;
    }

    let itemTransitionDuration = duration;
    if (order === movingItemIdx && timeForMovingItemToFinish > 0)
      itemTransitionDuration = timeForMovingItemToFinish

    return <StyledFoldyItem className={className}
      componentCssClass={componentCssClass}
      itemCount={itemCount}
      duration={itemTransitionDuration}
      collapsingDelay={collapsingDelay}
      expandingDelay={expandingDelay}
      itemHeight={itemHeight}
      order={order}
      ref={itemRef}
    >
      <div className={`${componentCssClass}__content`}>
        {this.props.children}
      </div>
      {!!this.props.back && <div className={`${componentCssClass}__back`}>
        {this.props.back}
      </div>}
      {!!this.props.tail && <div className={`${componentCssClass}__tail`}>
        {this.props.tail}
      </div>}
    </StyledFoldyItem>;
  }
}

export default FoldyItem;
