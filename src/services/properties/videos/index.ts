import { IVideo, Properties, Videos } from "@/database/models";
import { SYSTEM_VIDEO_STORAGE_PATH } from "@/helpers/config";

import fs from 'fs';

import { videoParseEnToPt } from "@/database/parse/video";
import { transformVideo } from "@/database/transformers/video";
import { extractUserFromToken } from "@/helpers/token";
import { Request, Response } from 'express';

export const store = async (req: Request, res: Response): Promise<any> => {  
  try {
    const { client } = extractUserFromToken(req)

    const { filename } = req.file;
    const { code } = req.params

    const property = await Properties.findOne({ where: { client_id: client.id, code }, attributes: ['id'] })
    const newVideo = await Videos.create({ property_id: Number(property.id), src: filename })

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
    const { client } = extractUserFromToken(req)

    const { code, video_id } = req.params

    const property = await Properties.findOne({ where: { client_id: client.id, code: Number(code) }, attributes: ['id'] })
    const video = await Videos.findOne({ where: { id: Number(video_id), property_id: Number(property.id) } })

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

export const list = async (req: Request, res: Response): Promise<any> => {
  try {
    const { client } = extractUserFromToken(req)

    const { code } = req.params
    const { lang } = req.query

    // Raw data
    const property = await Properties.findOne({ where: { client_id: client.id, code: Number(code) }, attributes: ['id'] })
    const videos = await Videos.findAll({ where: { property_id: Number(property.id) } })

    // Transformed data
    const transformedData = videos.map((item: IVideo) => transformVideo(item))

    const enDataFields = {
      paginate: {
        data: transformedData as any,
        message: 'Success',
        status: 200
      }
    }

    // Translated data
    if (lang !== 'EN') {
      enDataFields.paginate.data = transformedData.map((item: IVideo) => videoParseEnToPt(item))
    }

    return res.status(200).json(enDataFields)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message })
  }
}