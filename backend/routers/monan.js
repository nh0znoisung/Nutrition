import express from 'express';
import { createMonan, deleteMonan, getMonan, updateMonan, formMonan, searchMonan, searchIdMonan } from '../controllers/monan.js';

const router = express.Router();

router.get('/', getMonan);
router.get('/add', formMonan);
router.post('/add', createMonan)

router.post('/search', searchMonan)

router.get('/update/:id', searchIdMonan)

router.post('/update/:id', updateMonan)
router.post('/delete/:id', deleteMonan)

export default router;