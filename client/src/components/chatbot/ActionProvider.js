
 class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = (e) => {
    console.log(e)
    const message = this.createChatBotMessage("Hello, How can I help you?.");
    this.addMessageToState(message);
  };

  greet1 = () => {
    const message = this.createChatBotMessage("http://localhost:3000/AllEvents");
    this.addMessageToState(message);
  };

  handleJavascriptQuiz = (e) => {
    console.log(e)
    const message = this.createChatBotMessage(
      e
    );

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;