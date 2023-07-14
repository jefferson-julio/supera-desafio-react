import styles from '../page.module.css';

export default function ResultTable() {
  return (
    <div>
      <table className={styles.table}>
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
    </div>
  )
}
