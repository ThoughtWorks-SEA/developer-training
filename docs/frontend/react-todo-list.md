# Building a todo list

![todo5](_media/todo5.png)

## Creating the todo list skeleton

1. Create a new folder called "components"
2. Create a new file "TodoList.js", within the new folder
3. Create a placeholder for the TodoList

```javascript
import React from "react";

class TodoList extends React.Component {
  render() {
    return (
      <div>
        <div>TodoList</div>
      </div>
    );
  }
}

export default TodoList;
```

Our todo list holds some data about the items in the todo list.
We are likely to use `state` to keep track of the items inside of the list so we can use a class component to help us.

4. Import TodoList in App.js

```javascript
import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;
```

We should now see the word "TodoList" displayed at the top left of the browser.

## Displaying Todo items

1. In `this.state`, add an array `todos`
2. Initialise it with some dummy value for now. A todo should be an object with a `name` and `isDone` property.

```javascript
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { name: "Buy Milk", isDone: false },
        { name: "Do push up", isDone: true },
      ],
    };
  }

  displayTodos() {
    return this.state.todos.map((todo) => (
      <div>
        <span>{todo.name}</span>
        <span>{todo.isDone ? " - completed" : " - not completed"}</span>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div>TodoList</div>
        <div>{this.displayTodos()}</div>
      </div>
    );
  }
}

export default TodoList;
```

## Creating a TodoItem Component

1. Create a TodoItem component to host todo logic
2. Find a good looking green tick image and put it inside the public folder

```javascript
import React from "react";

const TodoItem = ({ name, isDone }) => (
  <div>
    <span>
      {isDone && (
        <img
          height="16"
          alt="done"
          src={`${process.env.PUBLIC_URL}/tick.png`}
        />
      )}
    </span>
    <span>{name}</span>
  </div>
);

export default TodoItem;
```

2. Display todos using the TodoItem component in TodoList

```javascript
  displayTodos() {
    return this.state.todos.map(todo => (
      <div>
        <TodoItem name={todo.name} isDone={todo.isDone} />
      </div>
    ));
```

![todo1](_media/todo1.png)

Let's try to style the component a little.

In TodoItem.css

```css
.todo-item {
  display: flex;
  align-items: center;
}

.todo-item__completed {
  height: 1.5em;
  width: 1.5em;
  border: 1px solid lightblue;
  border-radius: 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-item__completed img {
  height: 20px;
}

.todo-item__name {
  margin-left: 5px;
}
```

In TodoItem.js

```javascript
import React from "react";
import "./TodoItem.css";

const TodoItem = ({ name, isDone }) => (
  <div className="todo-item">
    <span className="todo-item__completed">
      {isDone && <img alt="done" src={`${process.env.PUBLIC_URL}/tick.png`} />}
    </span>
    <span className="todo-item__name">{name}</span>
  </div>
);

export default TodoItem;
```

![todo2](_media/todo2.png)

## Complete or Uncomplete a todo item

To achieve this, we can identify an individual item.
We can do this by assigning a Universally Unique Identifier(UUID) to the individual item.

```sh
npm install uuid
```

In TodoList

```javascript
import React from "react";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid"; // 1. import the UUID

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: uuidv4(), // 2. add uuid to the item
          name: "Buy Milk",
          isDone: false,
        },
        {
          id: uuidv4(), // 3.add uuid to the item
          name: "Do push up",
          isDone: true,
        },
      ],
    };
  }

  displayTodos() {
    return this.state.todos.map((todo) => {
      // 4. add a method that can change the status of isDone
      const setTodo = (isDone) => {
        const currentTodo = this.state.todos.filter(
          (todoToFilter) => todoToFilter.id === todo.id
        )[0];
        currentTodo.isDone = isDone;
        this.setState({ todos: [...this.state.todos] });
      };
      // 5. pass in the method as a prop to Todo component
      return (
        <TodoItem name={todo.name} isDone={todo.isDone} setTodo={setTodo} />
      );
    });
  }

  render() {
    return (
      <div>
        <div>TodoList</div>
        <div>{this.displayTodos()}</div>
      </div>
    );
  }
}

export default TodoList;
```

In our TodoItem

```javascript
import React from "react";
import "./Todo.css";

// destructure the new property "setTodo"
const TodoItem = ({ name, isDone, setTodo }) => (
  <div className="todo-item">
    {/*on clicking the circle, toggle the status of the todo item*/}
    <span className="todo-item__completed" onClick={() => setTodo(!isDone)}>
      {isDone && <img alt="done" src={`${process.env.PUBLIC_URL}/tick.png`} />}
    </span>
    <span className="todo-item__name">{name}</span>
  </div>
);

export default TodoItem;
```

![todo3](_media/todo3.gif)

## Deleting an item

1. First, we can add a method to delete the Todo
2. Add it as a Prop in the todo item

```javascript
  displayTodos() {
    return this.state.todos.map(todo => {
      const setTodo = isDone => {
        const currentTodo = this.state.todos.filter(
          todoToFilter => todoToFilter.id === todo.id,
        )[0];
        currentTodo.isDone = isDone;
        this.setState({ todos: [...this.state.todos] });
      };

      // add a delete function
      const deleteTodo = () => {
        const todosWithoutItem = this.state.todos.filter(
          todoToFilter => todoToFilter.id !== todo.id,
        );
        this.setState({ todos: [...todosWithoutItem] });
      };

      return (
        <TodoItem
          name={todo.name}
          isDone={todo.isDone}
          setTodo={setTodo}
          deleteTodo={deleteTodo} // add it as a prop
        />
      );
    });
```

3. Add an X, on clicking on the X. We can delete the item. We can also use an image like how we did for the tick.

```javascript
const TodoItem = ({ name, isDone, setTodo, deleteTodo }) => (
  <div className="todo-item">
    <span className="todo-item__completed" onClick={() => setTodo(!isDone)}>
      {isDone && <img alt="done" src={`${process.env.PUBLIC_URL}/tick.png`} />}
    </span>
    <span className="todo-item__name">{name}</span>

    <span onClick={() => deleteTodo()} className="todo-item__delete">
      X
    </span>
  </div>
);

export default TodoItem;
```

4. Style to make it look nice

```css
.todo-item__delete {
  color: red;
  font-weight: bold;
  font-size: 1.4rem;
  margin-left: 8px;
}

.todo-item__delete:hover {
  cursor: pointer;
}
```

Now we have a todo list that items we can delete.

## Adding new todo items

1. Add an input box in TodoList

```javascript
<input
  type="text"
  value={this.state.newItemName}
  onChange={this.handleChange}
  placeholder="Take a break"
/>
```

2. Add a handle change function

```javascript
handleChange = (event) => {
  this.setState({ newItemName: event.target.value });
};
```

Notice that the `handleChange` function is an arrow function. Arrow function bind the current context allowing `this` in `this.setState` pointing to the TodoList.

3. Add a button below the input box and create a new function addNewTodo

```javascript
<button onClick={() => this.addNewTodo()}>add</button>
```

```javascript
  addNewTodo() {
    const { newItemName: name } = this.state;
    if (!name || !name.length) {
      return;
    }

    this.setState({
      newItemName: "",
      todos: [
        ...this.state.todos,
        {
          id: uuidv4(),
          name: name,
          isDone: false,
        },
      ],
    });
  }
```

In `addNewTodo`, we check that name is not empty; if the name is empty, we can ignore the request to add the item.

When adding a new item, we clear the state of `newItemName` as the user is unlikely to add 2 items of the same name.

![todo4](_media/todo4.gif)

In the console, we currently see the warning:
`index.js:1 Warning: Each child in a list should have a unique "key" prop.`

Having an array of elements without a `key` property creates a warning shown above.

**Read more about the `key` property:**

- https://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/
- https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js/43892905#43892905

The fix is to add a unique id as key in the array of Todo items.

```javascript
  displayTodos() {
    return this.state.todos.map(todo => {
      const setTodo = this.createSetTodo(todo);
      const deleteTodo = () => this.createDeleteTodo(todo);

      return (
        <TodoItem
          key={todo.id}
          name={todo.name}
          isDone={todo.isDone}
          setTodo={setTodo}
          deleteTodo={deleteTodo}
        />
      );
    });
  }
```

Currently, the `displayTodos` function is long. We can try to shorten the logic by moving the creating of the `setTodo` and `deleteTodo` to a separate function

```javascript
createSetTodo(todo) {
    return isDone => {
      const currentTodo = this.state.todos.filter(
        todoToFilter => todoToFilter.id === todo.id,
      )[0];
      currentTodo.isDone = isDone;
      this.setState({ todos: [...this.state.todos] });
    };
  }

createDeleteTodo(todo) {
  return () => {
    const todosWithoutItem = this.state.todos.filter(
      todoToFilter => todoToFilter.id !== todo.id,
    );
    this.setState({ todos: [...todosWithoutItem] });
  };
}

displayTodos() {
  return this.state.todos.map(todo => {
    const setTodo = this.createSetTodo(todo);
    const deleteTodo = this.createDeleteTodo(todo);

    return (
      <TodoItem
        key={todo.id}
        name={todo.name}
        isDone={todo.isDone}
        setTodo={setTodo}
        deleteTodo={deleteTodo}
      />
    );
  });
}
```

Our code looks much more readable now. However, notice how we're creating and passing in a new instance of `setTodo` / `deleteTodo` function into _every_ iteration of `<TodoItem/>`. **Can you think of a better way to structure the code?** (Hint: Make use of the `id` of each TodoItem)

## Exercise

1. Improve the UI of your todo list.
2. Add a prop that takes in the title of the todo list and display it as the title.
3. Add an input box and a button to create a new todo list.
4. Try implementing the same todo list, but with React hooks. Refer to this repo if you need to: https://github.com/sabrina-tw/todo-list-hooks
5. Add RTL tests!
