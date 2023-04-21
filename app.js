import display from "./src/components/display.js"
import welcome from "./src/components/welcome.js";
import todoList from "./src/components/todoList.js";
import logout from "./src/components/logout.js";
import login from "./src/components/login.js";
import pageRender from "./src/components/pageRender.js";

const app = () => {
  pageRender();
  welcome();
  login(); 
  display();
  todoList();
  logout();
}

export default app;