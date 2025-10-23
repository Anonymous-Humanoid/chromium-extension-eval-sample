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
- A script will be run in that page, followed by the extension's service worker
- The output will be displayed across the website's developer console
  and the extension's service worker console.

## This is scary, what's it gonna do?

Nothing. Yes, the `debugger` permission gives it access to do *a lot*,
but this demo only makes use of one of its many powerful APIs.
In short, it prints out numerous strings using different methods. Under
the hood, it attaches a debugger and evaluates a stringified test script
that uses `console.log`, `Promise` and `eval`, among other tests.
The functional part of the extension is in [`background.js`](./background.js),
so I implore you to not trust me and view the source yourself.

This extension is highly capable, with some limitations:

- Running `eval` in web pages where its CSP restricts or prevents it entirely.
  This isn't possible in extension pages.
- Using extension APIs in extension pages.

Try modifying the stringified script, test its capabilities for yourself.

## Why do this?

This project showed I can take an idea- one that might not even be possible-
and make it into reality. This required reading the Chromium API docs and
the DevTools protocol docs to find a way to execute this idea.
Needless to say, this was just a fun project to work on.
**So please don't be funny and use it in production**.
