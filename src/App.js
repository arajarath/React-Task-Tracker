import Header from './Components/Header';
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useLocation} from 'react-router-dom';
import Footer from "./Components/Footer";
import About from "./Components/About";

function App() {

    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])


    //Get Tasks

    useEffect(() => {
      const getTasks = async () => {
        const getTaskFromServer = await fetchTasks();
        setTasks(getTaskFromServer);
      }
      getTasks()
    }, [])

    //Fetch Tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      return data;
      // console.log(data)
    }


    //Fetch Task for update the reminder
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data;
      // console.log(data)
    }
    //Delete Task
    const deleteTask = async (id) => {

      await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'DELETE'
      })
      setTasks(tasks.filter((task) => task.id !== id))
    }

    //Toggle Reminder
    const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id)
      const updateTask = {...taskToToggle, 
        reminder: !taskToToggle.reminder}
        const res = await fetch(`http://localhost:5000/tasks/${id}`,{
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(updateTask)
        })

        const data = await res.json()
      setTasks(tasks.map((task) => 
        task.id === id ? {...task, reminder: data.reminder} : task
      ))
    }

    //Save Task
    const addTask = async (task) => {

      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body : JSON.stringify(task)
      })

      const data = await res.json();

      setTasks([...tasks, data])

      // const id = Math.floor(Math.random() * 10000) + 1;
      
      // const newTask = {id, ...task}
      // setTasks([...tasks, newTask])
    }
  return (
    <Router>
    <div className="container">
      <Header onAddTask = {() => setShowAddTask(!showAddTask)}
        onShowAdd = {showAddTask}
      />
      
       <Route path="/" exact render={(props) => (
         <>
{showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? 
      <Tasks onToggle={toggleReminder}
       onDelete={deleteTask}
       tasks={tasks}/> : 'No Tasks to Show'}
         </>
       )} />
       <Route path="/about" component={About}/>
      <Footer />
    </div>
    </Router>
  )
}

export default App;
