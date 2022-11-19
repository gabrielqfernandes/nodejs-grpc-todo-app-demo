const uuid = require('uuid');
const moment = require('moment-timezone');
const db = require('./mocks/todos.json');

module.exports = {
  ListToDos(_call, callback) {
    callback(null, {tasks: db});
  },
  AddToDo(call, callback) {
    const {title, description, due_date} = call.request;

    db.push({
      id: uuid.v4(),
      title,
      description,
      due_date,
      done: false,
      created_at: moment().tz('America/Sao_Paulo').format(),
    });

    callback(null, {tasks: db});
  },
  MarkAsDone(call, callback) {
    const task_idx = db.findIndex((task) => task.id == call.request.task_id);

    if (task_idx > -1) db[task_idx].done = true;

    callback(null, {task: db[task_idx]});
  },
};
