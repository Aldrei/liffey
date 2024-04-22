import ENV from "@/config";

const PAGINATE_PER_PAGE = 10

export const getValidPage = (page: any) => page && Number.isInteger(parseInt(page)) ? parseInt(page) || 1 : 1

export const getNextPage = (page: number) => `${ENV.APP_PROTOCOL}${ENV.APP_HOST}:${ENV.APP_PORT}/api/properties?page=${getValidPage(page)+1}`

export const getPrevPage = (page: number) => `${ENV.APP_PROTOCOL}${ENV.APP_HOST}:${ENV.APP_PORT}/api/properties?page=${page > 0 ? getValidPage(page)-1 : 0}`

export const getOffset = (page: number) => (getValidPage(page) * PAGINATE_PER_PAGE) - PAGINATE_PER_PAGE

export const getPerPage = () => PAGINATE_PER_PAGE

export const getLimit = () => PAGINATE_PER_PAGE