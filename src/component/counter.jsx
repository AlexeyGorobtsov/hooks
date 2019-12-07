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

export function Form() {
    const [name, setName] = useState('Mary');

    useEffect(function persistForm() {
        if (name) {
            localStorage.setItem('formData', name);
        }

    });

    const [surname, setSurname] = useState('Poppins');

    useEffect(function updateTitle() {
        document.title = `${name} ${surname}`;
    });

    function handleName(e) {
        console.log(e.target.value);
        setName(e.target.value);
    }

    return (
        <div>
            <input value={name} onChange={handleName}/>
            <p>{surname}</p>
        </div>
    )
}
