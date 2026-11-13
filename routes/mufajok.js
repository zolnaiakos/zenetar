import pool from '../data/db.js'
import { Router } from "express";

const router = Router();

router.get('/',async(req,res) =>{
    let sql = 'SELECT mufaj, COUNT(*) as albumDb, SUM(hossz) AS osszHossz FROM albumok GROUP BY mufaj'

    const [eredmeny] = await pool.query(sql)
    res.json(eredmeny)
})

export default router;