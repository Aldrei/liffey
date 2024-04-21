import { Employees } from '@/database/models'
import { employeeParseEnToPt } from '@/database/parse/employee'
import { ITransformedEmployee, transformEmployee } from '@/database/transformers/employee'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { TEmployeeResponse } from './types'

export const search = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang } = req.query
    const { search } = req.params

    const { client } = extractUserFromToken(req)

    // Raw data
    const employee = await Employees.findAll({ 
      where: { 
        client_id: client.id,
        name: {
          [Op.like]: `%${search}%`
        }
      } 
    })

    // Transformed data
    const transformedEmployees = employee.map(emp => transformEmployee(emp))

    const enDataFields = {
      data: transformedEmployees,
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.data = transformedEmployees.map((item: ITransformedEmployee) => employeeParseEnToPt<TEmployeeResponse>(item))
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}
