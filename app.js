import display from "./src/components/display.js"
import welcome from "./src/components/welcome.js";
import todoList from "./src/components/todoList.js";
import logout from "./src/components/logout.js";
import login from "./src/components/login.js";
import pageRender from "./src/components/pageRender.js";
import backgroundImageRandomizer from "./src/services/utils/backgroundRandomizer.js";

const app = () => {
  
  
  backgroundImageRandomizer();
  pageRender();
  welcome();
  login(); 
  display();
  todoList();
  logout();
  
}

export default app;