import React, { Component } from "react";
import { MDBNotification } from "mdbreact";

class Toast extends Component {
  render() {
    return (
      <MDBNotification
        show
        fade
        title="Bootstrap"
        message="Hello, world! This is a toast message."
        text="11 mins ago"
        style={{
          position: "absolute",
          top: 0,
          right: 0
        }}
      />
    )
  }
};

export default Toast;