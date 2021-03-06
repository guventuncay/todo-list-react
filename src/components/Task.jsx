import React from "react";

export default (props) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <button
      className={
        props.task.complete ? "badge badge-primary" : "badge badge-success"
      }
      onClick={props.toggleComplete}
    >
      <h5>{props.task.text}</h5>
    </button>
    &nbsp;
    <button
      className="btn btn-danger"
      onClick={() => props.onDelete(props.task.id)}
    >
      x
    </button>
  </div>
);
