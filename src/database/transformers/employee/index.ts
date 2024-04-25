import { ICity, IEmployees, INeighborhood } from "@/database/models";
import { GetCdnUrlType, getCdnUrl } from "@/helpers/config";
import { deepCloneObj } from "@/helpers/object";
import { transformCity } from "../city";
import { transformNeighborhood } from "../neighborhood";

interface TSubData<T> {
  data: T
}

export interface ITransformedEmployee extends Omit<IEmployees, 'photo'> {
  photo: {
    thumb: string
    normal: string
  }
  city: TSubData<ICity>
  neighborhood: TSubData<INeighborhood>
}

export const transformEmployee = (source: IEmployees): ITransformedEmployee => {
  const data = <ITransformedEmployee>deepCloneObj(source)

  data.photo = {
    thumb: getCdnUrl(source.photo, GetCdnUrlType.THUMB_IMAGE),
    normal: getCdnUrl(source.photo, GetCdnUrlType.NORMAL_IMAGE),
  }

  // Relationships/includes
  data.city = {
    data: transformCity(data?.City)
  }
  delete data.City

  data.neighborhood = {
    data: transformNeighborhood(data?.Neighborhood)
  }
  delete data.Neighborhood

  return data
}
