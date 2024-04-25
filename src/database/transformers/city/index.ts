import { ICity, IState } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";
import { transformState } from "../state";

export interface ITransformedCities extends ICity {
  long_desc: string
  state: IState
}

export const transformCity = (source: ICity): ITransformedCities => {
  try {
    const data = <ITransformedCities>deepCloneObj(source)

    data.long_desc = `${data.name}`

    data.state = transformState(data?.State)
    delete data.State

    return data
  } catch (error) {
    console.error(`transformCity: ${error}`);
    return null
  }
}
