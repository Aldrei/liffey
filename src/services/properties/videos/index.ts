import { Videos } from "@/database/models";
import { SYSTEM_VIDEO_STORAGE_PATH } from "@/helpers/config";

import fs from 'fs';

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

export const destroy = async (req: Request, res: Response): Promise<any> => {
  try {
    const { property_id, video_id } = req.params

    const video = await Videos.findOne({ where: { id: Number(video_id), property_id: Number(property_id) } })

    const videoPath = `${SYSTEM_VIDEO_STORAGE_PATH}${video.src}`

    fs.unlink(videoPath, error => {
      if (error) throw Error(`Error deleting video. ${error.message}`)
    })

    await Videos.destroy({ where: { id: video_id } })

    return res.status(200).json({ message: 'Video deleted successfully.' })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message })
  }
}
