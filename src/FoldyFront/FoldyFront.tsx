import * as React from 'react';
import StyledFoldyFront from './StyledFoldyFront';

interface Props {
  frontRef: any,
}


class FoldyFront extends React.Component<Props> {
  render() {
    return <StyledFoldyFront className="foldy-front" ref={this.props.frontRef}>
      {this.props.children}
    </StyledFoldyFront>;
  }
}

export default FoldyFront;
