import React, { useState } from 'react';
import { useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const db = getFirestore();
      const auth = getAuth();

      useEffect(() => {
        const fetchTasks = async () => {
          const user = auth.currentUser;
          if (user) {
            const tasksCollection = collection(db, 'users', user.uid, 'tasks');
            const tasksSnapshot = await getDocs(tasksCollection);
            const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksList);
          }
        };

        fetchTasks();
      }, [auth.currentUser, db]);

      const handleAddTask = async () => {
        if (newTask.trim()) {
          const user = auth.currentUser;
          if (user) {
            const tasksCollection = collection(db, 'users', user.uid, 'tasks');
            const docRef = await addDoc(tasksCollection, { text: newTask, completed: false });
            setTasks([...tasks, { id: docRef.id, text: newTask, completed: false }]);
            setNewTask('');
          }
        }
      };

      const handleTaskCompletion = async (index) => {
        const updatedTasks = tasks.map((task, i) =>
          i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);

        const user = auth.currentUser;
        if (user) {
          const task = updatedTasks[index];
          const taskDocRef = doc(db, 'users', user.uid, 'tasks', task.id);
          await updateDoc(taskDocRef, { completed: task.completed });
        }
      };
 

  return (
    <div style={{  width: '100%', height: '100%', display: 'flex', flexDirection: 'column',  backgroundColor: '#fdf7bd' }}>
    
      <div className='head' style={{ width: '100%', backgroundColor: '#fdf7bd', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ width: '100%', textAlign: 'right', backgroundColor: '#fdf7bd', alignItems: 'top' }}>
        <h3 style={{  backgroundColor: '#fdf7bd' }}>Tasks</h3>
        <button onClick={() => setNewTask(newTask === '' ? ' ' : '')} style={{ fontSize: '24px', cursor: 'pointer',  backgroundColor: '#fdf7bd', border: 'none' }}>+</button>
      </div>
      </div>
      <civ className='body' style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column',  backgroundColor: '#fdf7bd' }}>
      {newTask !== '' && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', backgroundColor: 'transparent' }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            style={{ marginRight: '10px', backgroundColor: 'transparent' }}
          />
          <button onClick={handleAddTask} style={{ backgroundColor: 'transparent'}}>Add Task</button>
        </div>
      )}
      <ul style={{ backgroundColor: 'transparent', paddingLeft: '0' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ backgroundColor: 'transparent', listStyleType: 'none', textAlign: 'left' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskCompletion(index)}
              style={{ backgroundColor: 'transparent' }}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', backgroundColor: 'transparent' }}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
      </civ>
      
    </div>
  );
};

export default Tasks;