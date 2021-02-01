# Some common ways to style React

How to style CSS components is a very opinionated topic - the most important thing is to follow your team's specified convention so that your codebase will be more easily understandable and maintainable.

Here are some common ways of styling in React:

1. Importing CSS file
2. Inline Styling
3. Using Styled Components
4. Using SASS

## Importing CSS File

### Advantage

- Simple and easy to understand
- When creating react app, an example is already there
- No additional learning required if you already know HTML and CSS

### Disadvantage

- Child component maybe be affected by the imported CSS file
- It is hard to style deeply nested components
- Might require additional convention in the team to keep things standardised

App.css

```css
.App-header h1 {
  color: rebeccapurple;
}
```

App.js

```js
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello</h1>
      </header>
    </div>
  );
}

export default App;
```

## Inline Styling

### Advantage

- Inline Styling makes referencing of styles by the component easier
- There is also a minimum learning curve
- Styles are unlikely to get overwritten

### Disadvantage

- Mixing view and logic in the same place
- Files can become quite large in length which can make finding code harder and more difficult to read
- You lose the option to reuse the same style if it ends up being required in more places

```javascript
import React from "react";
import "./App.scss";

function App() {
  return (
    <div>
      <header>
        <h1 style={styles.header}>Hello</h1>
      </header>
    </div>
  );
}

const styles = {
  header: {
    color: "rebeccapurple",
  },
};

export default App;
```

## Using Styled Components

### Advantage

- CSS and JS are all in one file making referencing of styles by the component easier

### Disadvantage

- There is a learning curve
- The syntax can look strange to people who are new to it
- Mixing view and logic in the same place
- Files can become quite large in length which can make finding code harder and more difficult to read
- Requires an additional package

Install the package`npm install styled-components`.

```javascript
import React from "react";
import styled from "styled-components";

const Header = styled.h1`
  color: rebeccapurple;
`;

function App() {
  return (
    <div>
      <header>
        <Header>Hello</Header>
      </header>
    </div>
  );
}

export default App;
```

Learn more about styled-components [here](https://styled-components.com/).

## Using SASS

### Advantage

- Relative similar to CSS meaning there is a low learning curve
- More intuitive than CSS
- Allows for variables and computations
- Allows **variables** as well as **nested styles**:

```css
$myColor: rebeccapurple;

.App {
  h1 {
    color: $myColor;
  }

  .pink-text {
    color: pink;
  }
}
```

### Disadvantage

- Developers who only work on SASS tend not to understand how CSS selectors work
- There is a learning curve to use SCSS features
- There is not much benefit if you already separate its small components and style them individually
- Requires an additional package

**Note: The original package `node-sass` is [deprecated](https://sass-lang.com/blog/libsass-is-deprecated) - try [dart-sass](https://github.com/sass/dart-sass) instead!** Follow the documentation to give SCSS syntax a go.
