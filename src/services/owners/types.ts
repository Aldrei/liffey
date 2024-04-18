import { IOwner } from "@/database/models";
import { ITransformedOwners } from "@/database/transformers/owner";

export type TOwnerResponse = ITransformedOwners & IOwner