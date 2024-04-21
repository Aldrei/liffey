import { Clients, IPhoto, Photos, Properties } from "@/database/models";
import { photoParseEnToPt, photoParsePtToEn, photoPositionsParsePtToEn } from "@/database/parse/photo";
import { transformPhoto } from "@/database/transformers/photo";
import { getImageUrl } from "@/helpers";
import { NORMAL_STORAGE_PATH, THUMB_STORAGE_PATH } from "@/helpers/config";
import { extractUserFromToken } from "@/helpers/token";
import { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';

const prepareFieldsToUpdate = async (body: any): Promise<Partial<IPhoto>> => photoParsePtToEn(body)

const watermarkImage = async (inputImage: string, watermarkName: string) => {
  try {
    const watermarkPath = `${NORMAL_STORAGE_PATH}${watermarkName}`
    const watermarkBuffer = fs.readFileSync(watermarkPath)

    if (!watermarkBuffer) throw Error(`Error to read watermark: ${watermarkName}`)

    const cropImageInput = 
      await sharp(inputImage)
      .composite([{ input: watermarkBuffer, gravity: 'southwest'  }])
      .toBuffer();

    return cropImageInput
  } catch (error) {
    console.log(error);
    return { error: error.message }
  }
}

const cropImage = async (inputPath: string, outputPath: string, width: number, height: number, watermarkName?: string): Promise<any> => {
  try {
    const cropImageInput: any = watermarkName 
      ? await watermarkImage(inputPath, watermarkName) 
      : inputPath

    if (cropImageInput.error) throw Error(`Error to read watermark: ${watermarkName}`)

    await
      sharp(cropImageInput)
      .resize(width, height, {
        fit: 'inside'
      })
      .toFile(outputPath);

    console.log('Image created successfully.');
  } catch (error) {
    console.error('Error cropping image:', error);
    return { error: error.message }
  }
}

export const store = async (req: Request, res: Response): Promise<any> => {  
  try {
    const { client } = extractUserFromToken(req)
    const dataClient = await Clients.findOne({ 
      where: {
        id: client.id
      }, 
      attributes: ['watermark']
    })

    const { filename } = req.file;
    const { code } = req.params

    const property = await Properties.findOne({ where: { client_id: client.id, code }, attributes: ['id'] })

    /**
     * Crop and make the watermark for normal size.
    */
    const normalSizePath = `${NORMAL_STORAGE_PATH}${filename}`
    const normalSizeError = await cropImage(normalSizePath, normalSizePath, 1366, 790, dataClient.watermark)

    if (normalSizeError?.error) {
      fs.unlink(normalSizePath, (err) => {
        if (err) throw Error(err.message);
        console.log(`Crop image error, image was deleted(${normalSizePath}). Error: ${normalSizeError?.error}`);
      })

      throw Error(normalSizeError.error)
    }

    /**
     * Crop and make the watermark for thumb size.
    */
    const thumbSizePath = `${THUMB_STORAGE_PATH}${filename}`
    const thumbSizeError = await cropImage(normalSizePath, thumbSizePath, 512, 390)

    if (thumbSizeError?.error) {
      fs.unlink(normalSizePath, (err) => {
        if (err) throw Error(err.message);
        console.log(`Crop image error so image was deleted(${normalSizePath}). Error: ${thumbSizeError?.error}`);
      })

      fs.unlink(thumbSizePath, (err) => {
        if (err) throw Error(err.message);
        console.log(`Crop image error so image was deleted(${thumbSizePath}). Error: ${thumbSizeError?.error}`);
      })
      
      throw Error(thumbSizeError.error)
    }

    /**
     * All good so save the image name returned by multer middleware.
    */
    await Photos.create({ property_id: Number(property.id), src: filename, type: 'image', order: 99 })

    return res.status(200).json({
      success: {
        upload: {
          normal: getImageUrl(normalSizePath),
          thumb: getImageUrl(thumbSizePath)
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { property_id, photo_id } = req.params
    const { body } = req

    const inputs = await prepareFieldsToUpdate(body)

    const photo = await Photos.update(inputs, { where: { id: Number(photo_id), property_id: Number(property_id) } })

    return res.status(200).json({ photo, message: 'Photo updated successfully.' })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message })
  }
}

export const destroy = async (req: Request, res: Response): Promise<any> => {
  try {
    const { property_id, photo_id } = req.params

    const photo = await Photos.findOne({ where: { id: Number(photo_id), property_id: Number(property_id) } })

    const pathThumb = `${THUMB_STORAGE_PATH}${photo.src}`
    const pathNormal = `${NORMAL_STORAGE_PATH}${photo.src}`

    fs.unlink(pathThumb, error => {
      if (error) throw Error(`Error deleting thumb image. ${error.message}`)
    })

    fs.unlink(pathNormal, error => {
      if (error) throw Error(`Error deleting thumb image. ${error.message}`)
    })

    await Photos.destroy({ where: { id: photo_id } })

    return res.status(200).json({ photo, message: 'Photo deleted successfully.' })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message })
  }
}

export const updatePositions = async (req: Request, res: Response): Promise<any> => {
  try {
    const { property_id } = req.params
    const { body } = req

    if (!body?.data?.length) throw Error(`There's no photo data to update.`)

    const inputs = photoPositionsParsePtToEn(body.data)

    const updateFn = inputs.map(async (photo: any) => (
      await Photos.update({ order: photo.order }, { where: { property_id, id: photo.photo_id }})
    ))

    await Promise.all(updateFn)

    return res.status(200).json({ message: 'Photos positions updated successfully.' })
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
    const photos = await Photos.findAll({ where: { property_id: Number(property.id) } })

    // Transformed data
    const transformedData = photos.map((item: IPhoto) => transformPhoto(item))

    const enDataFields = {
      paginate: {
        data: transformedData as any,
        message: 'Success',
        status: 200
      }
    }

    // Translated data
    if (lang !== 'EN') {
      enDataFields.paginate.data = transformedData.map((item: IPhoto) => photoParseEnToPt(item))
    }

    return res.status(200).json(enDataFields)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message })
  }
}
