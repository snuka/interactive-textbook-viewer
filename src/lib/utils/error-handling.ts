/**
 * @file Base error classes and utilities for consistent error handling.
 */

/**
 * Enum for distinct error types.
 */
export enum ErrorType {
  Network = 'Network',
  DataValidation = 'DataValidation',
  Storage = 'Storage',
  Unknown = 'Unknown',
}

/**
 * Base class for custom application errors.
 *
 * @param message - The error message.
 * @param type - The category of the error, from {@link ErrorType}.
 * @param details - Optional object for additional context.
 */
export class CustomError extends Error {
  public readonly type: ErrorType;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    type: ErrorType = ErrorType.Unknown,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Logs an error to the console with structured details.
 * In a production environment, this could be sent to a logging service.
 *
 * @param error - The error to log.
 */
export const logError = (error: unknown): void => {
  if (error instanceof CustomError) {
    console.error(`[${error.type} Error]: ${error.message}`, {
      details: error.details,
      stack: error.stack,
    });
  } else if (error instanceof Error) {
    console.error(`[Generic Error]: ${error.message}`, {
      stack: error.stack,
    });
  } else {
    console.error('[Unknown Error]:', error);
  }
};
