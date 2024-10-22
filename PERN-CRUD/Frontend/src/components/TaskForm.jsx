import { Button, Card, CardContent, Grid2, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const TaskForm = () => {

    const [task, setTask] = useState({
        title: '',
        description: ''
    })

    const [edit, setEdit] = useState(false)

    const params = useParams()

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (edit) {
            await fetch(`http://localhost:3000/tasks/${params.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task)
            })
        } else {
            await fetch('http://localhost:3000/tasks/', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })
            
        }

        
        
        navigate('/')
    }

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    const loadTask = async(id) => {
        const resp = await fetch(`http://localhost:3000/tasks/${id}`)
        const data = await resp.json();
        setTask({title: data.title, description: data.description})
        setEdit(true)
    }

    useEffect(() => {
        if (params.id) {
            loadTask(params.id)
        }
    }, [params.id])

  return (
    <Grid2 container direction={'column'} alignItems={'center'} justifyContent={'center'} >
        <Grid2 item xs={3} >
            <Card sx={{mt: 5}} style={{backgroundColor: "#1e272e",padding: "1rem"}} >
                <Typography variant="5" textAlign={'center'} color="white" >
                    Create Task
                </Typography>
                <CardContent>
                    <form onSubmit={handleSubmit} >
                        <TextField 
                            variant="filled"
                            label='Write your title'
                            sx={{
                                display: 'block',
                                margin:'.5rem 0'
                            }}
                            name="title"
                            onChange={handleChange}
                            value={task.title}
                        />

                        <TextField 
                            variant="filled"
                            label='Write your Description'
                            multiline
                            rows={4}
                            sx={{
                                display: 'block',
                                margin:'.5rem 0'
                            }}
                            name="description"
                            onChange={handleChange}
                            value={task.description}
                        />

                        <Button variant="contained" type="submit" >
                            Save
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Grid2>
    </Grid2>
  )
}
