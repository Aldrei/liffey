import { ICity } from "@/database/models";
import { ITransformedCities } from "@/database/transformers/city";

export type TCityResponse = ICity & ITransformedCities
