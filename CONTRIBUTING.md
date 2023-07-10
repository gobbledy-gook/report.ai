# Contributing

**We appreciate all kinds of help, so thank you!**

## Contributing to PurpleCaffeine

Specific details for contributing to this project are outlined below.

### Reporting Bugs and Requesting Features

Users are encouraged to use GitHub Issues for reporting issues and requesting features.

### Ask/Answer Questions and Discuss Quantum Prototype Template

Users are encouraged to use GitHub Discussions for engaging with researchers, developers, and other users regarding this project and the provided examples.

### Project Code Style

Code in this repository should conform to PEP8 standards. Style/lint checks are run to validate this. Line length must be limited to no more than 88 characters.

All the Javascript code must confirm to [Standard](https://standardjs.com/rules.html) Js styling

### Pull Request Checklist

When submitting a pull request and you feel it is ready for review,
please ensure that:

1. The code follows the _code style_ of this project and successfully
   passes the _unit tests_. This project uses [Pylint](https://www.pylint.org) and
   Black style guidelines.

   You can run
   ```shell script
   black .
   ```
   from the root of the repository clone for lint conformance checks.
2. To Check the Code style of Javascript, test usign ESLint standard
   you can run
   ```shell
   npx eslint .
   ```

### Tox commands available
- To Fix the black violation <code> black <PATH_FILE_YOU_WANT_TO_FIX> </code>
- To Fix the some of the ESLint violations <code> npx eslint . --fix <PATH_FILE_YOU_WANT_TO_FIX> </code>
