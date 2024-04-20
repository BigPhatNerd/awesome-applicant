import { Router, Request, Response } from 'express';

import pool from './database';

const router = Router();


router.post('/awesome/applicant', async (req, res) => {
    try {
        const checkExistence = await pool.query('SELECT 1 FROM applicants LIMIT 1');
        
        if (checkExistence.rows.length > 0) {
            return res.status(403).json({
                status: 'error',
                message: 'An applicant record already exists. Please update or delete the existing record.'
            });
        }
        
        const { name, bio, favorite_stack, aspirations, employer } = req.body;
         const result = await pool.query(
            'INSERT INTO applicants (name, bio, favorite_stack, aspirations, employer) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, bio, favorite_stack, aspirations, employer',
            [name, bio, favorite_stack, aspirations, employer]
        );

        res.json(result.rows[0]);

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});


router.get('/awesome/applicant', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM applicants LIMIT 1'); // Ensures only one record is fetched
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No applicant found.' });
        }
        res.json(result.rows[0]); 
    } catch (error) {
      if(error instanceof Error){
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
});



router.put('/awesome/applicant', async (req: Request, res: Response) => {
    const { name, bio, favorite_stack, aspirations, employer } = req.body;
    try {
        const result = await pool.query(`
            UPDATE applicants SET 
                name = COALESCE($1, name), 
                bio = COALESCE($2, bio), 
                favorite_stack = COALESCE($3, favorite_stack), 
                aspirations = COALESCE($4, aspirations), 
                employer = COALESCE($5, employer) 
            WHERE id = 1
            RETURNING *;
        `, [name, bio, favorite_stack, aspirations, employer]);

        if (result.rows.length === 0) {
            // No record was updated, possibly because it doesn't exist
            return res.status(404).json({ message: "No applicant found to update." });
        }

        // Return the updated record
        res.json(result.rows[0]);
    } catch (error:unknown) {
        if(error instanceof Error){
        res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

router.delete('/awesome/applicant', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM applicants');
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No applicants found to delete.' });
        }
        res.json({ message: 'All applicant records deleted successfully' });
    } catch (error: unknown) {
        if(error instanceof Error){
        res.status(500).json({ error: error.message });
        } else{
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

router.delete('/awesome/applicant/clear', async (req, res) => {
    await pool.query('TRUNCATE TABLE applicants RESTART IDENTITY');
    res.status(200).send('Applicants table cleared');
});


export default router;