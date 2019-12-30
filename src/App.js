import React, {useEffect, useState} from "react";

import {
    Counter,
    Example,
    Form,
    ExampleContext,
    CounterRedux,
    TextInputWithFocusButton,
    FancyInput,
    Box,
    GetPreviousProps,
    WhyExample,
    ScrollView,
    MeasureExample,
    CounterWithInterval,
    FormHowToRead,
    Button,
    AppFetch
} from "./component/counter";
import "./App.css";

function App() {
    const [row, setRow ] = useState(0);
    function handleScroll() {
        setRow(window.scrollY)
    }
    useEffect(() => {
        //window.addEventListener('scroll',handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    });

    return (
        <div className="App">
            <Example/>
            <Counter initialCount={0}/>
            <Form/>
            <ExampleContext/>
            <CounterRedux initialCount={0}/>
            <TextInputWithFocusButton/>
            < FancyInput/>
            {/*<Box />*/}
            <GetPreviousProps />
            <ScrollView row={row} />
            <WhyExample />
            <MeasureExample />
            <CounterWithInterval />
            <FormHowToRead />
            <Button />
            <AppFetch />
        </div>
    );
}

export default App;
