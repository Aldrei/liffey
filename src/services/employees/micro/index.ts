import { Cities, Employees, Neighborhoods, Roles, Users } from "@/database/models"
import { employeeParseEnToPt } from "@/database/parse/employee"
import { transformEmployee } from "@/database/transformers/employee"

interface IGetEmployee {
  clientId: string
  employeeId?: string
  userId?: string
  lang: string
}

export const getEmployee = async ({ clientId, employeeId, userId, lang }: IGetEmployee) => {
  try {
    // Raw data
    const clause: any = {}

    clause.client_id = clientId

    if (employeeId) clause.id = employeeId
    if (userId) clause.user_id = userId

    const employee = await Employees.findOne({
      where: clause,
      include: [{
        model: Cities,
        required: false
      }, {
        model: Neighborhoods,
        required: false
      }, 
      {
        model: Users,
        required: false,
        attributes: ['id', 'username'],
        include: [{
          model: Roles,
          required: false,
          attributes: ['name']
        }]
      }
    ]
    })

    // Transformed data
    const transformedData = transformEmployee(employee)

    // Translated fields
    if (lang !== 'EN') return employeeParseEnToPt(transformedData)

    return transformedData
  } catch (error) {
    console.log(error)
    return error.message
  }
}