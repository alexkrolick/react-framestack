# React-Framestack

```shell
yarn add react-framestack
```

## Components

### Stack

```jsx
  <Stack>{/* ... */}<Stack>
```

**Props**

- `stack` name for the stack; frames subscribe to a stack
- `startAt` initial index

**Provides Context** (subscribe through Frame)

- `index` selected frame
- `dispatch` trigger action (like Redux)
  - `dispatch("goForward")`
  - `dispatch("goForward")`
  - `dispatch("jumpTo", index)`

### Frame

```jsx
<Frame frame={0} exact={true} stack='slides'>{dispatch => <h1>One</h1>}<Frame>
```

**Props**

- `frame` hide unless frame matches index
- `exact` (defaults to true) if false, show if index is `>=` frame instead of `===`
- `stack` (defaults to 'slides') stack to subscribe to
- `children` function that takes `dispatch` as an argument

## Example: Building a Slideshow ([Codepen](https://codepen.io/alexkrolick/pen/MEPjKG/))

```jsx
import { Stack, Frame } from 'react-framestack'
```

```jsx
const lorem = `Lorem ipsum dolor sit amet`;

const NavButton = ({ navigate, children, ...props }) => {
  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    navigate();
  };
  return (
    <span {...props} onClick={handleClick}>
      {children}
    </span>
  );
};

const Slide = ({ next, prev, children }) => (
  <div className="slide" onClick={next}>
    {children}
    <NavButton
      style={{ position: "absolute", bottom: "1em", left: "1em" }}
      navigate={prev}
    >
      &larr;
    </NavButton>
    <NavButton
      style={{ position: "absolute", bottom: "1em", right: "1em" }}
      navigate={next}
    >
      &rarr;
    </NavButton>
  </div>
);

const Title = ({ children }) => <h1>{children}</h1>;

const Body = ({ color = "black", children }) => (
  <p style={{ color: color }}>{children}</p>
);

// Helper to simplify events
const createSlide = Component => dispatch => {
  const next = () => dispatch("goForward");
  const prev = () => dispatch("goBack");
  return (
    <Slide next={next} prev={prev}>
      <Component />
    </Slide>
  );
};

const SlideOne = createSlide(() => (
  <div>
    <Title>Slide One</Title>
    <Body>{lorem}</Body>
  </div>
));

const SlideTwo = createSlide(() => (
  <div>
    <Title>Slide Two</Title>
    <Body color="red">{lorem}</Body>
  </div>
));

const End = dispatch => (
  <div className="slide" style={{ background: "black" }}>
    <p>
      <a href="#" onClick={() => dispatch("jumpTo", 0)}>
        Restart
      </a>
    </p>
  </div>
);

const SlideShow = () => (
  <Stack stack="slides">
    {[SlideOne, SlideTwo, End].map((slide, i) => (
      <Frame frame={i} stack="slides" key={slide.name}>
        {slide}
      </Frame>
    ))}
  </Stack>
);
```
