import { INeighborhood } from "@/database/models";
import { ITransformedNeighborhoods } from "@/database/transformers/neighborhood";

export type TNeighborhoodResponse = ITransformedNeighborhoods & INeighborhood 