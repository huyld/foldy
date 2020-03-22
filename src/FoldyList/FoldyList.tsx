import * as React from 'react';
import FoldyItem from '../FoldyItem/FoldyItem';
import StyledFoldyList from './StyledFoldyList';

interface Props {
  front: object,
  list: object[],
  totalDuration: number,
  itemHeight: number,
}

interface State {
  active: boolean,
  flippedItem: boolean[]
  animating: boolean,
  pendingTimeout: number,
  expanded: boolean,
}


class FoldyList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
      flippedItem: Array.apply(null, Array(props.list.length)).map(_ => { return false; }),
      animating: false,
      pendingTimeout: 0,
      expanded: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { list, totalDuration } = this.props;
    const itemTransitionDuration = totalDuration / list.length;
    const foldyListTransitionDuration = itemTransitionDuration * (list.length - 1);

    if (!this.state.animating) {
      if (!this.state.active) {
        clearTimeout(this.state.pendingTimeout);
        this.setState({
          active: !this.state.active,
          animating: true,
          pendingTimeout: setTimeout(() => {
            this.setState({
              animating: false,
              expanded: true
            });
          }, foldyListTransitionDuration)
        });
      } else {
        clearTimeout(this.state.pendingTimeout);
        this.setState({
          active: !this.state.active,
          animating: true,
          pendingTimeout: setTimeout(() => {
            this.setState({
              animating: false,
              expanded: false
            });
          }, foldyListTransitionDuration)
        });
      }
    }
  }

  render() {
    const { front, list, itemHeight, totalDuration } = this.props;
    const itemTransitionDuration = totalDuration / list.length;
    const foldyListTransitionDuration = itemTransitionDuration * (list.length - 1);
    let className = `foldy-list foldy-list--${list.length}`;

    if (this.state.active) className += ' active';
    if (this.state.expanded) className += ' expanded';

    return <StyledFoldyList className={className}
      itemCount={list.length}
      itemHeight={itemHeight}
      transitionDuration={foldyListTransitionDuration}
      onClick={this.handleOnClick}
    >
      {list.reduceRight((processedList, currentItem, idx) => {
        return <FoldyItem
          itemCount={list.length}
          itemHeight={itemHeight}
          duration={itemTransitionDuration}
          order={idx}
          tail={idx == list.length - 1 ? undefined : processedList}
          back={idx == 1 ? front : undefined}>
          {currentItem}
        </FoldyItem>;
      }, list[list.length - 1])}
    </StyledFoldyList>;
  }
}

export default FoldyList;
