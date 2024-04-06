import { Videos } from "@/database/models";

import { Request, Response } from 'express';

export const store = async (req: Request, res: Response): Promise<any> => {  
  try {
    const { filename } = req.file;
    const { property_id } = req.params

    const newVideo = await Videos.create({ property_id: Number(property_id), src: filename })

    return res.status(200).json({
      newVideo,
      message: 'Video updated successfully.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
