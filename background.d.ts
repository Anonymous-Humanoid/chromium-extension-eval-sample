import { Protocol } from 'devtools-protocol';

export interface ExecutionResult {
    /** Evaluation result. */
    result: Protocol.Runtime.RemoteObject;

    /** Exception details. */
    exceptionDetails?: Protocol.Runtime.ExceptionDetails;
}
