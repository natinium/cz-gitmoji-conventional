
# cz-gitmoji-conventional

A Commitizen adapter adding emojis to conventional commit messages, with custom commitlint configuration.


## Installation

Install the package as a dev dependency in your project:

```bash
npm install --save-dev cz-gitmoji-conventional
```
or
```bash
npm install --save-dev git+https://github.com/natinium/cz-gitmoji-conventional.git
```

Add this to your `package.json`:

```json
{
  "config": {
    "commitizen": {
      "path": "cz-gitmoji-conventional"
    }
  }
}
```

## Configuration

### Basic Configuration

No additional configuration is required for basic usage. However, you can customize the commit types and their associated emojis by modifying the `types` array in the `index.js` file.

### Commitlint Configuration

This package includes a custom commitlint configuration to support emoji commits. To use it:

1. Install commitlint and the conventional config:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

2. Create a `commitlint.config.js` file in your project root with the following content:

```javascript
module.exports = {
  extends: ['./node_modules/cz-gitmoji-conventional/commitlint.config.js'],
};
```

3. Add a commit-msg hook to your project. If you're using Husky, add this to your `.husky/commit-msg` file:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

or a custom one.

## Usage

1. Stage your changes:

```bash
git add .
```

2. Commit using the Commitizen CLI:

```bash
npx cz
```

Follow the prompts to create your commit message. The resulting commit will include an appropriate emoji based on the type of change.

If you've set up the commitlint configuration and hooks, your commits will be validated against the emoji-compatible rules.

## License

MIT
