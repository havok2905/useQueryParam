# useQueryParam

## Usage

```Typescript
const App = (): FC => {
  // `fooValue`: `string`
  // `setFooValue`: `(newValue: string) => void`
  const [fooValue, setFooValue] = useQueryParam('foo', 'fooValue');

  return (
    <input
      id="foo"
      name="foo"
      onChange={(e) => {
        e.preventDefault();
        setFooValue(e.target.value);
      }}
      type="text"
      value={fooValue} />
  );
};
```

**Populated State:** `http://localhost:9000/?foo=fooValue`

**Empty State:** `http://localhost:9000/?foo=`

## Setup

- Clone this repository
- `npm i`

## ENV

- Node: v18.12.1
- NPM: 9.1.1

## Scripts

- `npm run lint`: runs eslint
- `npm run test`: runs jest
- `npm run example-dev-server`: runs development sandbox with webpack dev server