import { IUser } from "@/database/models";
import { deepCloneObj } from "@/helpers/object";

interface TSubData<T> {
  data: T[]
}

export interface ITransformedUser extends IUser {
  roles?: TSubData<string>
}

export const transformUser = (source: IUser): ITransformedUser => {
  try {
    const data = <ITransformedUser>deepCloneObj(source)

    delete data.password
    delete data.password_temp

    data.roles = {
      data: data?.Roles?.length ? data.Roles.map(role => role.name) : []
    }
    delete data.Roles

    return data
  } catch (error) {
    console.error(`transformUser: ${error}`);
    return null
  }
}
