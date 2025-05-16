import { useEffect, useState } from "react";

function App() {
  // 과제1-1: 7-1, 7-2강을 듣고 이곳에 투두리스트 컴포넌트를 작성해주세요.
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const saveTodos = localStorage.getItem("toDos");
    if (saveTodos) {
      try {
        const parsed = JSON.parse(saveTodos);
        if (Array.isArray(parsed)) {
          setToDos(parsed);
        }
      } catch (e) {
      }
    }
    setIsLoad(true);
  }, []);

  useEffect(() => {
    if (isLoad) {
      localStorage.setItem("toDos", JSON.stringify(toDos));
    }
  }, [toDos, isLoad]);

  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if(toDo === ""){
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo("");
  }
  const deleteToDo = (index) => {
    setToDos((currentArray) =>
      currentArray.filter((_, itemIndex) => itemIndex !== index)
    );
  }
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
          />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={ () => deleteToDo(index)}>❌</button>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
