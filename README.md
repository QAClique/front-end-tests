# front-end-tests

## Getting Started

This is a simplified set of Front End tests used in the "Stop Testing End to End" Presentation. It requires the demo Web App from <https://github.com/QAClique/demo-webapp>. This project includes examples using two popular testing frameworks:

- **[Webdriver.io](https://webdriver.io)** - WebDriver-based E2E testing framework
- **[Playwright](https://playwright.dev)** - Modern browser automation library

To run the tests you need to install [Node.js](https://nodejs.org/en). Use the latest LTS version, but anything newer will work as well.

## Project Structure

Each framework is completely independent with its own dependencies and configuration:

```
wdio/
  pages/           - Webdriver.io page objects
  tests/           - Webdriver.io test specs
  wdio.conf.js     - Webdriver.io configuration
  package.json     - Webdriver.io dependencies

playwright/
  pages/           - Playwright page objects
  tests/           - Playwright test specs
  playwright.config.js - Playwright configuration
  package.json     - Playwright dependencies
```

## Installation

Clone the repository and install dependencies for your chosen framework:

### Webdriver.IO Installation

```bash
npm run install:wdio
```

### Playwright Installation

```bash
npm run install:playwright
```

## Executing the Tests

Google Chrome is used as the default browser, but you can change this through setting the
`BROWSER` environment variable to `firefox` or other.

### Webdriver.io

Run all tests:

```bash
npm run test:wdio
```

Run a single test file:

```bash
npm run test:wdio:single -- wdio/tests/apiSort.spec.js
```

Or navigate to the wdio folder and run directly:

```bash
cd wdio
npm test
npm run test:single -- wdio/tests/apiSort.spec.js
```

Or use wdio CLI directly:

```bash
cd wdio
npx wdio wdio.conf.js --spec tests/apiSort.spec.js
npx wdio wdio.conf.js  # to run all tests
```

### Playwright

Run all tests:

```bash
npm run test:playwright
```

Run tests matching a pattern:

```bash
npm run test:playwright:single -- "API Sort"
```

Run tests in interactive UI mode:

```bash
npm run test:playwright:ui
```

Or navigate to the playwright folder and run directly:

```bash
cd playwright
npm test
npm run test:single -- "API Sort"
npm run test:ui
```

View HTML test results:

```bash
cd playwright
npx playwright show-report
```

## Browser Configuration

Both frameworks default to Chrome. You can change the browser by setting the `BROWSER`
environment variable:

### Webdriver.io Configuration

```bash
cd wdio
BROWSER=firefox npm test
```

Supported browsers: chrome (default), firefox, edge, safari

### Playwright Configuration

```bash
cd playwright
BROWSER=firefox npm test
```

Supported browsers: chromium (default), firefox, webkit
