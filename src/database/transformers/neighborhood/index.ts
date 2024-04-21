import { INeighborhood } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";

export interface ITransformedNeighborhoods extends INeighborhood {}

export const transformNeighborhood = (source: INeighborhood): ITransformedNeighborhoods => {
  return <ITransformedNeighborhoods>deepCloneObj(source)
}
