import moment from "moment"
import { Pageable, Pagination, Transferencia } from "../model"

export type TransactionFilter = {
  nomeOperadorTransacao?: string
  dataTransferenciaStart?: Date
  dataTransferenciaEnd?: Date
}

export const transactionSearch = async (filter: TransactionFilter, page: Pagination) => {
  const query = new URLSearchParams({
    page: String(page.page),
  })

  if (page.size) {
    query.set('size', String(page.size))
  }

  if (filter.nomeOperadorTransacao) {
    query.set('nomeOperadorTransacao', filter.nomeOperadorTransacao)
  }

  if (filter.dataTransferenciaStart) {
    query.set('dataTransferenciaStart', moment(filter.dataTransferenciaStart).format('yyyy-MM-DD'))
  }

  if (filter.dataTransferenciaEnd) {
    query.set('dataTransferenciaEnd', moment(filter.dataTransferenciaEnd).format('yyyy-MM-DD'))
  }

  const response = await fetch(`http://192.168.0.83:8080/transaction/search?${query}`)

  if (response.status >= 200 && response.status < 300) {
    const responseJson = await response.json() as Pageable<Transferencia>
    return responseJson
  }

  return null
}
