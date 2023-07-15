import moment from 'moment';
import { Pageable, Transferencia } from '../model';
import styles from '../page.module.css';
import Pagination from './Pagination';

type ResultTableProps = {
  onPageChange: (page: number) => void
  data?: Pageable<Transferencia>
}

const parseMoney = (val: number) => `R$ ${String(val.toFixed(2)).replace('.', ',')}`

export default function ResultTable({ onPageChange, data }: ResultTableProps) {

  if (!data) {
    return <div>Realize uma pesquisa!</div>
  }

  return (
    <>
      <div className={styles.row}>
        <p>Saldo total: R$ 50,00</p>
        <p>Saldo no período: R$ 100,00</p>
      </div>
      <hr />

      <div className={styles.resultsTable}>
        <table className={[styles.table, styles.verticalSpace].join(' ')}>
          <thead>
            <tr>
              <th>Dados</th>
              <th>Valência</th>
              <th>Tipo</th>
              <th>Nome do operador transacionado</th>
            </tr>
          </thead>

          <tbody>
            {data.content.map(t =>
              <tr key={t.id}>
                <td>{moment(t.dataTransferencia).format('DD/MM/yyyy')}</td>
                <td>{parseMoney(t.valor)}</td>
                <td>{t.tipo}</td>
                <td style={{textAlign: t.nomeOperadorTransacao ? 'left' : 'center'}}>
                  {t.nomeOperadorTransacao || "-"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

      <hr className={styles.verticalSpace} />
      <div className={styles.verticalSpace}>
        <Pagination onPageChange={onPageChange} pageable={data} />
      </div>
    </>
  )
}
