import formatTodosForAI from "./formatTodosForAI";
import localSuggestion from "./localSuggestion";

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAI(board);

  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });

  let GPTdata: string = "";
  if (res.status == 500) {
    GPTdata = localSuggestion(todos);
  } else {
    GPTdata = await res.json();
  }

  return GPTdata;
};
export default fetchSuggestion;
