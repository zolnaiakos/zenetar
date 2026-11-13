import pool from '../data/db.js'
import { Router } from "express";

const router = Router();

router.get('/', async(req,res)=>{
    let sql = 'SELECT e.orszag, COUNT(DISTINCT e.id) AS eloadoDb, COUNT(a.id) AS albumDb FROM eloadok e LEFT JOIN albumok a ON a.eloado_id = e.id GROUP BY e.orszag ORDER BY albumdB DESC, e.orszag ASC'


    const [eredmeny] = await pool.query(sql)
    res.json(eredmeny)
})

export default router