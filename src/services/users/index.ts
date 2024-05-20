import { Clients, IUser, RoleUser, Users } from "@/database/models";
import { encryptPass, generateUsername } from "@/helpers/pass";
import { extractUserFromToken } from "@/helpers/token";


import db from "@/database/instance";
import { userParsePayloadPtToEn } from "@/database/parse/user";
import { Request, Response } from 'express';

const prepareFieldsToCreate = async (body: any): Promise<Partial<IUser & { roles: string[] }>> => {
  const data = userParsePayloadPtToEn<IUser>(body)

  data.password = encryptPass(data.password)
  data.username = generateUsername()

  return data
}

export const store = async (req: Request, res: Response): Promise<any> => {
  /**
   * Start transaction
  */
  const t = await db.transaction()

  try {
    const { user } = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const { body } = req

    body.client_id = client.id

    const inputs = await prepareFieldsToCreate(body);

    const newData = await Users.create(inputs, { transaction: t });

    const newRoles = []
    for (const role of inputs.roles) {
      const newRole = await RoleUser.create({ user_id: newData.id, role_name: role }, { transaction: t })
      newRoles.push(newRole)
    }

    await t.commit()

    return {
      user: {
        data: {
          ...newData.dataValues,
          roles: {
            data: newRoles
          }
        }
      }, 
      message: 'User created successfully',
      status: 200
    };
  } catch (error) {
    console.error(error);

    /**
     * Rollback transaction
    */
    await t.rollback();

    return { error: error.message };
  }
}
