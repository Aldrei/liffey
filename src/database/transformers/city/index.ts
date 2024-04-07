import { ICity } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";

interface ITransformedCities extends ICity {}

export const transformCity = (source: ICity): ITransformedCities => {
  return <ITransformedCities>deepCloneObj(source)
}
