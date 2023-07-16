import React from 'react'
import { SearchForm } from './SearchForm'

describe('<SearchForm />', () => {
  it('clicking submit fires a onSubmit event with a filter object', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy')
    cy.mount(<SearchForm onSubmit={onSubmitSpy} />)
    cy.get('[type=submit]').click()
    cy.get('@onSubmitSpy').should(
      'have.been.calledWith',
      { date_start: '', date_end: '', op_name: ''}
    )
  })

  it('clicking submit after typing input params fires a onSumit event with a according filter object', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy')
    const filterValue = {
      date_start: '2019-10-04',
      date_end: '2020-01-01',
      op_name: 'fulano'
    }
    cy.mount(<SearchForm onSubmit={onSubmitSpy} />)
    cy.get('[name=date_start]').type(filterValue.date_start)
    cy.get('[name=date_end]').type(filterValue.date_end)
    cy.get('[name=op_name]').type(filterValue.op_name)
    cy.get('[type=submit]').click()
    cy.get('@onSubmitSpy').should('have.been.calledWith', filterValue)
  })
})
