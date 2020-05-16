# Foldy React Component

The React component that wraps list of components and creates a folding list.


## Installation
This package requires peer dependency `styled-components` version >= 4.2.0 and `react` version >= 16.8.0

Issue the command
```bash
npm install foldy
```

## Props

Prop | Requied | Type | Default | Description
-----|---------|------|---------|------------
front | ✅ | object | | The DOM object or react element to be rendered when foldy is collapsed
list | ✅ | object[] | | Array of DOM objects or React elements. Each is rendered as a foldy item
open | ✅ | boolean | | Control the open/collapsed state of foldy
duration | | number | 1000 | How long the transition is in milliseconds
customClass | | string | `''` | custom CSS class to be assigned to foldy's DOM element for style customization


## Structure

Each of the following component can be styled by applying properties to their CSS class.

### FoldyList
Render list of `FoldyItem` components. CSS class: `foldy-list`.

### FoldyItem
Wrapper for each item in `list` passed to `Foldy` component. CSS class: `foldy-item`. Specific item can be addressed with CSS class `foldy-item--<order>` (0-based index).

### FoldyFront
Wrapper for the front element. It is rendered when `foldy` is collapsed. CSS class: `foldy-front`.

## Customization
`foldy` allows customization by receiving `customClass` prop as user-defined CSS class.
Beside CSS classes mentioned above for `foldy` components, These CSS selectors should come handy:
- `.foldy > .foldy-item__content::after`: the back face of each item.
- `.foldy-list.open`: class `.open` is attached to `foldy` when it's in open state.

## Examples

```javascript
import Foldy from 'foldy';

function Demo(props) {
  const list = Array.from(Array(5), (_, i) => <div>item {i}</div>);
  const front = <h1>This is displayed when Foldy is collapsed</h1>;


  return <>
    <Foldy
      front={front}
      list={list}
      duration={500}
      open={true}
      customClass='my-foldy'
    />
  </>
}
```

