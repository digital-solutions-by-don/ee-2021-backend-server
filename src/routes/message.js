import { Router } from 'express';
import { newMessage } from '../controllers/message';

const router = Router();

router.post('/newMessage', newMessage);

export default router;
