import pool from '../data/db.js'
import { Router } from 'express'

const router = Router();

router.get('/eloadok', async(req,res)=>{
    const sql = `
        SELECT e.nev AS eloado, COUNT(a.id) AS albumDb, MIN(a.ev) AS elso, MAX(a.ev) AS utolso
        FROM eloadok e
        LEFT JOIN albumok a ON a.eloado_id = e.id
        GROUP BY e.id, e.nev
        ORDER BY albumDb DESC, e.nev ASC
    `;

    const [eredmeny] = await pool.query(sql);

    res.json(eredmeny);
})

export default router