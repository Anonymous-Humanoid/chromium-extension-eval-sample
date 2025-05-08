// Incomplete type documentation extracted from:
// https://chromedevtools.github.io/devtools-protocol/tot/Runtime

type Integer = number;

/** Primitive value which cannot be JSON-stringified. Includes values `-0`, `NaN`, `Infinity`, `-Infinity`, and `bigint` literals. */
export type UnserializableValue = string;

/** Represents deep serialized value. */
export interface DeepSerializedValue {
    type: 'undefined' | 'null' | 'string' | 'number' | 'boolean' | 'bigint' | 'regexp' | 'date' | 'symbol' | 'array' | 'object' | 'function' | 'map' | 'set' | 'weakmap' | 'weakset' | 'error' | 'proxy' | 'promise' | 'typedarray' | 'arraybuffer' | 'node' | 'window' | 'generator'
    
    value?: any;

    objectId?: string;

    /** Set if value reference met more then once during serialization. In such case, value is provided only to one of the serialized values. Unique per value in the scope of one CDP call. */
    weakLocalObjectReference?: Integer;
}

/** Unique object identifier. */
export type RemoteObjectId = string;

/**
 * @experimental This may be changed, moved or removed
 */
export type PropertyPreview = {
    /** Property name. */
    name: string;

    /** User-friendly property value string. */
    value?: string;

    /** Nested value preview. */
    valuePreview?: ObjectPreview;
} & ({
    /** Object type. Accessor means that the property itself is an accessor property. */
    type: 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol' | 'accessor' | 'bigint';

    /** Object subtype hint. Specified for `object` type values only. */
    subtype?: undefined;
} | {
    /** Object type. Accessor means that the property itself is an accessor property. */
    type: 'object';

    /** Object subtype hint. Specified for `object` type values only. */
    subtype: 'array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error' | 'proxy' | 'promise' | 'typedarray' | 'arraybuffer' | 'dataview' | 'webassemblymemory' | 'wasmvalue';
});

/**
 * @experimental This may be changed, moved or removed
 */
export interface EntryPreview {
    /** Preview of the key. Specified for map-like collection entries. */
    key?: ObjectPreview;

    /** Preview of the value. */
    value: ObjectPreview;
}

/**
 * Object containing abbreviated remote object value.
 * @experimental This may be changed, moved or removed
 */
export type ObjectPreview = {
    /** String representation of the object. */
    description?: string;

    /** True iff some of the properties or entries of the original object did not fit. */
    overflow: boolean;

    /** List of the properties. */
    properties: PropertyPreview[];
} & ({
    /** Object type. */
    type: 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol' | 'bigint';

    /** Object subtype hint. Specified for `object` type values only. */
    subtype?: undefined;
    
    /** List of the entries. Specified for `map` and `set` subtype values only. */
    entries?: undefined;
} | {
    /** Object type. */
    type: 'object';

    /** Object subtype hint. Specified for `object` type values only. */
    subtype: 'array' | 'null' | 'node' | 'regexp' | 'date' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error' | 'proxy' | 'promise' | 'typedarray' | 'arraybuffer' | 'dataview' | 'webassemblymemory' | 'wasmvalue';
    
    /** List of the entries. Specified for `map` and `set` subtype values only. */
    entries?: undefined;
} | {
    /** Object type. */
    type: 'object';

    /** Object subtype hint. Specified for `object` type values only. */
    subtype: 'map' | 'set';
    
    /** List of the entries. Specified for `map` and `set` subtype values only. */
    entries: EntryPreview[];
});

/**
 * @experimental This may be changed, moved or removed
 */
export interface CustomPreview {
    /** The JSON-stringified result of formatter.header(object, config) call. It contains json ML array that represents RemoteObject. */
    header: string;

    /** If formatter returns true as a result of formatter.hasBody call then bodyGetterId will contain RemoteObjectId for the function that returns result of formatter.body(object, config) call. The result value is json ML array. */
    bodyGetterId?: RemoteObjectId;
}

/** Mirror object referencing original JavaScript object. */
export type RemoteObject = {
    /** Remote object value in case of primitive values or JSON values (if it was requested). */
    value?: any;

    /** Primitive value which can not be JSON-stringified does not have value, but gets this property. */
    unserializableValue?: UnserializableValue;

    /** String representation of the object. */
    description?: string;

    /**
     * Deep serialized value.
     * @experimental This may be changed, moved or removed
     */
    deepSerializedValue?: DeepSerializedValue;

    /** Unique object identifier (for non-primitive values). */
    objectId?: RemoteObjectId;

    /**
     * @experimental This may be changed, moved or removed
     */
    customPreview?: CustomPreview;
} & ({
    /** Object type. */
    type: 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol' | 'bigint';
    
    /** Object subtype hint. Specified for `object` type values only. NOTE: If you change anything here, make sure to also update `subtype` in `ObjectPreview` and `PropertyPreview`. */
    subtype?: undefined;
    
    /** Object class (constructor) name. Specified for `object` type values only. */
    className?: undefined;

    /**
     * Preview containing abbreviated property values. Specified for object type values only.
     * @experimental This may be changed, moved or removed
     */
    preview?: undefined;
} | {
    /** Object type. */
    type: 'object';
    
    /** Object subtype hint. Specified for `object` type values only. NOTE: If you change anything here, make sure to also update `subtype` in `ObjectPreview` and `PropertyPreview`. */
    subtype: 'array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error' | 'proxy' | 'promise' | 'typedarray' | 'arraybuffer' | 'dataview' | 'webassemblymemory' | 'wasmvalue';
    
    /** Object class (constructor) name. Specified for `object` type values only. */
    className: string;

    /**
     * Preview containing abbreviated property values. Specified for object type values only.
     * @experimental This may be changed, moved or removed
     */
    preview: ObjectPreview;
});

/** Unique script identifier. */
export type ScriptId = string;

/** Stack entry for runtime errors and assertions. */
export interface CallFrame {
    /** JavaScript function name. */
    functionName: string;

    /** JavaScript script id. */
    scriptId: ScriptId;

    /** JavaScript script name or url. */
    url: string;
    
    /** JavaScript script line number (0-based). */
    lineNumber: number;

    /** JavaScript script column number (0-based). */
    columnNumber: number;
}

/**
 * Unique identifier of current debugger.
 * @experimental This may be changed, moved or removed
 */
export type UniqueDebuggerId = string;

/**
 * If `debuggerId` is set stack trace comes from another debugger and can be resolved there. This allows to track cross-debugger calls. See `Runtime.StackTrace` and `Debugger.paused` for usages.
 * @experimental This may be changed, moved or removed
 */
export interface StackTraceId {
    id: string;

    debuggerId?: UniqueDebuggerId;
}

/** Call frames for assertions or error messages. */
export interface StackTrace {
    /** String label of this stack trace. For async traces this may be a name of the function that initiated the async call. */
    description?: string;

    /** JavaScript function name. */
    callFrames: CallFrame[];

    /** Asynchronous JavaScript stack trace that preceded this stack, if available. */
    parent?: StackTrace;

    /**
     * Asynchronous JavaScript stack trace that preceded this stack, if available.
     * @experimental This may be changed, moved or removed
     */
    parentId?: StackTraceId;
}

/** Detailed information about exception (or error) that was thrown during script compilation or execution. */
export interface ExceptionDetails {
    /** Exception id. */
    exceptionId: Integer;

    /** Exception text, which should be used together with exception object when available. */
    text: string;

    /** Line number of the exception location (0-based). */
    lineNumber: Integer;

    /** Column number of the exception location (0-based). */
    columnNumber: Integer;

    /** Script ID of the exception location. */
    scriptId?: ScriptId;

    /** URL of the exception location, to be used when the script was not reported. */
    url?: string;

    /** JavaScript stack trace if available. */
    stackTrace?: StackTrace;

    /** Exception object if available. */
    exception?: RemoteObject;

    /** Identifier of the context where exception happened. */
    executionContextId?: ExecutionContextId;
    
    /**
     * Dictionary with entries of meta data that the client associated with this exception, such as information about associated network requests, etc.
     * @experimental This may be changed, moved or removed
     */
    exceptionMetaData?: object;
}

/** Id of an execution context. */
export type ExecutionContextId = Integer;

/** Number of milliseconds. */
export type TimeDelta = number;

/** Represents options for serialization. Overrides `generatePreview` and `returnByValue`. */
export type SerializationOptions = {
    /** Embedder-specific parameters. For example if connected to V8 in Chrome these control DOM serialization via `maxNodeDepth: integer` and `includeShadowTree: "none" | "open" | "all"`. Values can be only of type string or integer. */
    additionalParameters?: Record<any, string | Integer>[];
} & ({
    serialization: 'json' | 'idOnly';

    /** Deep serialization depth. Default is full depth. Respected only in `deep` serialization mode. */
    maxDepth?: undefined;
} | {
    serialization: 'deep';

    /** Deep serialization depth. Default is full depth. Respected only in `deep` serialization mode. */
    maxDepth: Integer;
});

// /**
//  * Evaluates expression on global object.
//  * @param {string} expression Expression to evaluate.
//  * @param {string | undefined} objectGroup Symbolic group name that can be used to release multiple objects.
//  * @param {boolean | undefined} includeCommandLineAPI Determines whether Command Line API should be available during the evaluation.
//  * @param {boolean | undefined} silent In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides `setPauseOnException` state.
//  * @param {ExecutionContextId} contextId Specifies in which execution context to perform evaluation. If the parameter is omitted the evaluation will be performed in the context of the inspected page. This is mutually exclusive with `uniqueContextId`, which offers an alternative way to identify the execution context that is more reliable in a multi-process environment.
//  * @param {boolean | undefined} returnByValue Whether the result is expected to be a JSON object that should be sent by value.
//  * @param {boolean | undefined} generatePreview (EXPERIMENTAL) Whether preview should be generated for the result.
//  * @param {boolean | undefined} userGesture Whether execution should be treated as initiated by user in the UI.
//  * @param {boolean | undefined} awaitPromise Whether execution should `await` for resulting value and return once awaited promise is resolved.
//  * @param {boolean | undefined} throwOnSideEffect (EXPERIMENTAL) Whether to throw an exception if side effect cannot be ruled out during evaluation. This implies `disableBreaks` below.
//  * @param {TimeDelta | undefined} timeout (EXPERIMENTAL) Terminate execution after timing out (number of milliseconds).
//  * @param {boolean | undefined} disableBreaks (EXPERIMENTAL) Disable breakpoints during execution.
//  * @param {boolean | undefined} replMode (EXPERIMENTAL) Setting this flag to true enables `let` re-declaration and top-level `await`. Note that `let` variables can only be re-declared if they originate from `replMode` themselves.
//  * @param {boolean | undefined} allowUnsafeEvalBlockedByCSP (EXPERIMENTAL) The Content Security Policy (CSP) for the target might block 'unsafe-eval' which includes eval(), Function(), setTimeout() and setInterval() when called with non-callable arguments. This flag bypasses CSP for this evaluation and allows unsafe-eval. Defaults to true.
//  * @param {string | undefined} uniqueContextId (EXPERIMENTAL) An alternative way to specify the execution context to evaluate in. Compared to contextId that may be reused across processes, this is guaranteed to be system-unique, so it can be used to prevent accidental evaluation of the expression in context different than intended (e.g. as a result of navigation across process boundaries). This is mutually exclusive with `contextId`.
//  * @param {SerializationOptions | undefined} serializationOptions (EXPERIMENTAL) Specifies the result serialization. If provided, overrides `generatePreview` and `returnByValue`.
//  * @returns {{ result: RemoteObject; exceptionDetails?: ExceptionDetails; }}
//  */
// declare function evaluate(
//     expression: string,
//     objectGroup?: string,
//     includeCommandLineAPI?: boolean,
//     silent?: boolean,
//     contextId?: ExecutionContextId,
//     returnByValue?: boolean,
//     generatePreview?: boolean,
//     userGesture?: boolean,
//     awaitPromise?: boolean,
//     throwOnSideEffect?: boolean,
//     timeout?: TimeDelta,
//     disableBreaks?: boolean,
//     replMode?: boolean,
//     allowUnsafeEvalBlockedByCSP?: boolean = true,
//     uniqueContextId?: string,
//     serializationOptions?: SerializationOptions
// ): {
//     /** Evaluation result. */
//     result: RemoteObject;

//     /** Exception details. */
//     exceptionDetails?: ExceptionDetails;
// };
