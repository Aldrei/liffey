import { IMessage } from "@/database/models"
import { deepCloneObj } from "@/helpers/object"
import { ITransformedOwners } from "../owner"

export interface ITransformedMessages extends IMessage {}

export const transformMessage = (source: IMessage): ITransformedOwners => {
  try {
    const owner = <ITransformedOwners>deepCloneObj(source)

    return owner
  } catch (error) {
    console.error(`transformMessage: ${error.message}`);
    return null
  }
}