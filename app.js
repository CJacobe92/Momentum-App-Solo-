import display from "./src/components/display.js"
import welcome from "./src/components/welcome.js";
import todoList from "./src/components/todoList.js";
import logout from "./src/components/logout.js";
import login from "./src/components/login.js";
import pageRender from "./src/components/pageRender.js";
import backgroundImageRandomizer from "./src/services/utils/backgroundRandomizer.js";
import settings from "./src/components/settings.js";
import quotes from "./src/components/quotes.js";
import createImageDB from "./src/services/utils/createImageDB.js";


const app = () => {

 
   
  quotes();
  pageRender();
  welcome();
  login(); 
  display();
  todoList();
  logout();
  settings();
  createImageDB()
  backgroundImageRandomizer();
 
}

export default app;