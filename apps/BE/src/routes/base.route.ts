import express from 'express';
import { getIndex,  } from '../controllers';

const router = express.Router();

router.get('/', getIndex);

export default router;