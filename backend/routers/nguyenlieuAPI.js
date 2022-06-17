import express from 'express';
import { createNguyenlieu, deleteNguyenlieu, getNguyenlieu, updateNguyenlieu, searchIdNguyenlieu} from '../controllers/nguyenlieuAPI.js';

const router = express.Router();

// URL: /api/nguyenlieu
router.get('/', getNguyenlieu)
router.post('/', createNguyenlieu)

router.get('/:id', searchIdNguyenlieu)

router.post('/update/:id', updateNguyenlieu)
router.post('/delete/:id', deleteNguyenlieu)

export default router;