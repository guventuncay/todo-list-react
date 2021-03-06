import React from "react";
import TodoForm from "./TodoForm";
import Task from "./Task";
import "bootstrap/dist/css/bootstrap.css";

export default class TodoList extends React.Component {
  state = {
    tasks: [],
    selected: "all",
    toggleAllComplete: true,
  };

  addNewTask = (newTask) => {
    this.setState({
      tasks: [newTask, ...this.state.tasks],
    });
  };

  toggleComplete = (id) => {
    this.setState((state) => ({
      tasks: this.state.tasks.map((task) => {
        // update target task
        if (task.id === id) {
          return {
            // copy all stuff, then change complete
            ...task,
            complete: !task.complete,
          };
        }
        return task;
      }),
    }));
  };

  toggleRadio = (event) => {
    this.setState({ selected: event.target.value }, this.showByComplete);
  };

  handleDelete = (id) => {
    this.setState({ tasks: this.state.tasks.filter((task) => task.id !== id) });
  };

  handleDeleteAllComplated = () => {
    this.setState({ tasks: this.state.tasks.filter((task) => !task.complete) });
  };

  toggleAllComplete = () => {
    this.setState((state) => ({
      tasks: this.state.tasks.map((task) => ({
        ...task,
        complete: this.state.toggleAllComplete,
      })),
      toggleAllComplete: !this.state.toggleAllComplete,
    }));
  };

  //boş task eklenebiliyo ona bakcam
  render() {
    let tasks = [];

    if (this.state.selected === "all") tasks = this.state.tasks;
    else if (this.state.selected === "active")
      tasks = this.state.tasks.filter((task) => !task.complete);
    else tasks = this.state.tasks.filter((task) => task.complete);

    return (
      <div className="container">
        <h1>
          <span className="badge badge-info">To-Do List</span>
        </h1>
        <TodoForm onSubmit={this.addNewTask} />
        <h4>
          <div className="badge badge-info">Tasks:</div>
        </h4>
        <div
          className="input-group input-group mb-3"
          style={{ justifyContent: "center" }}
        >
          <div className="input-group-prepend">
            <div className="input-group-text" onChange={this.toggleRadio}>
              <input type="radio" id="active" name="complate" value="active" />
              Active
              <input type="radio" id="done" name="complate" value="done" />
              Done
              <input
                type="radio"
                id="all"
                name="complate"
                value="all"
                defaultChecked
              />
              All
            </div>
          </div>
        </div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleComplete={() => this.toggleComplete(task.id)}
            onDelete={() => this.handleDelete(task.id)}
          />
        ))}
        <hr />
        <h4>
          <div className="badge badge-success">
            Count of active tasks:
            {this.state.tasks.filter((task) => task.complete === false).length}
          </div>
        </h4>
        <div>
          <button className="btn" onClick={this.toggleAllComplete}>
            {this.state.toggleAllComplete ? (
              <div className="btn btn-primary">Toggle all done</div>
            ) : (
              <div className="btn btn-success">Toggle all active</div>
            )}
          </button>
        </div>
        <div
          style={
            this.state.tasks.some((task) => task.complete)
              ? { display: "" }
              : { display: "none" }
          }
        >
          <button
            className="btn btn-danger"
            onClick={this.handleDeleteAllComplated}
          >
            Delete all complated tasks
          </button>
        </div>
      </div>
    );
  }
}
