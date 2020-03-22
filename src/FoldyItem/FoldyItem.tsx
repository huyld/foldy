import * as React from 'react';
import StyledFoldyItem from './StyledFoldyItem';

interface Props {
  order: number,
  itemHeight: number,
  itemCount: number,
  duration: number,
  back?: object,
  tail?: object,
}


class FoldyItem extends React.Component<Props> {

  render() {
    const componentCssClass = 'foldy-item';
    const { duration, itemCount, itemHeight, order } = this.props;
    const className = `${componentCssClass} ${componentCssClass}--${order}`

    return <StyledFoldyItem className={className}
      componentCssClass={componentCssClass}
      itemCount={itemCount}
      transitionDuration={duration}
      itemHeight={itemHeight}
      order={order}
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
