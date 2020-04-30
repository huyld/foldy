import * as React from 'react';
import StyledFoldy from './StyledFoldy';
import FoldyFront from '../FoldyFront/FoldyFront';
import FoldyList from '../FoldyList/FoldyList';

interface Props {
  front: object,
  list: object[],
  open: boolean,
  duration?: number,
  customClass?: string,
}

interface State {
  itemHeight: number,
}


class Foldy extends React.Component<Props, State> {
  readonly EACH_FLIP_DURATION = 1000;
  readonly DEFAULT_DURATION = 1000;

  frontRef: any;
  itemRefList: any;

  constructor(props: Props) {
    super(props);
    this.frontRef = React.createRef();
    this.itemRefList = Array.from(Array(props.list.length), () => React.createRef());

    this.state = {
      itemHeight: 0
    };
  }

  componentDidMount() {
    const maxHeight = Math.max(...[
      this.frontRef.current.clientHeight,
      ...this.itemRefList.map(ref => ref.current.clientHeight)
    ]);

    this.setState({
      itemHeight: maxHeight
    });
  }

  render() {
    const { duration, front, list, children } = this.props;
    const customClass = !!this.props.customClass ? this.props.customClass : '';
    const totalDuration = duration ? duration : this.DEFAULT_DURATION;

    return <StyledFoldy className={`foldy ${customClass}`}>
      <FoldyList
        list={list}
        itemRefList={this.itemRefList}
        totalDuration={totalDuration}
        front={<FoldyFront frontRef={this.frontRef}>{front}</FoldyFront>}
        open={this.props.open}
        itemHeight={!!this.state.itemHeight ? this.state.itemHeight : 'auto'}
      />
      {children}
    </StyledFoldy>;
  }
}

export default Foldy;
