import React, { useEffect, useState } from 'react'
import {Button, Card, CardContent, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const ListTask = () => {

  const [task, setTask] = useState([])

  const navigate = useNavigate()

  const loadTask = async() => {
    const resp = await fetch('http://localhost:3000/tasks')
    const data = await resp.json();
    setTask(data)
  }

  useEffect(() => {
    loadTask();
  }, [])

  const handleDelete = async(id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      })
  
      setTask(task.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <>
      <h1>Task List</h1>

      {task.map((task) => {
        return (
          <Card style={{marginBottom: ".7rem", backgroundColor: "#1e272e"}} key={task.id} >
            <CardContent style={{display: 'flex', justifyContent: 'space-between'}} >
              <div>
                <Typography color='white' >{task.title}</Typography>
                <Typography color='white' >{task.description}</Typography>
              </div>
             

              <div>
                <Button variant='contained' color='inherit' style={{marginRight: '.5rem'}} onClick={() => navigate(`/tasks/${task.id}/edit`) } >
                  Edit
                </Button>
                <Button variant='contained' color='warning' onClick={() => handleDelete(task.id)} >
                  Delete
                </Button>
              </div>

             
            </CardContent>
          </Card>

        )
      })}
    </>
    
  )
}
