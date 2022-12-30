# Query-Parser

A simple query parser designed to create an AST from simple rules:

1. queries can use one of 6 comparisons: `==`, `!=`, `>=`, `<=`, `>`, `<`
2. the left side of a query must be a field name (string)
3. queries can be grouped with `AND` and `OR` to create more complicated queries

Note that this is an ES module, and requires `import`.

## Usage

```javascript
import { parse } from 'query-parser`;

const single = parse('"foo.bar" >= 23');
const multi = parse(`( "foo" == 1 AND bar == 'hello')`);
```

results:

```
{
  "left": "foo.bar",
  "operator": ">=",
  "right": 23
}

{
  "left": {
    "left": "foo",
    "operator": "==",
    "right": 1
  }.
  "operator": "AND",
  "right": {
    "left": "bar",
    "operator": "==",
    "right: "hello"
  }
}
```

## Developing

Developing requires `node.js` to build the parser.

### Building

```
yarn build
```

### Testing

```
yarn test
```
