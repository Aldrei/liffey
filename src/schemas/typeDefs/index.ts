import propertyTypeDef from './properties'
import userTypeDefs from './users'

const typeDefs = `#graphql
  scalar Date

  ${userTypeDefs}
  ${propertyTypeDef}
`

export { typeDefs }
