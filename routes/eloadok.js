import pool from '../data/db.js'
import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {

const {orszag} = req.query

   let sql = 'SELECT * FROM eloadok WHERE orszag = ? ORDER BY nev DESC';

   const [eredmeny] = await pool.query(sql,[orszag]);


   res.json(eredmeny)

})

router.get('/:id', async(req,res)=>{
    let sql = `
    SELECT e.id AS eloadoId, e.nev, e.orszag, e.alapitas, a.id AS albumId, a.cim, a.ev, a.mufaj, a.hossz
    FROM eloadok e
    LEFT JOIN albumok a ON e.id = a.eloado_id
    WHERE e.id = ?
    ORDER BY a.ev ASC    
`

    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
        error: 'Érvénytelen előadó id'
    });
}

    const [eredmeny] = await pool.query(sql,[id])

    if (eredmeny.length === 0) {
        return res.status(404).json({
            error: 'Előadó nem található!'
        });
    }

    const eloado = {
        id: eredmeny[0].eloadoId,
        nev: eredmeny[0].nev,
        orszag: eredmeny[0].orszag,
        alapitas: eredmeny[0].alapitas,
        albumok: eredmeny
            .filter(x => x.albumId !== null)
            .map(x => ({
                id: x.albumId,
                cim: x.cim,
                ev: x.ev,
                mufaj: x.mufaj,
                hossz: x.hossz
            }))
    };

    res.json(eloado);
})

export default router