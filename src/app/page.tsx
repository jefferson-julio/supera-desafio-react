'use client'

import styles from './page.module.css'
import ResultTable from './components/ResultTable'
import { SearchForm, SearchFormFilter } from './components/SearchForm'
import { TransactionFilter, calculateBalance, transactionSearch } from './services'
import { useEffect, useState } from 'react'
import { Pageable, Pagination, Transferencia, TransferenciaSaldo } from './model'
import Loading from './components/Loading'

export default function Home() {
  const [_searchParams, _setSearchParams] = useState<[TransactionFilter, Pagination]>();
  const [searchParams, setSearchParams] = useState<[TransactionFilter, Pagination]>()
  const [searchResult, setSearchResult] = useState<Pageable<Transferencia>>()
  const [balance, setBalance] = useState<TransferenciaSaldo>();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!searchParams) return
    setLoading(true)

    if (!_searchParams || searchParams[0] != _searchParams[0]) {
      _setSearchParams(searchParams);
      calculateBalance(searchParams[0]).then(response => {
        if (response) {
          setBalance(response)
        }
      });
    }

    transactionSearch(searchParams[0], searchParams[1]).then(response => {
      if (response) {
        setSearchResult(response)
      }
      setLoading(false)
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
        <h1>Transferências</h1>
        <img className={styles.headerImg} alt="Money!" src="/money.gif" />
        <br/>
        <SearchForm onSubmit={handleFormSubmit} />
      </header>
      <div className={styles.verticalSpace} />

      {loading && <Loading />}
      {(!loading || searchResult)  &&
        <ResultTable
          onPageChange={handlePageChange}
          data={searchResult}
          balance={balance}
        />
      }
    </main>
  )
}
