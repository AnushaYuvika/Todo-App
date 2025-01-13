import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TodoList () {
  let[todos, setTodos] = useState([{task : "Sample Task", id: uuidv4(), isDone : "false"}]);
  let[newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    setTodos((prevTodo) => {
      return [...todos, {task: newTodo, id: uuidv4(), isDone : false}]
    });
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
  };

  let upperCaseAll = () => {
    setTodos((prevTodos) => 
      prevTodos.map((todo) => {
        return {
          ...todo, task: todo.task.toUpperCase()
        };
      })
    );
  };

  let upperCaseOne = (id) => {
    setTodos((prevTodos) => 
      prevTodos.map((todo) => {
        if(todo.id == id) {
          return {
            ...todo, task: todo.task.toUpperCase()
          };
        } else {
          return todo;
        }
      })
    );
  };

  let taskCompleted = (id) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) => {
        if(todo.id == id) {
          return {
            ...todo, isDone: !todo.isDone
          };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <>
    <input placeholder="add a task" value={newTodo} onChange={updateTodoValue}/>
    <br></br>
    <button onClick={addNewTask}>Add Task</button>
    <br></br><br></br><br></br><hr></hr>
    <h4>Task To Do</h4>
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ textDecoration: todo.isDone ? 'line-through' : 'none'}}>
          <span>{todo.task}</span>
          &nbsp; &nbsp; &nbsp; 
          <button onClick={() => taskCompleted(todo.id)}>{todo.isDone ? "Undo" : "Mark as Done"}</button>
          &nbsp;&nbsp;
          <button onClick={() => deleteTodo(todo.id)}>Delete</button> <br /><br />
          {/* <button onClick={() => upperCaseOne(todo.id)}>upperCase One</button> &nbsp; &nbsp; */}         
        </li>
      ))}
    </ul>
    <button onClick={upperCaseAll}>Upper Case</button>
    </>
  )
}