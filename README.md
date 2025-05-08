# Arbitrary Code Execution Within a Chrome Extension

## Warning

**Please, don't ever use this in your code.** You will most likely suffer from
cross-site scripting vulnerabilities, or worse, you'll expose the debugger API
to a malicious actor, more or less handing over your browser to them.
This is a proof of concept, and the responsibility falls on you to treat it
as such, for educational purposes.

## Usage

- Download this repository
- Install the Node.js dependencies (e.g, with `npm install`)
- Unpack this extension
- Optionally, pin the extension to the toolbar
- Go to an HTTP/HTTPS web page, such as [`example.com`](https://example.com)
- Click on the extension icon from the extension toolbar
- The output will be displayed across the website's developer console
  and the extension's service worker console.

## This is scary, what's it gonna do?

Nothing. In short, it prints out 4 strings using 4 different methods. Under
the hood, it attaches a debugger and runs a stringified test script that messes
with `console.log`, `alert`, `Promise` and `eval`. The functional part of the
extension is in [`background.js`](./background.js), so I implore you to not
trust me and view the source yourself.

More importantly, this doesn't actually allow arbitrary code execution
within a web page. The debugger API is only accessible from within the
extension itself, so even if the debugger is required to be attached to a
source, such as a web page- as is the case in this sample- this does not
override the extension's content security policy (CSP).

This sample shows that arbitrary code execution is possible within the
extension context, but not inside the website sandbox. You'll notice a
warning report in the website's developer console, complaining that `eval`
violates the CSP, and moving right along. And yet you'll see the result
of that `eval` call in the service worker console. Magic.

## Why do this?

This project showed I can take an idea- one that might not even be possible-
and make it into reality. This required reading the Chromium API docs and
translating the DevTools protocol docs. And then realizing that the latter has
[already been done](https://github.com/ChromeDevTools/devtools-protocol/blob/master/types/protocol.d.ts).
Needless to say, this was just a fun project to work on.
**So please don't be funny and use it in production**.
