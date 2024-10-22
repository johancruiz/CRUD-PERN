import pool from "../db.js"


export const getAllTasks = async(req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM task')
        res.json(rows)
    } catch (error) {
        next(error)
    }
}

export const getTaskById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const {rows} = await pool.query('SELECT * FROM task WHERE id = $1 ', [id])
        if (rows.length == 0)  res.status(404).json({message: 'Task not Found'})
        
        res.json(rows[0])
    } catch (error) {
        next(error)
    }
    
}

export const addTask = async(req, res, next) => {
    try {
        const {title, description} = req.body
        const data = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
        res.json(data.rows[0])
    } catch (error) {
        next(error)
    }

}

export const deleteTask = async(req, res, next) => {
    try {
        const {id} = req.params
        const {rows, rowCount} = await pool.query('DELETE FROM task WHERE id = $1 ', [id])
        if(rowCount == 0) res.status(404).json({message: 'Task Not Found'});

        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
    
}

export const updateTask = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {title, description} = req.body;
        const {rows, rowCount} = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id])
        if(rowCount == 0) res.status(404).json({message: 'Task Not Found'});
        res.status(200).json({message: 'Task Updated'})
    } catch (error) {
        next(error)
    }
   
}