import { useState, useEffect } from "react";
export default function TaskManager() {
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]); 

  const addTask = () => {
    if (!input) return; 

    const newTask = {
      id: Date.now(), 
      text: input,
      completed: false, 
    };

    setTasks([...tasks, newTask]); 
    setInput(""); 
  };

 
  const deleteTask = (id) => {

    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };


  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
       
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Awesome To-Do List</h1>

   
      <div style={styles.inputGroup}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Navu kaam lakho..."
          style={styles.input}
          
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask} style={styles.addButton}>
          Add
        </button>
      </div>

    
      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.listItem}>
     
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                flexGrow: 1,
                color: task.completed ? "gray" : "black",
              }}
            >
              {task.text}
            </span>

         
            <button
              onClick={() => deleteTask(task.id)}
              style={styles.deleteButton}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && <p>Haju koi task nathi! 🎉</p>}
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "Arial" },
  header: { color: "#333" },
  inputGroup: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  addButton: { padding: "10px 20px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  list: { listStyle: "none", padding: 0 },
  listItem: { display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #eee", alignItems: "center" },
  deleteButton: { background: "transparent", border: "none", cursor: "pointer" },
};
