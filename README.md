# front-end-tests

## Getting Started

This is a simplified set of Front End tests used in the "Stop Testing End to End" Presentation. It requires the demo Web App from <https://github.com/QAClique/demo-webapp>. It is based on [Webdriver.io](https://webdriver.io). To run the tests you need to install [Node.js](https://nodejs.org/en). Use the latest LTS version, but anything newer will work as well.

Clone the repository on your computer and in the new repo folder, do `npm install`

Google Chrome is used as the default browser used in the tests, but you can change this through setting the `BROWSER` environment variable to `firefox` or other.

### Executing the tests

From the command-line do the following:

```bash
npx wdio --spec <test file goes here, example: tests/apiSort.spec.js>
```

To run all test, just do `npx wdio`
