/** @import { type ExecutionResult } from './background.d.ts'; */

/**
 * Performs unsafe execution of the provided inline script.
 * @param {chrome.debugger.Debuggee} target 
 * @param {string} script
 * @returns {Promise<ExecutionResult>}
 */
async function execute(target, script) {
    const DEBUGGER_VERSION = '1.3';

    await chrome.debugger.attach(target, DEBUGGER_VERSION);

    const RESULT = /** @type ExecutionResult */ (await chrome.debugger.sendCommand(
        target,
        'Runtime.evaluate',
        {
            allowUnsafeEvalBlockedByCSP: true,
            awaitPromise: true,
            expression: script,
            returnByValue: true,
            userGesture: true,
        }
    ));

    await chrome.debugger.detach(target);

    return RESULT;
}

const TEST_SCRIPT = `
    console.log('Logged!');
    alert('Alerted!');

    // This is the last statement, so its value will be returned
    new Promise(
        (resolve) => {
            setTimeout(
                () => {
                    const OUTPUT = eval('(() => "Evaluated!")()');
                    
                    console.log('Waited!');
                    resolve(OUTPUT);
                },
                1000
            );
        }
    );
`;

// Initializing extension functionality
chrome.action.onClicked.addListener((tab) => {
    const TAB_ID = tab.id;

    console.log(`Checking... (Is ${TAB_ID} nullish?)`);

    if (TAB_ID != null) {
        const TARGET = { tabId: TAB_ID };

        console.log(`Running test script:\n${TEST_SCRIPT}`);

        execute(TARGET, TEST_SCRIPT).then((response) => {
            if (response.exceptionDetails == null) {
                console.log(response.result.type, `result:`, response.result.value);
            }
            else {
                console.error('Caught exception:', response.exceptionDetails);
            }

            console.log('Full response details:', response);
        });
    }
});
