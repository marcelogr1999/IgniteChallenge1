import { useState } from 'react';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

export function TaskList() {
  interface Task {
    id: number;
    title: string;
    isComplete: boolean;
  }
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(event: React.FormEvent<HTMLElement>) {
    event.preventDefault();

    const task:Task = {
      id: Math.floor(Math.random() * 1000),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks([...tasks, task]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(tasks.map(task => id === task.id ? {...task, isComplete: !task.isComplete } : task));
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id ));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <form className="input-group" onSubmit={(event: React.FormEvent<HTMLElement>) => handleCreateNewTask(event)}>
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" disabled={newTaskTitle.length === 0} data-testid="add-task-button" >
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </form>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>
              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}