const conventionalCommit = require('cz-conventional-changelog');
const gitmojis = require('gitmojis').gitmojis;

const typeToEmojiMap = {
  feat: '✨',
  fix: '🐛',
  docs: '📚',
  style: '💎',
  refactor: '📦',
  perf: '🚀',
  test: '🚨',
  chore: '🔧',
  revert: '⏪',
};

function getEmojiForType(type) {
  return typeToEmojiMap[type] || '🎨';
}

module.exports = {
  prompter: (cz, commit) => {
    conventionalCommit.prompter(cz, (commitMessage) => {
      const match = commitMessage.match(/^(\w+)(\(.+\))?:/);
      if (match) {
        const type = match[1];
        const emoji = getEmojiForType(type);
        commitMessage = `${emoji} ${commitMessage}`;
      }
      commit(commitMessage);
    });
  },
  commitlint: require('./commitlint.config')
};