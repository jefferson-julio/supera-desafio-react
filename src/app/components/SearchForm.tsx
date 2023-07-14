import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import styles from '../page.module.css';

export type SearchFormFilter = {
  date_start: string
  date_end: string
  op_name: string
}

type SearchFormProps = {
  onSubmit: (filter: SearchFormFilter) => void
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [filter, setFilter] = useState<SearchFormFilter>({
    date_start: '',
    date_end: '',
    op_name: '',
  })

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSubmit(filter)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label htmlFor="date_start">Data de início</label>
          <input id="date_start" name="date_start" type="date" onChange={handleInput} />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="date_end">Data de fim</label>
          <input id="date_end" name="date_end" type="date" onChange={handleInput} />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="op_name">Nome operador transacionado</label>
          <input id="op_name" name="op_name" type="text" onChange={handleInput} />
        </div>
      </div>

      <div className={[styles.formSubmitButton, styles.verticalSpace].join(' ')}>
        <button type="submit">Pesquisar</button>
      </div>
    </form>
  )
}
