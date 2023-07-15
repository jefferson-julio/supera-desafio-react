import styles from '../page.module.css';

export default function ResultTable() {
  return (
    <div className={styles.resultsTable}>
      <div className={styles.row} style={{justifyContent: 'start'}}>
        <p>Saldo total: R$ 50,00</p>
        <p>Saldo no período: R$ 100,00</p>
      </div>
      <hr />

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
          <tr>
            <td>14/02/2023</td>
            <td>R$ 50,00</td>
            <td>Depósito</td>
            <td>Fulano</td>
          </tr>
        </tbody>
      </table>

      <hr className={styles.verticalSpace} />
      <div className={styles.verticalSpace}>
        <ul className={styles.row} style={{gap: 4}}>
          <li><button>{'<'}</button></li>
          <li><button>{'<<'}</button></li>
          <li><button>1</button></li>
          <li><button>2</button></li>
          <li><button>3</button></li>
          <li><button>{'>'}</button></li>
          <li><button>{'>>'}</button></li>
        </ul>
      </div>
    </div>
  )
}
