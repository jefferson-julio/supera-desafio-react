'use client'

import ResultTable from './components/ResultTable'
import SearchForm, { SearchFormFilter } from './components/SearchForm'
import styles from './page.module.css'

export default function Home() {
  const handleFormSubmit = (filter: SearchFormFilter) => {
    console.log(filter);
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <img className={styles.headerImg} alt="Money!" src="/money.gif" />
        <SearchForm onSubmit={handleFormSubmit} />
      </header>
      <div className={styles.verticalSpace} />

      <ResultTable />
    </main>
  )
}
