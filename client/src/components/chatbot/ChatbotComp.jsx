import React from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';

import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessagePerser";

import "./App.css";

function ChatbotComp() {
  return (
    <div className="ChatbotComp">
      <div style={{ position: 'fixed',
                    right:'25px',
                    bottom: '50px',
                    boxShadow: '0px 7px 29px 0px' }}>
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </div>
    </div>
  );
}

export default ChatbotComp;