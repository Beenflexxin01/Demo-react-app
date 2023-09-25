import { useState } from "react";

const initialList = [];

function Button({ children, onClick }) {
  return (
    <button className="btn-remove btn clear-btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [todoList, setTodoList] = useState(initialList);

  // return (

  // );

  function handleNewList(newLists) {
    setTodoList((newTodo) => [...newTodo, newLists]);
  }

  function handleDelete(id) {
    return setTodoList((lists) =>
      lists.filter((filteredList) => filteredList.id !== id)
    );
  }

  function handleLiineThrough(id) {
    return setTodoList((doneTasks) =>
      doneTasks.map((tasks) =>
        tasks.id === id ? { ...tasks, newTask: !tasks.newTask } : tasks
      )
    );
  }

  function handleClearLists() {
    const confirmed = window.confirm(
      `Are you sure you completed today's task and would love to clear the list?`
    );
    if (confirmed) setTodoList([]);
  }

  return (
    <div>
      <Title />

      <Schedule />

      <FormAddList onNewList={handleNewList} />

      <TodoList
        todoList={todoList}
        onDeleteList={handleDelete}
        onClearList={handleClearLists}
        onHandleLineThrough={handleLiineThrough}
      />

      <Footer todoList={todoList} />
    </div>
  );
}

function Title() {
  return (
    <div className="container">
      <h1 className="primary-header">My Todo App List</h1>
    </div>
  );
}

function Schedule() {
  const id = Date();
  // const id = Date.prototype.getFullYear();

  return (
    <div className="container">
      <p className="footer-description">
        Tasks to be accomplished and scheduled for {id}
      </p>
    </div>
  );
}

function FormAddList({ onNewList }) {
  const [title, setTitle] = useState("");

  function handleSaveList(e) {
    e.preventDefault();

    if (!title) return;

    const id = crypto.randomUUID();

    const newList = { title, id: id };

    console.log(newList);
    onNewList(newList);

    setTitle("");
  }

  return (
    <div className="container align-center">
      <form onSubmit={handleSaveList}>
        <div className="btn-flex">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Start creating...."/>
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
}

function TodoList({
  todoList,
  onDeleteList,
  onHandleLineThrough,
  onClearList,
}) {
  return (
    <div>
      {todoList.map(function (lists) {
        return (
          <MainList
            lists={lists}
            onDeleteList={onDeleteList}
            key={lists.id}
            onHandleLineThrough={onHandleLineThrough}
          />
        );
      })}
      <Button onClick={onClearList}>Clear Lists</Button>
    </div>
  );
}

function MainList({ lists, onDeleteList, onHandleLineThrough }) {
  return (
    <div className="container align-center">
      <div className="main">
        <input type="checkbox" onChange={() => onHandleLineThrough(lists.id)} />
        <span
          className="text-description"
          style={
            lists.newTask
              ? { color: "red", fontWeight: "bold", opacity: "50%" }
              : {}
          }
        >
          {lists.title}
        </span>
        <Button onClick={() => onDeleteList(lists.id)}>remove</Button>
      </div>
    </div>
  );
}

function Footer({ todoList }) {
  const taskNum = todoList.length;
  const taskDone = todoList.filter((lists) => lists.newTask).length;
  return (
    <div className="footer">
      <p className="footer-description">
        You have {taskNum} tasks out of which you've done {taskDone} number of
        tasks on your list. You can do more 😊
      </p>
    </div>
  );
}
