import { Cities, Clients, Employees, IEmployees, Neighborhoods } from '@/database/models'
import { employeeParseEnToPt } from '@/database/parse/employee'
import { ITransformedEmployee, transformEmployee } from '@/database/transformers/employee'
import { getLimit, getNextPage, getOffset, getPerPage, getPrevPage, getTotalPages, getValidPage } from '@/helpers/paginate'
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

export const list = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang, page, orderASC } = req.query

    const ORDER_ASC = orderASC === 'false' ? 'DESC' : 'ASC'
    const PAGE = getValidPage(page)

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
        ['id', ORDER_ASC]
      ],
      offset: getOffset(PAGE),
      limit: getLimit(),
    })

    // Transformed data
    const transformedData = employees.map((item: IEmployees) => transformEmployee(item))

    const enDataFields = {
      paginate: {
        data: transformedData,
        meta: {
          pagination: {
            total: total,
            per_page: getPerPage(),
            current_page: PAGE,
            total_pages: getTotalPages(total),
            links: {
                previous: getPrevPage(PAGE),
                next: getNextPage(PAGE)
            }
          }
        },
        message: 'Success',
        status: 200
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