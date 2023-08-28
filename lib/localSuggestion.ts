const localSuggestion = (todos: any) => {
  return `Mr. Mehdi, welcome to the My Trello App! You have ${todos.todo === 0 ? "zero tasks" : todos.todo === 1 ? "only one task" : `${todos.todo} tasks`} to do, ${todos.inprogress === 0 ? "zero" : todos.inprogress === 1 ? "one" : `${todos.inprogress} tasks`} in progress and ${todos.done === 0 ? "no" : todos.done === 1 ? "one" : `${todos.done}`} done tasks. Have a productive day!`;
};

export default localSuggestion;
