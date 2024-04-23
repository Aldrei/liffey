import { router } from "@/express.instance";
import { destroy, detail, list, store, update } from "@/services/properties";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validatorMiddleware = [
  body('owner_id').notEmpty().withMessage('Owner is required'),
  body('agent_id').notEmpty().withMessage('Agent is required'),
  body('broker_id').notEmpty().withMessage('Broker is required'),
  body('city_id').notEmpty().withMessage('City is required'),
  body('neighborhood_id').notEmpty().withMessage('Neighborhood is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const errors = {}
      result.array().forEach((e: any) => errors[e.path] = e.msg)

      return res.status(400).json({ errors });
    }

    next();
  }
];

router.post('/api/properties', validatorMiddleware, store)
router.put('/api/properties/:id', validatorMiddleware, update)
router.get('/api/properties/:code', detail)
router.delete('/api/properties/:code', destroy)
router.get('/api/properties', list)

export default router