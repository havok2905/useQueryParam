import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { useQueryParam } from '../src/useQueryParam';

const el = document.getElementById('app');
const root = createRoot(el!);

const App: FC = () => {
  const [fooValue, setFooValue] = useQueryParam('foo', 'fooValue');
  const [barValue, setBarValue] = useQueryParam('bar', 'barValue');
  const [bazValue, setBazValue] = useQueryParam('baz', 'bazValue');

  return (
    <div>
      <h1>Example</h1>
      <form>
        <fieldset>
          <label htmlFor="foo">Foo</label>
          <input
            id="foo"
            name="foo"
            onChange={(e) => {
              e.preventDefault();
              setFooValue(e.target.value);
            }}
            type="text"
            value={fooValue} />
        </fieldset>
        <fieldset>
          <label htmlFor="bar">Bar</label>
          <input
            id="bar"
            name="bar"
            onChange={(e) => {
              e.preventDefault();
              setBarValue(e.target.value);
            }}
            type="text"
            value={barValue} />
        </fieldset>
        <fieldset>
          <label htmlFor="baz">Baz</label>
          <input
            id="baz"
            name="baz"
            onChange={(e) => {
              e.preventDefault();
              setBazValue(e.target.value);
            }}
            type="text"
            value={bazValue} />
        </fieldset>
      </form>
    </div>
  );
};

root.render(<App/>);
