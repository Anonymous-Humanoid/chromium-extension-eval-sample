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

    let result = /** @type ExecutionResult */ (await chrome.debugger.sendCommand(
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

    return result;
}

const testScript = `// Test script
'use-strict';

// Global variable (works with var/let/const)
var globalVar = 'Excelsior!';

const inExtension = chrome.runtime?.getURL != null;

if (inExtension) {
    console.log('Used extension API:', chrome.runtime.getURL('manifest.json'));
}
else {
    // Can't access extension APIs in web pages
    console.log("Couldn't use extension APIs");
}

// This is the last statement, so its value will be returned
new Promise(
    (resolve) => {
        setTimeout(
            () => {
                const output = inExtension
                    ? (() => "Couldn't use eval")()
                    : eval('(() => "Evaluated!")()');

                console.log('Ran asynchronously!');
                resolve(output);
            },
            1000
        );
    }
);
`;

/**
 * Asserts that the test script ran in the main world by checking
 * that a variable it created in the global scope exists
 */
function globalScopeTest() {
    console.log(
        `Are script variables defined in the global scope?`,
        // @ts-expect-error Variable is defined in the test script
        typeof globalVar === 'undefined'
            ? "No, variable missing from global scope"
            : "Yes, test script ran in the main world"
    );
}

// Initializing extension popup
chrome.action.onClicked.addListener(async (tab) => {
    const availTargets = await chrome.debugger.getTargets();
    const extTarget = availTargets.find((info) =>
        info.url === chrome.runtime.getURL('background.js'));

    // Only attaching if we can attach to the tab AND the extension SW
    if (tab.id != null && extTarget?.id != null) {
        const targets = /** @type [string, chrome.debugger.Debuggee][] */ ([
            ['tab', { tabId: tab.id }],
            ['extension', { targetId: extTarget.id }]
        ]);

        console.log(testScript);

        for (const [type, target] of targets) {
            console.log(`Running in ${type}...`);

            const response = await execute(target, testScript);

            if (response.exceptionDetails == null) {
                console.log(response.result.type, `result:`, response.result.value);
            }
            else {
                console.error('Caught exception:', response.exceptionDetails);
            }

            console.debug('Full response details:', response);
            console.log('Done!');
        }

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: globalScopeTest,
            world: 'MAIN'
        });

        globalScopeTest();
    }
});
