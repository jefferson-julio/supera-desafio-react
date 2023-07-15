'use client'

import styles from './page.module.css'
import ResultTable from './components/ResultTable'
import SearchForm, { SearchFormFilter } from './components/SearchForm'
import { TransactionFilter, transactionSearch } from './services'
import { useEffect, useState } from 'react'
import { Pageable, Pagination, Transferencia } from './model'

export default function Home() {
  const [searchParams, setSearchParams] = useState<[TransactionFilter, Pagination]>()
  const [searchResult, setSearchResult] = useState<Pageable<Transferencia>>();

  useEffect(() => {
    if (!searchParams) return;

    transactionSearch(searchParams[0], searchParams[1]).then(response => {
      if (response) {
        setSearchResult(response)
      }
    })
  }, [searchParams])

  const handleFormSubmit = async (filter: SearchFormFilter) => {
    const transactionFilter: TransactionFilter = {}
    
    if (filter.date_start.length > 0) {
      transactionFilter.dataTransferenciaStart = new Date(filter.date_start)
    }

    if (filter.date_end.length > 0) {
      transactionFilter.dataTransferenciaEnd = new Date(filter.date_end)
    }

    if (filter.op_name.length > 0) {
      transactionFilter.nomeOperadorTransacao = filter.op_name
    }

    setSearchParams([transactionFilter, { page: 0, size: 2 }])
  }

  const handlePageChange = (page: number) => {
    if (!searchParams) return

    setSearchParams([searchParams[0], { ...searchParams[1], page: page }])
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <img className={styles.headerImg} alt="Money!" src="/money.gif" />
        <SearchForm onSubmit={handleFormSubmit} />
      </header>
      <div className={styles.verticalSpace} />

      <ResultTable
        onPageChange={handlePageChange}
        data={searchResult}
      />
    </main>
  )
}
