import * as React from 'react';
import FoldyItem from '../FoldyItem/FoldyItem';
import StyledFoldyList from './StyledFoldyList';

interface Props {
  front: object,
  list: object[],
  itemRefList: object[],
  totalDuration: number,
  itemHeight: number | string,
  open: boolean,
}

interface State {
  animating: boolean,
  pendingTimeout: number,
  transitionTimePassed: number,
  expanded: boolean,
}


class FoldyList extends React.Component<Props, State> {
  transitionStartingTime: number;
  innerRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      animating: false,
      pendingTimeout: 0,
      transitionTimePassed: 0,
      expanded: false,
    };
    this.transitionStartingTime = 0;
    this.innerRef = React.createRef();

    this.resetTransitionStartingTime= this.resetTransitionStartingTime.bind(this);
  }

  resetTransitionStartingTime(timeToFinishLastTransition = 0) {
    this.transitionStartingTime = Date.now() - timeToFinishLastTransition;
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    const { animating, pendingTimeout } = this.state;
    const { list, totalDuration, open } = this.props;
    const itemTransitionDuration = totalDuration / list.length;
    const foldyListTransitionDuration = itemTransitionDuration * (list.length - 1);

    if (!animating) {
      if (prevProps.open !== open && !prevProps.open) {
        clearTimeout(pendingTimeout);
        this.setState({
          animating: true,
          pendingTimeout: setTimeout(() => {
            this.setState({
              animating: false,
              expanded: true,
              transitionTimePassed: 0,
            });
          }, foldyListTransitionDuration)
        }, this.resetTransitionStartingTime);
      } else if (prevProps.open !== open && prevProps.open) {
        clearTimeout(pendingTimeout);
        this.setState({
          animating: true,
          pendingTimeout: setTimeout(() => {
            this.setState({
              animating: false,
              expanded: false,
              transitionTimePassed: 0,
            });
          }, foldyListTransitionDuration)
        }, this.resetTransitionStartingTime);
      }
    } else {
      const transitionTimePassed = Date.now() - this.transitionStartingTime;
      const timeToFinishLastTransition = foldyListTransitionDuration - transitionTimePassed;

      if (prevProps.open !== open) {
        if (!prevProps.open) {
          clearTimeout(pendingTimeout);
          this.setState({
            transitionTimePassed,
            pendingTimeout: setTimeout(() => {
              this.setState({
                animating: false,
                expanded: false,
                transitionTimePassed: 0,
              });
            }, transitionTimePassed)
          }, () => this.resetTransitionStartingTime(timeToFinishLastTransition));
        } else if (prevProps.open) {
          clearTimeout(pendingTimeout);
          this.setState({
            transitionTimePassed,
            pendingTimeout: setTimeout(() => {
              this.setState({
                animating: false,
                expanded: false,
                transitionTimePassed: 0,
              });
            }, transitionTimePassed)
          }, () => this.resetTransitionStartingTime(timeToFinishLastTransition));
        }
      }
    }
  }

  render() {
    const { front, list, itemHeight, itemRefList, open, totalDuration } = this.props;
    const { animating, expanded, transitionTimePassed } = this.state;
    const itemTransitionDuration = totalDuration / list.length;
    const foldyListTransitionDuration = transitionTimePassed
      ? transitionTimePassed
      : itemTransitionDuration * (list.length - 1);
    let className = `foldy-list foldy-list--${list.length}`;

    if (open) className += ' open';
    if (expanded) className += ' expanded';
    if (animating) className += ' animating';

    return <StyledFoldyList className={className}
      itemCount={list.length}
      itemHeight={itemHeight}
      transitionDuration={foldyListTransitionDuration}
      ref={this.innerRef}
    >
      {list.reduceRight((processedList, currentItem, idx) => {
        return <FoldyItem
          itemCount={list.length}
          itemHeight={itemHeight}
          itemRef={itemRefList[idx]}
          expanding={open}
          duration={itemTransitionDuration}
          listTransitionDuration={foldyListTransitionDuration}
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
