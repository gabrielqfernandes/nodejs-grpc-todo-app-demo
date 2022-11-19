const db = require('./mocks/todos.json');

module.exports = {
  ListToDos(_call, callback) {
    callback(null, {tasks: db});
  },
};
