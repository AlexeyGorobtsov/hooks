import React from "react";

import { Counter, Example, Form, ExampleContext, CounterRedux, TextInputWithFocusButton, FancyInput, Box } from "./component/counter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Example />
      <Counter initialCount={0} />
      <Form/>
      <ExampleContext />
      <CounterRedux initialCount={0}/>
      <TextInputWithFocusButton />
       < FancyInput />
       <Box />
    </div>
  );
}

export default App;
