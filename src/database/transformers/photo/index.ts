import { IPhoto } from "@/database/models";
import { getImageUrl } from "@/helpers";
import { deepCloneObj } from "@/helpers/object";

export interface ITransformedPhotos extends IPhoto {
  long_desc: string
  normal: string
}

export const transformPhoto = (source: IPhoto): ITransformedPhotos => {
  try {
    const data = <ITransformedPhotos>deepCloneObj(source)

    data.thumb = getImageUrl(data.src)
    data.normal = getImageUrl(data.src)

    return data
  } catch (error) {
    console.error(`transformPhoto ${error}`);
  }
}
