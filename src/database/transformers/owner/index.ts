import { IOwner } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";

export interface ITransformedOwners extends IOwner {}

export const transformOwner = (source: IOwner): ITransformedOwners => {
  return <ITransformedOwners>deepCloneObj(source)
}
