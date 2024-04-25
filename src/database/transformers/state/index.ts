import { IState } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";

interface ITransformedState extends IState {}

export const transformState = (source: any) => <ITransformedState>deepCloneObj(source)