import { Employees } from '@/database/models'
import { transformEmployee } from '@/database/transformers/employee'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'

export const search = async (req: Request, res: Response): Promise<any> => {
  try {
    const { search } = req.params

    const { client } = extractUserFromToken(req)

    const employee = await Employees.findAll({ 
      where: { 
        client_id: client.id,
        name: {
          [Op.like]: `%${search}%`
        }
      } 
    })

    const transformedEmployees = employee.map(emp => transformEmployee(emp))

    return res.status(200).json({ data: transformedEmployees });
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}
