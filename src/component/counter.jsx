import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback
} from "react";

export function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me {count}</button>
    </div>
  );
}

function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
}

export function Form() {
  const [name, setName] = useState("Mary");

  useEffect(function persistForm() {
    if (name) {
      localStorage.setItem("formData", name);
    }
  });

  const [surname, setSurname] = useState("Poppins");

  useEffect(function updateTitle() {
    document.title = `${name} ${surname}`;
  });

  function handleName(e) {
    console.log(e.target.value);
    setName(e.target.value);
  }

  return (
    <div>
      <input value={name} onChange={handleName} />
      <p>{surname}</p>
    </div>
  );
}

const ChartAPI = {
  subscribeToFriendStatus: function(friendID, handleStatusChange) {
    return { friendID, handleStatusChange };
  },
  unsubscribeFromFriendStatus(friendID, handleStatusChange) {
    return { friendID, handleStatusChange };
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
      ChartAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

/**
 * @return {string}
 */
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return "Loading...";
  }

  return isOnline ? "Online" : "Offline";
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.friend.name}</li>
  );
}

const friendList = [
  { id: 1, name: "Phoebe" },
  { id: 2, name: "Rachel" },
  { id: 3, name: "Ross" }
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <div color={isRecipientOnline ? "green" : "red"}>online</div>
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
  );
}

export function Counter({ initialCount }) {
  const initRef = useRef();
  console.log({ initRef });
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}

const themes = {
  light: {
    foreground: "#000",
    background: "#eee"
  },
  dark: {
    foreground: "#fff",
    background: "#222"
  }
};

const ThemeContext = React.createContext(themes.light);

export function ExampleContext() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}

const initialState = { count: 0 };

function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: action.payload };
    default:
      throw new Error();
  }
}

export function CounterRedux({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({ type: "reset", payload: initialCount })}
      >
        Reset
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
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
  );
}

export function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} />;
}

FancyInput = forwardRef(FancyInput);

export function Box() {
  const [style, setStyle] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    background: "red",
    position: "absolute"
  });
  const position = useWindowPosition();
  return (
    <>
      <div style={{ ...style, ...position }}>square</div>
    </>
  );
}

function useWindowPosition() {
  const [position, setPosition] = useState({ left: 0, top: 0 });

  function handleMouseMove(e) {
    setPosition(state => ({ ...state, left: e.pageX, top: e.pageY }));
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

export function GetPreviousProps() {
  const [count, setCount] = useState(0);
  // const prevCountRef = useRef();
  // useEffect(() => {
  //     prevCountRef.current = count;
  // });
  // const prevCount = prevCountRef.current;

  const prevCount = usePrevious(count);

  return (
    <>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export function WhyExample() {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    ref.current = count;
  });

  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on:" + ref.current);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
}

export function ScrollView({ row }) {
  let [isScrollingDown, setIsScrollingDown] = useState(false);
  let [prevRow, setPrevRow] = useState(null);

  if (row !== prevRow) {
    setIsScrollingDown(prevRow !== null && row > prevRow);
    setPrevRow(row);
  }

  return `Scrolling down: ${isScrollingDown}`;
}

export function MeasureExample() {
  const [height, setHeight] = useState(0);

  // const measuredRef = useCallback(node => {
  //     if(node !== null) {
  //         setHeight(node.getBoundingClientRect().height);
  //     }
  // }, []);

  const [rect, ref] = useClientReact();

  return (
    <>
      <h1 ref={ref}>Hello world</h1>
      <h2>The above header is {Math.round(rect.height)}px tall</h2>
    </>
  );
}

function useClientReact() {
  const [rect, setRect] = useState({});
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, ref];
}

export function CounterWithInterval() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}

export function ExampleWithInterval(props) {
  let latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });

  useEffect(() => {
    function tick() {
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, []);
}

export function FormHowToRead() {
  const [text, updateText] = useState("");
  const textRef = useRef();

  // useEffect(() => {
  //     textRef.current = text;
  // });
  //
  // const handleSubmit = useCallback(() => {
  //     const currentText = textRef.current;
  //     alert(currentText);
  // }, [textRef]);

  const handleSubmit = useEventCallback(() => {
    alert(text);
  }, [text]);

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <button onClick={handleSubmit}>Click</button>
    </>
  );
}

function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error(`Can't call event handler while rendering`);
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}

export class Button extends Component {
  state = {
    clicked: false
  };

  handleClick = () => {
    this.setState({ clicked: true });
  };

  render() {
    if (this.state.clicked) {
      return <h1>Thanks</h1>;
    }
    return <button onClick={this.handleClick}>Click me</button>;
  }
}

export function AppFetch() {
  const defaultUrl = "https://hn.algolia.com/api/v1/search?query=";
  const [query, setQuery] = useState("redux");
  const [state, setUrl] = useDataApi(defaultUrl, []);
  const { isLoading, isError, data } = state;

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="button" onClick={() => setUrl(defaultUrl + query)}>
        Search
      </button>

      {isLoading ? <h2>Loading</h2> : null}
      {isError ? <h3>Something went wrong</h3> : null}
      <ul>
        {data &&
          data.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
      </ul>
    </>
  );
}

function useHackerNewsApi() {
  const [data, setData] = useState([]);
  const defaultUrl = "https://hn.algolia.com/api/v1/search?query=";
  const [url, setUrl] = useState(defaultUrl + "redux");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.hits);
        setIsLoading(false);
      } catch (e) {
        setError(true);
      }
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError, defaultUrl }, setUrl];
}

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FATCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });
  useEffect(() => {
      let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await fetch(url);
        const result = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: result.hits });
      } catch (e) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();

    return () => {
        didCancel = true;
    }
  }, [url]);

  return [state, setUrl];
};
