import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps: ", prevProps);
    console.log("prevState: ", prevState);
  }

  componentWillUnmount() {
    console.log("Counter - Unmount");
  }

  render() {
    const {
      children,
      onIncrement,
      counter,
      onDecrement,
      onDelete
    } = this.props;
    return (
      <React.Fragment>
        {children}
        <div className="row">
          <div className="col-1">
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </div>
          <div className="col">
            <button
              onClick={() => {
                onIncrement(counter);
              }}
              className="btn btn-secondary btn-sm"
            >
              +
            </button>
            <button
              onClick={() => {
                onDecrement(counter);
              }}
              className="btn btn-danger btn-sm m-2"
              disabled={counter.value <= 0}
            >
              -
            </button>
            <button
              onClick={() => {
                onDelete(counter.id);
              }}
              className="btn btn-danger btn-sm"
            >
              X
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
