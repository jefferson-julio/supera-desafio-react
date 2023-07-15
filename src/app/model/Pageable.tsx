type Sort = {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface Pageable<Content> {
  content: Array<Content>
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: Sort
    unpaged: boolean
  }
  size: boolean
  sort: Sort
  totalElements: number
  totalPages: number
}

export type Pagination = {
  page: number
  size?: number
}
