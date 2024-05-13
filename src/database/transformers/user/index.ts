import { IUser } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";

export interface ITransformedUser extends IUser {}

export const transformUser = (source: IUser): ITransformedUser => {
  try {
    const data = <ITransformedUser>deepCloneObj(source)

    delete data.password
    delete data.password_temp

    return data
  } catch (error) {
    console.error(`transformUser: ${error}`);
    return null
  }
}
