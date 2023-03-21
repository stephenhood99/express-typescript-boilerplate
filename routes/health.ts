import Express, { Request, Response } from 'express';
const router = Express.Router();

/* GET Health check. */
router.get('/', (_: Request, res: Response) => {
  res.send('healthy');
});

export default router;
