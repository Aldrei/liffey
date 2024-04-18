import { IEmployees } from "@/database/models";
import { GetCdnUrlType, getCdnUrl } from "@/helpers/config";
import { deepCloneObj } from "@/helpers/object";

export interface ITransformedEmployee extends Omit<IEmployees, 'photo'> {
  photo: {
    thumb: string
    normal: string
  }
}

export const transformEmployee = (source: IEmployees): ITransformedEmployee => {
  const data = <ITransformedEmployee>deepCloneObj(source)

  data.photo = {
    thumb: getCdnUrl(source.photo, GetCdnUrlType.THUMB_IMAGE),
    normal: getCdnUrl(source.photo, GetCdnUrlType.NORMAL_IMAGE),
  }

  return data
}
