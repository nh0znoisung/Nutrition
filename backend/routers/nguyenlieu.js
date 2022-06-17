import express from 'express';
import { createNguyenlieu, deleteNguyenlieu, getNguyenlieu, updateNguyenlieu, formNguyenlieu, searchNguyenlieu, searchIdNguyenlieu } from '../controllers/nguyenlieu.js';

const router = express.Router();

router.get('/', getNguyenlieu)
router.get('/add', formNguyenlieu)
router.post('/add', createNguyenlieu)

router.post('/search', searchNguyenlieu)

router.get('/update/:id', searchIdNguyenlieu)

// router.post('/update', updateNguyenlieu)
router.post('/update/:id', updateNguyenlieu)
router.post('/delete/:id', deleteNguyenlieu)

export default router;