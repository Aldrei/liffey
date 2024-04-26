import { Cities, Clients, Employees, IEmployees, Neighborhoods } from '@/database/models'
import { employeeParseEnToPt, employeeParsePtToEn } from '@/database/parse/employee'
import { ITransformedEmployee, transformEmployee } from '@/database/transformers/employee'
import { getPaginateConditions, getPaginateMetadata } from '@/helpers/paginate'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { TEmployeeResponse } from './types'

const prepareFieldsToCreate = async (body: any): Promise<Partial<IEmployees>> => employeeParsePtToEn(body) as Partial<IEmployees>
const prepareFieldsToUpdate = async (body: any): Promise<Partial<IEmployees>> => {
  const data = employeeParsePtToEn(body) as Partial<IEmployees>

  delete data.photo

  return data
}

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

export const list = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang, page, orderASC } = req.query
    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })

    // Raw data
    const total = await Employees.count({ 
      where: {
        client_id: client.id
      },
    })

    const employees = await Employees.findAll({
      where: {
        client_id: client.id,
      },
      order: [
        ['id', orderASC === 'false' ? 'DESC' : 'ASC']
      ],
      include: [{
        model: Cities,
        required: false,
        attributes: ['id', 'name']
      }, {
        model: Neighborhoods,
        required: false,
        attributes: ['id', 'name']
      }],
      ...getPaginateConditions(page)
    })

    // Transformed data
    const transformedData = employees.map((item: IEmployees) => transformEmployee(item))

    const enDataFields = {
      paginate: {
        data: transformedData,
        message: 'Success',
        status: 200,
        ...getPaginateMetadata(page, total, 'employees'),
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.paginate.data = transformedData.map((item: ITransformedEmployee) => employeeParseEnToPt(item))
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

export const detail = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang } = req.query
    const { id } = req.params

    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })

    // Raw data
    const employee = await Employees.findOne({
      where: { client_id: client.id, id },
      include: [{
        model: Cities,
        required: false
      }, {
        model: Neighborhoods,
        required: false
      }]
    })

    // Transformed data
    const transformedData = transformEmployee(employee)

    const enDataFields = {
      employee: {
        data: transformedData,
        message: 'Success',
        status: 200
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.employee.data = employeeParseEnToPt(transformedData)
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

export const store = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user } = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const { body } = req

    body.client_id = client.id

    const inputs = await prepareFieldsToCreate(body);

    const newData = await Employees.create(inputs);

    return res.status(200).json({ 
      employee: {
        data: newData
      }, 
      message: 'Employee created successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user } = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const { id } = req.params
    const { body } = req

    body.client_id = client.id

    const employee = await Employees.findOne({ where: { client_id: client.id, id } })
    const inputs = await prepareFieldsToUpdate(body);

    const newData = await employee.update(inputs);

    return res.status(200).json({
      employee: {
        data: newData
      }, 
      message: 'Employee updated successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}