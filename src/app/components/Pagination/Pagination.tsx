import styles from '@/app/page.module.css';
import { Pageable } from '@/app/model'

type PaginationProps = {
  onPageChange: (page: number) => void
  pageable: Pageable<unknown>
}

export function Pagination({ onPageChange, pageable }: PaginationProps) {
  return (
    <ul className={styles.row} style={{gap: 4}}>
      {!pageable.first && <>
        <li><button data-cy="first-page" onClick={() => onPageChange(pageable.number - 1)}>{'<'}</button></li>
        <li><button data-cy="prev-page" onClick={() => onPageChange(0)}>{'<<'}</button></li>
      </>}

      {Array.from({length: pageable.totalPages}, (_, i) => i + 1).map(i =>
        <li key={i}>
          <button
            data-cy="page-number"
            disabled={pageable.number == i - 1}
            onClick={() => onPageChange(i - 1)}>{i}</button>
        </li>
      )}

      {!pageable.last && <> 
        <li><button data-cy="next-page" onClick={() => onPageChange(pageable.number + 1)}>{'>'}</button></li>
        <li><button data-cy="last-page" onClick={() => onPageChange(pageable.totalPages - 1)}>{'>>'}</button></li>
      </>}
    </ul>
  )
}
