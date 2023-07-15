import styles from '../page.module.css';
import { Pageable } from "../model"

type PaginationProps = {
  onPageChange: (page: number) => void
  pageable: Pageable<unknown>
}

export default function Pagination({ onPageChange, pageable }: PaginationProps) {
  return (
    <ul className={styles.row} style={{gap: 4}}>
      {!pageable.first && <>
        <li><button onClick={() => onPageChange(pageable.number - 1)}>{'<'}</button></li>
        <li><button onClick={() => onPageChange(0)}>{'<<'}</button></li>
      </>}

      {Array.from({length: pageable.totalPages}, (_, i) => i + 1).map(i =>
        <li key={i}>
          <button disabled={pageable.number == i - 1} onClick={() => onPageChange(i - 1)}>{i}</button>
        </li>
      )}

      {!pageable.last && <> 
        <li><button onClick={() => onPageChange(pageable.number + 1)}>{'>'}</button></li>
        <li><button onClick={() => onPageChange(pageable.totalPages - 1)}>{'>>'}</button></li>
      </>}
    </ul>
  )
}
