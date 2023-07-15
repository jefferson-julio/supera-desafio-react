import moment from "moment"
import { Pageable, Pagination, Transferencia, TransferenciaSaldo } from "../model"

export type TransactionFilter = {
  nomeOperadorTransacao?: string
  dataTransferenciaStart?: Date
  dataTransferenciaEnd?: Date
}

const createFilterQuery = (filter: TransactionFilter) => {
  const query = new URLSearchParams()

  if (filter.nomeOperadorTransacao) {
    query.set('nomeOperadorTransacao', filter.nomeOperadorTransacao)
  }

  if (filter.dataTransferenciaStart) {
    query.set('dataTransferenciaStart', moment(filter.dataTransferenciaStart).format('yyyy-MM-DD'))
  }

  if (filter.dataTransferenciaEnd) {
    query.set('dataTransferenciaEnd', moment(filter.dataTransferenciaEnd).format('yyyy-MM-DD'))
  }

  return query
}

export const transactionSearch = async (filter: TransactionFilter, page: Pagination) => {
  const query = createFilterQuery(filter)

  query.set('page', String(page.page))

  if (page.size) {
    query.set('size', String(page.size))
  }

  const response = await fetch(`http://192.168.0.83:8080/transaction/search?${query}`)

  if (response.status >= 200 && response.status < 300) {
    const responseJson = await response.json() as Pageable<Transferencia>
    return responseJson
  }

  return null
}

export const calculateBalance = async (filter: TransactionFilter) => {
  const query = createFilterQuery(filter)

  const response = await fetch(`http://192.168.0.83:8080/transaction/calculateBalance?${query}`, {
    method: 'POST',
  })

  if (response.status >= 200 && response.status < 300) {
    const responseJson = await response.json() as TransferenciaSaldo
    return responseJson
  }

  return null
}
