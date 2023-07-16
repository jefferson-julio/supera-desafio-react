import { Conta } from './Conta'

export interface Transferencia {
  conta: Conta
  dataTransferencia: string
  id: number
  nomeOperadorTransacao: string
  tipo: string
  valor: number
}
