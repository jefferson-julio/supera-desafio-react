'use client'

import SearchForm, { SearchFormFilter } from './components/SearchForm'
import styles from './page.module.css'

export default function Home() {
  const handleFormSubmit = (filter: SearchFormFilter) => {
    console.log(filter);
  }

  return (
    <main className={styles.main}>
      <SearchForm onSubmit={handleFormSubmit} />
    </main>
  )
}
