const formatTodosForAI = (board: Board) => {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;
    return map;
  }, {} as { [key in typedColumn]: Todo[] });

  // reduce to key : value lenght
  const flatArrayCounted = Object.entries(flatArray).reduce((map, [key, value]) => {
    map[key as typedColumn] = value.length;
    return map;
  }, {} as { [key in typedColumn]: number });

  return flatArrayCounted;
};

export default formatTodosForAI;
