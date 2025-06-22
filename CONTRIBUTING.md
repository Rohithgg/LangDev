# Contributing to LangDev

First off, thank you for considering contributing to LangDev! It's people like you that make LangDev such a great tool for developers.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for LangDev. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

* **Use the GitHub issue search** — check if the issue has already been reported.
* **Check if the issue has been fixed** — try to reproduce it using the latest `main` branch in the repository.
* **Isolate the problem** — create a reduced test case and a step-by-step demo.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for LangDev, including completely new features and minor improvements to existing functionality.

* **Use the GitHub issue search** to see if the enhancement has already been suggested.
* **Determine which repository the enhancement should be suggested in**.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most LangDev users.

### Adding New Programming Languages

If you'd like to add a new programming language to LangDev:

1. Check if the language is already being tracked in an issue or has been requested.
2. Create a new issue proposing the addition of the language if one doesn't exist.
3. Add the language to the `languages.ts` file in the `/src/data/` directory.
4. Also add the shell command for that language.
4. Follow the existing format for language objects.
5. Ensure you provide comprehensive installation instructions for all major platforms.

### Your First Code Contribution

Unsure where to begin contributing to LangDev? You can start by looking through 'beginner' and 'help-wanted' issues:

* [Beginner issues](https://github.com/yourusername/langdev/labels/beginner) - issues that should only require a few lines of code.
* [Help wanted issues](https://github.com/yourusername/langdev/labels/help%20wanted) - issues that should be a bit more involved than beginner issues.

### Pull Requests

* Fill in the required PR template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the [TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/style-guide.html) and [React](https://reactjs.org/docs/code-style.html) styleguides
* Include thoughtful comments in your code
* End all files with a newline
* Avoid platform-dependent code

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies
    * 👕 `:shirt:` when removing linter warnings

### TypeScript Styleguide

All TypeScript code is linted with ESLint using the project's ESLint configuration.

### Documentation Styleguide

* Use [Markdown](https://daringfireball.net/projects/markdown/) for documentation.
* Reference language-specific guides (such as [MDN](https://developer.mozilla.org/) for JavaScript) when documenting code APIs.

## Thank You!

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to contribute.
