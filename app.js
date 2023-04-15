import display from "./src/components/display.js"
import welcome from "./src/components/welcome.js";
import todoList from "./src/components/todoList.js";

const app = () => {
  welcome();
  display();
  todoList();
}

export default app;