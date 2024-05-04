import { IMessage } from "@/database/models"
import { deepCloneObj } from "@/helpers/object"

export interface ITransformedMessages extends IMessage {}

export const transformMessage = (source: IMessage): ITransformedMessages => {
  try {
    const data = <ITransformedMessages>deepCloneObj(source)

    return data
  } catch (error) {
    console.error(`transformMessage: ${error.message}`);
    return null
  }
}