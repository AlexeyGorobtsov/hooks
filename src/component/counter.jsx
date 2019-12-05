import React, {useState, useEffect} from 'react';

export function Example() {
    const [count, setCount] = useState(0);
    useEffect(() => {
       document.title = `You clicked ${count} times`;
    });


    return (
        <div>
            <p>
                <button onClick={() => setCount(count + 1)}>Click me {count}</button>
            </p>
        </div>
    )
}

function ExampleWithManyStates() {
    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{text: 'Learn Hooks'}])
}
