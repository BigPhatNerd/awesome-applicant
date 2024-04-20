import { Router, Request, Response } from 'express';

import pool from './database';

const router = Router();


router.post('/awesome/applicant', async(req: Request, res: Response) =>{
    const { name, bio} = req.body;
    const result = await pool.query('INSERT INTO applicants (name, bio) VALUES ($1, $2) RETURNING *',
[name, bio]);

res.json(result.rows[0])
})

router.get('/awesome/applicant', async (req:Request, res: Response) => {
    const result = await pool.query('SELECT * FROM applicants');
    res.json(result.rows)
})

router.put('/awesome/applicant/:id', async (req: Request, res: Response) => {
const { id} = req.params;
const { name, bio} = req.body;
const result = await pool.query('UPDATE applicants SET name = $1, bio = $2 WHERE id = $3 RETURNING *',
    [name, bio, id]
)
res.json(result.rows[0])
})

router.delete('/awesome/applicant/:id', async (req:Request, res: Response) => {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM applicants WHERE id = $1', [id]);
    res.json({ message: 'Deleted'})
})


export default router;