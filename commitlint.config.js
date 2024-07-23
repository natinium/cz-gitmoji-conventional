const typeEnum = require('@commitlint/config-conventional').rules['type-enum'][2];

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(?<emoji>:\w*:\s)?(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))(?:\s\(?(?<ticket>#\d*)\)?)?$/,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject', 'ticket']
    }
  },
  plugins: [
    {
      rules: {
        'header-match-team-pattern': (parsed) => {
          const { type, subject, emoji } = parsed;
          if (type === null && subject === null && emoji === null) {
            return [false, 'commit message cannot be empty'];
          }
          return [true];
        },
        'emoji-present': (parsed) => {
          const { emoji } = parsed;
          if (emoji === null) {
            return [false, 'commit message must start with an emoji'];
          }
          return [true];
        }
      }
    }
  ],
  rules: {
    'header-match-team-pattern': [2, 'always'],
    'emoji-present': [2, 'always'],
    'type-enum': [2, 'always', typeEnum],
    'type-empty': [0],
    'subject-empty': [0]
  }
};