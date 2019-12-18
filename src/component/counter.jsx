import React, { useState, useEffect, useContext, useReducer, useRef, useImperativeHandle, forwardRef } from 'react';

export function Example() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });


    return (
        <div>
            <p>You clicked { count } times</p>
                <button onClick={() => setCount(count + 1)}>Click me {count}</button>
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
const ChartAPI = {
  subscribeToFriendStatus: function(friendID, handleStatusChange) {
      return { friendID, handleStatusChange }
  },
  unsubscribeFromFriendStatus(friendID, handleStatusChange) {
      return { friendID, handleStatusChange }
  }
};

function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ChartAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
            ChartAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
        }
    });

    return isOnline;
}

/**
 * @return {string}
 */
function FriendStatus(props) {
    const isOnline = useFriendStatus(props.friend.id);

    if (isOnline === null) {
        return 'Loading...';
    }

    return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
    const isOnline = useFriendStatus(props.friend.id);

    return (
        <li style={{color: isOnline ? 'green' : 'black'}}>
            {props.friend.name}
        </li>
    )
}

const friendList = [
    { id: 1, name: 'Phoebe' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Ross' }
];

function ChatRecipientPicker() {
    const [recipientID, setRecipientID] = useState(1);
    const isRecipientOnline = useFriendStatus(recipientID);

    return(
        <>
            <div color={isRecipientOnline ? 'green' : 'red'}>
                online
            </div>
            <select
                value={recipientID}
                onChange={e => setRecipientID(Number(e.target.value))}
            >
                {friendList.map(friend => (
                    <option key={friend.id} value={friend.id}>
                        {friend.name}
                    </option>
                ))}
            </select>
        </>
    )
}

export function Counter({initialCount}) {
    const initRef = useRef();
    console.log({initRef});
    const [count, setCount] = useState(initialCount);
    return (
        <>
            Count: {count}
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
        </>
    )
}

const themes = {
  light: {
      foreground: '#000',
      background: '#eee',
  },
  dark: {
      foreground: '#fff',
      background: '#222'
    }
};

const ThemeContext = React.createContext(themes.light);

export function ExampleContext() {
    return(
        <ThemeContext.Provider value={themes.dark}>
            <Toolbar />
        </ThemeContext.Provider>
    )
}

function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    )
}

function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
        <button style={{background: theme.background, color: theme.foreground}}>
            I am styled by theme context!
        </button>
    )
}

const initialState = {count: 0};
function init(initialCount) {
    return { count: initialCount }
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return { count: state.count - 1};
        case 'reset':
            return {count: action.payload };
        default:
            throw new Error();
    }
}

export function CounterRedux({initialCount}) {
    const [state, dispatch] = useReducer(reducer, initialCount, init);

    return(
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>Reset</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    )
}

export function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.focus();
    };
    return (
        <>
            <input type="text" ref={inputEl} />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    )
}

export function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: ()=> {
            inputRef.current.focus();
    }
    }));

    return <input ref={inputRef} />
}
FancyInput = forwardRef(FancyInput);

export function Box() {
    const [style, setStyle] = useState({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        background: 'red',
        position: 'absolute'
    });
    const position = useWindowPosition();
    return <>
        <div style={{...style, ...position}}>square</div>
        </>
}

function useWindowPosition() {
    const [position, setPosition] = useState({left: 0, top: 0});
    function handleMouseMove(e) {
        setPosition(state => ({...state, left: e.pageX, top: e.pageY}));
    }
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, []);

    return position;
}

export function GetPreviousProps() {
    const [count, setCount] = useState(0);

}