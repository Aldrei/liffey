import { IBanner, IProperty } from "@/database/models";
import { getImageUrl } from "@/helpers";
import { deepCloneObj } from "@/helpers/object";
import { transformProperty } from "../property";

interface SubData<T> {
  data: T
}

export interface ITransformedBanners extends IBanner {
  normal: string
  property: SubData<IProperty>
}

export const transformBanner = (source: IBanner): ITransformedBanners => {
  try {
    const data = <ITransformedBanners>deepCloneObj(source)

    data.thumb = getImageUrl(source.img)
    data.normal = getImageUrl(source.img)

    data.property = {
      data: transformProperty(source.Property)
    }
    delete data.Property

    return data
  } catch (error) {
    console.error(`transformBanner: ${error}`);
    return null
  }
}
