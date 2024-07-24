module.exports = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: {
      parserOpts: {
        headerPattern: /^(:\w*:)?\s?(\w*)(?:\((.*)\))?!?: (.*)$/,
        headerCorrespondence: ['emoji', 'type', 'scope', 'subject']
      }
    },
    rules: {
      'type-empty': [2, 'never'],
      'subject-empty': [2, 'never'],   
      "body-max-line-length": [0]
    }
  };