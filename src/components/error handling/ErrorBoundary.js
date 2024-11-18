import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      this.props.history.push("/error");
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return null;
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
