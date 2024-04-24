import { ICity, INeighborhood, IOwner } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";
import { transformCity } from "../city";
import { transformNeighborhood } from "../neighborhood";

interface TSubData<T> {
  data: T
}
export interface ITransformedOwners extends IOwner {
  city: TSubData<ICity>
  neighborhood: TSubData<INeighborhood>
}

export const transformOwner = (source: IOwner): ITransformedOwners => {
  const owner = <ITransformedOwners>deepCloneObj(source)

  // Relationships/includes
  owner.city = {
    data: transformCity(owner?.City)
  }
  delete owner.City

  owner.neighborhood = {
    data: transformNeighborhood(owner?.Neighborhood)
  }
  delete owner.Neighborhood

  return owner
}
