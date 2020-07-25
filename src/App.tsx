import React, {  useState, useRef } from "react";

// especificamos el tipo de elemento en typescript
type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}


function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormElement) => {
    event.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTask: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTask);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTask(event.target.value);
  };

  const toggleDoneTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  }

  const removeTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  onChange={handleChange}
                  type="text"
                  value={newTask}
                  autoFocus
                  ref={taskInput}
                />
                <button
                  className="btn btn-success btn-block mt-2"
                >Save</button>
              </form>
            </div>
          </div>

          {tasks.map((task: ITask, index) => (
            <div
              className="card card-body mt-2"
              key={index}
            >
              <h2 style={{ textDecoration: task.done ? 'line-through' : '' }}>{task.name}</h2>
              <div>
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => toggleDoneTask(index)}
                >
                  {task.done ? '✓' : 'x'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(index)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
