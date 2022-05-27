import { useEffect, useState } from "react";
import { useStorage } from "../../node_modules/@capacitor-community/react-hooks/storage" /*@capacitor-community/react-hooks/storage";*/

const STORAGE_KEY = "yet-another-todo-list";
export function UpdateTask() {
  const [list, setTodos] = useState([]);
  const { get, set } = useStorage();
  useEffect(() => {
    async function run() {
      const storedList = await get(STORAGE_KEY);

      if (storedList) {
        try {
          const parsedList = JSON.parse(storedList);
          setTodos(parsedList);
        } catch {
        }
      }
    }
    run();
  }, [get, setTodos]);

  useEffect(() => {
    set(STORAGE_KEY, JSON.stringify(list));
  }, [set, list]);

  function addTasks(text) {
    setTodos((todos) => {
      return [...todos, { text: text, done: false, id: generateId() }];
    });
  }

  function updateTasks(id, overrides) {
    setTodos((todos) => {
      return todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...overrides,
          };
        }
        return item;
      });
    });
  }


  return { list, addTasks, updateTasks };
}

function generateId() {
  return Date.now();
}
