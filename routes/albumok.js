import pool from '../data/db.js'
import { Router } from "express";

const router = Router();

router.get('/', async(req,res) => {
    // feladat megoldásához AI segítségét használtam
    let sql = `SELECT albumok.id, albumok.cim, eloadok.nev AS eloado, albumok.ev, albumok.mufaj,  eloadok.nev 
    FROM albumok 
    JOIN eloadok ON eloadok.id = albumok.eloadok_id
`
    let params = [];
    let feltetelek = [];

    const {mufaj, tol, ig} = req.query;
    
    if (
        (tol !== undefined && (tol.trim() === '' || !Number.isInteger(Number(tol)))) ||
        (ig !== undefined && (ig.trim() === '' || !Number.isInteger(Number(ig))))
    ) {
        return res.status(400).json('Az évnek egész számnak kell lennie');
    }
    

    if(mufaj){
        feltetelek.push('albumok.mufaj = ?')
        params.push(mufaj)
    }

     if (tol !== undefined) {
        feltetelek.push('albumok.ev >= ?');
        parameterek.push(Number(tol));
    }

    if (ig !== undefined) {
        feltetelek.push('albumok.ev <= ?');
        parameterek.push(Number(ig));
    }

    if (feltetelek.length > 0) {
        sql += ' WHERE ' + feltetelek.join(' AND ');
    }

    sql += ' ORDER BY albumok.ev ASC, albumok.cim ASC';

    const [eredmeny] = await pool.query(sql, parameterek);

    res.json(eredmeny);
    

})

router.get('/kereses',async(req,res) => {
    const {q} = req.query;

    if(q.length < 2){
       return res.status(400).json('legalább 2 karakter legyen')
    }

    const sql = `
    SELECT a.id, a.cim, e.nev AS eloado, a.ev, a.mufaj, a.hossz
    FROM albumok a
    JOIN eloadok e ON e.id = a.eloado_id
    WHERE a.cim LIKE ?
    OR e.nev LIKE ?
    ORDER BY a.ev ASC, a.cim ASC
    `

    const keres = `%${q.trim()}%`;

    const [eredmeny] = await pool.query(sql, [keres, keres]);

    res.json(eredmeny);
})

export default router