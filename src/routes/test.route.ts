import { Cities, Neighborhoods, Photos, Properties, Videos } from "@/database/models";
import { router } from "@/express.instance";
import { Request, Response } from "express";

router.get('/properties/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await Properties.findOne({
    where: {
      id: Number(id)
    },
    include: [{
      model: Cities,
      required: false
    }, {
      model: Neighborhoods,
      required: false
    }, {
      model: Photos,
      required: false
    }, {
      model: Videos,
      required: false
    }]
  })

  return res.send({
    data: result,
  });
});

export default router;
