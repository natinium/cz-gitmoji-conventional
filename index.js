const conventionalCommit = require('cz-conventional-changelog');
const config = require('./cz-config');

module.exports = {
  prompter: (cz, commit) => {
    // Override the 'list' type to include emojis
    cz.prompt = ((oldPrompt) => (questions, ...args) => {
      questions = questions.map(q => {
        if (q.name === 'type') {
          q.choices = config.types.map(type => ({
            name: type.name,
            value: type.value
          }));
        }
        return q;
      });
      return oldPrompt.call(this, questions, ...args);
    })(cz.prompt);

    conventionalCommit.prompter(cz, (commitMessage) => {
      // Split the commit message into its components
      const lines = commitMessage.split('\n');
      const firstLine = lines[0];
      const rest = lines.slice(1).join('\n');

      // Extract type, scope, and subject from the first line
      const matchResult = firstLine.match(/^(\w+)(\(.*?\))?: (.+)/);
      if (matchResult) {
        const [, type, scope, subject] = matchResult;
        const emoji = config.types.find(t => t.value === type)?.emoji || '';
        
        // Construct the new first line with emoji
        const newFirstLine = `${emoji} ${type}${scope || ''}: ${subject}`;
        
        // Combine the new first line with the rest of the commit message
        const newMessage = `${newFirstLine}\n${rest}`;
        commit(newMessage);
      } else {
        // If the parsing fails, use the original message
        commit(commitMessage);
      }
    });
  }
};