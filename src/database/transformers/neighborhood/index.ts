import { INeighborhood } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";

interface ITransformedNeighborhoods extends INeighborhood {}

export const transformNeighborhood = (source: INeighborhood): ITransformedNeighborhoods => {
  return <ITransformedNeighborhoods>deepCloneObj(source)
}
