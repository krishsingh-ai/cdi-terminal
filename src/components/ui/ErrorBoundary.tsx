import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AuX Terminal uncaught error captured by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-[#09090B] text-[#111827] dark:text-[#F9FAFB]">
          <div className="w-full max-w-md p-8 rounded-2xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] shadow-sm text-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/50 flex items-center justify-center mx-auto text-red-600 dark:text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB]">
                Something went wrong.
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The AuX Terminal encountered an unexpected error. Please reload the page to continue.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-zinc-100/70 dark:bg-zinc-900/60 text-left overflow-x-auto">
                <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 line-clamp-3">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-[#3B82F6] dark:text-white dark:hover:bg-[#2563eb] transition-colors cursor-pointer shadow-sm select-none"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
