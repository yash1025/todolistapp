import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: '',
      showCompleted: false,
    };
  }

  componentDidMount() {
  }

  handleAddTodo = () => {
    if (this.state.newTodo.trim() === '') {
      return;
    }

    const newTodo = {
      title: this.state.newTodo,
      completed: false,
      id: Date.now(),
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
      newTodo: '',
    }));
  }

  handleDeleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  handleEditTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }
        return todo;
      }),
    }));
  }

  handleToggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    }));
  }

  render() {
    const { todos, newTodo, showCompleted } = this.state;

    return (
      <div>
        <h1>Todo App</h1>
        <div>
          <input
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => this.setState({ newTodo: e.target.value })}
          />
          <button onClick={this.handleAddTodo}>Add</button>
        </div>

        <div>
          <label>
            Show Completed
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => this.setState({ showCompleted: !showCompleted })}
            />
          </label>
        </div>

        <ul>
          {todos
            .filter(todo => !showCompleted || todo.completed)
            .map(todo => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.handleToggleComplete(todo.id)}
                />
                <span>{todo.title}</span>
                <button onClick={() => this.handleEditTodo(todo.id, prompt('Edit Task:', todo.title))}>Edit</button>
                <button onClick={() => this.handleDeleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;

