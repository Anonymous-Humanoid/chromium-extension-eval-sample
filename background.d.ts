import { type RemoteObject, type ExceptionDetails } from './debugger.d.ts';

export interface ExecutionResult {
    /** Evaluation result. */
    result: RemoteObject;

    /** Exception details. */
    exceptionDetails?: ExceptionDetails;
}
