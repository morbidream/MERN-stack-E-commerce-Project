import React,{useState,useEffect} from "react";
import { createChatBotMessage,botMessage } from "react-chatbot-kit";
import axios from "axios";
import "./Options.css";

const Options = (props) => {
  const [chatbot, setChatbot] = useState([]);
  const [message, setMessage] = useState([]);
  const options = [
    {
      text: "Javascript",
      handler: props.actionProvider.handleJavascriptQuiz,
      id: 1,
    },
    { text: "Python", handler: () => {}, id: 2 },
    { text: "Golang", handler: () => {}, id: 3 },
  ];



  useEffect(() => {
    axios
      .get("/chatbot")
      .then((res) => {
        console.log(res.data.chatbots)
        setChatbot(res.data.chatbots);
      })
      .catch((err) => console.log(err));
  }, []);
  const buttonsMarkup = chatbot.map((option) => (
    <button key={option._id} onClick={() =>props.actionProvider.handleJavascriptQuiz(option.message)} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;