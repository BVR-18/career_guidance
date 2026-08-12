import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "2rem",
            background: "var(--bg, #0f0f1a)",
            color: "var(--text, #e0e0ff)",
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>
            Something went wrong
          </h1>
          <p style={{ opacity: 0.7, maxWidth: 480 }}>
            {this.state.error?.message ?? "An unexpected error occurred."}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              marginTop: "1rem",
              padding: "0.6rem 1.6rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "linear-gradient(135deg, #6c63ff, #48c6ef)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
