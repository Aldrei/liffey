import ENV from "@/config";

const PAGINATE_PER_PAGE = 10

export const getValidPage = (page: any) => page && Number.isInteger(parseInt(page)) ? parseInt(page) || 1 : 1

export const getNextPage = (page: number, model: string) => `${ENV.APP_PROTOCOL}${ENV.APP_HOST}:${ENV.APP_PORT}/api/${model}?page=${getValidPage(page)+1}`

export const getPrevPage = (page: number, model: string) => `${ENV.APP_PROTOCOL}${ENV.APP_HOST}:${ENV.APP_PORT}/api/${model}?page=${page > 0 ? getValidPage(page)-1 : 0}`

export const getOffset = (page: number) => (getValidPage(page) * PAGINATE_PER_PAGE) - PAGINATE_PER_PAGE

export const getPerPage = () => PAGINATE_PER_PAGE

export const getLimit = () => PAGINATE_PER_PAGE

export const getTotalPages = (total: number) => Math.ceil(total / PAGINATE_PER_PAGE)

export const getPaginateConditions = (page: any) => ({
  offset: getOffset(getValidPage(page)),
  limit: getLimit()
})

export const getPaginateMetadata = (page: any, total: number, model: string) => ({
  meta: {
    pagination: {
      total: total,
      per_page: getPerPage(),
      current_page: getValidPage(page),
      total_pages: getTotalPages(total),
      links: {
          previous: getPrevPage(getValidPage(page), model),
          next: getNextPage(getValidPage(page), model)
      }
    }
  }
})