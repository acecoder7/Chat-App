import ReactDOM from "react-dom";
import { AuthContextProvider } from "./context/AuthContext.js";
import App from "./App.js";
import { ChatContextProvider } from "./context/ChatContext.js";

ReactDOM.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);

