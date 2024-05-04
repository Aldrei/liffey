import { IMessage, IPropertiesAgencies } from "@/database/models"
import { deepCloneObj } from "@/helpers/object"

export interface ITransformedPropertyAgency extends IMessage {}

export const transformPropertyAgency = (source: IPropertiesAgencies): ITransformedPropertyAgency => {
  try {
    const data = <ITransformedPropertyAgency>deepCloneObj(source)

    return data
  } catch (error) {
    console.error(`transformMessage: ${error.message}`);
    return null
  }
}