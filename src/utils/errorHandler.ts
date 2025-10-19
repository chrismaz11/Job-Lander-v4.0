export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
  userId?: string;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errors: AppError[] = [];

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  logError(error: AppError): void {
    this.errors.push(error);
    console.error(`[${error.timestamp}] ${error.code}: ${error.message}`, error.details);
    
    // Send to monitoring service in production
    if (import.meta.env.PROD) {
      this.sendToMonitoring(error);
    }
  }

  createError(code: string, message: string, details?: unknown): AppError {
    return {
      code,
      message,
      details,
      timestamp: new Date().toISOString(),
      userId: this.getCurrentUserId()
    };
  }

  private getCurrentUserId(): string | undefined {
    // Get from auth context or localStorage
    return localStorage.getItem('userId') || undefined;
  }

  private async sendToMonitoring(error: AppError): Promise<void> {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error)
      });
    } catch (e) {
      console.error('Failed to send error to monitoring:', e);
    }
  }

  getRecentErrors(limit = 10): AppError[] {
    return this.errors.slice(-limit);
  }
}

export const errorHandler = ErrorHandler.getInstance();
