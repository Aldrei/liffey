import { ICity } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";

export interface ITransformedCities extends ICity {
  long_desc: string
}

export const transformCity = (source: ICity): ITransformedCities => {
  try {
    const data = <ITransformedCities>deepCloneObj(source)

    data.long_desc = `${data.name}`

    return data
  } catch (error) {
    console.error(`transformCity: ${error}`);
    return null
  }
}
