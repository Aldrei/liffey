import { INeighborhood } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";

export interface ITransformedNeighborhoods extends INeighborhood {}

export const transformNeighborhood = (source: INeighborhood): ITransformedNeighborhoods => {
  try {
    return <ITransformedNeighborhoods>deepCloneObj(source)
  } catch (error) {
    console.error(`transformNeighborhood: ${error.message}`);
    return null
  }
}
