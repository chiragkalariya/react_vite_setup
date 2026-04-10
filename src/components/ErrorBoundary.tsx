import { Component, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error('Captured by ErrorBoundary', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="glass-card p-6 text-sm text-red-100">
            Something went wrong. Please reload the section.
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
