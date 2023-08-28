interface Board {
  columns: Map<typedColumn, Column>;
}

type typedColumn = "todo" | "inprogress" | "done";

interface Column {
  id: typedColumn;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: typedColumn;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}
