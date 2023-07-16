import React from 'react'
import ResultTable from './ResultTable'
import { Pageable, Transferencia, TransferenciaSaldo } from '@/app/model'

describe('<ResultTable />', () => {
  it('must show balance information', () => cy.task('generateFakeModel', 'Pageable').then((data) => {
    const fakeTransferenciaSaldoData: TransferenciaSaldo = {
      saldoTotal: 100,
      saldoPeriodo: 30
    }
    const fakePageableData = data as Pageable<Transferencia>
    fakePageableData.content = []
    cy.mount(<ResultTable onPageChange={() => null} balance={fakeTransferenciaSaldoData} data={fakePageableData} />)
    cy.get('[data-cy=balance]').find('p').eq(0).should('have.text', 'Saldo total: R$ 100,00')
    cy.get('[data-cy=balance]').find('p').eq(1).should('have.text', 'Saldo no período: R$ 30,00')
  }))

  it('must show table rows according to pageable content length',
     () => cy.task('generateFakeModel', 'Pageable').then((data1) => {
     () => cy.task('generateFakeModel', 'Transferencia').then((data2) => {
    const fakeTransferenciaSaldoData: TransferenciaSaldo = {
      saldoTotal: 100,
      saldoPeriodo: 30
    }
    const fakePageableData = data1 as Pageable<Transferencia>
    fakePageableData.content = [
      data2 as Transferencia,
      data2 as Transferencia,
      data2 as Transferencia,
    ]
    cy.mount(<ResultTable onPageChange={() => null} balance={fakeTransferenciaSaldoData} data={fakePageableData} />)
    cy.get('tbody > tr').should('have.length', fakePageableData.content.length)
  })}))
})
