import React from 'react'
import { Pagination } from './Pagination'
import type { Pageable } from '@/app/model'

describe('<Pagination />', () => {
  it('must have the correct number of page index buttons', () => cy.task('generateFakeModel', 'Pageable').then((data) => {
    const fakePageableData = data as Pageable<unknown>
    fakePageableData.number = 0
    fakePageableData.totalPages = 5
    fakePageableData.last = false
    fakePageableData.first = true
    cy.mount(<Pagination pageable={fakePageableData} onPageChange={() => null} />)
    cy.get('[data-cy=page-number]').should('have.length', 5)
  }))

  it('next and last page buttons must disappear at the last page', () => cy.task('generateFakeModel', 'Pageable').then((data) => {
    const fakePageableData = data as Pageable<unknown>
    fakePageableData.number = 4
    fakePageableData.totalPages = 5
    fakePageableData.last = true
    fakePageableData.first = false
    cy.mount(<Pagination pageable={fakePageableData} onPageChange={() => null} />)
    cy.get('[data-cy=next-page]').should('not.exist')
    cy.get('[data-cy=last-page]').should('not.exist')
  }))

  it('previous and first page buttons must disappear at the first page', () => cy.task('generateFakeModel', 'Pageable').then((data) => {
    const fakePageableData = data as Pageable<unknown>
    fakePageableData.number = 0
    fakePageableData.totalPages = 5
    fakePageableData.last = false
    fakePageableData.first = true
    cy.mount(<Pagination pageable={fakePageableData} onPageChange={() => null} />)
    cy.get('[data-cy=prev-page]').should('not.exist')
    cy.get('[data-cy=first-page]').should('not.exist')
  }))

  it('all page control buttons must appear if page number is between first and last', () => cy.task('generateFakeModel', 'Pageable').then((data) => {
    const fakePageableData = data as Pageable<unknown>
    fakePageableData.number = 2
    fakePageableData.totalPages = 5
    fakePageableData.last = false
    fakePageableData.first = false
    cy.mount(<Pagination pageable={fakePageableData} onPageChange={() => null} />)
    cy.get('[data-cy=prev-page]').should('exist')
    cy.get('[data-cy=first-page]').should('exist')
    cy.get('[data-cy=next-page]').should('exist')
    cy.get('[data-cy=last-page]').should('exist')
  }))

  it('current page index button must be disabled', () => cy.task('generateFakeModel', 'Pageable').then((data) => {
    const fakePageableData = data as Pageable<unknown>
    fakePageableData.number = 3
    fakePageableData.totalPages = 7
    fakePageableData.last = false
    fakePageableData.first = false
    cy.mount(<Pagination pageable={fakePageableData} onPageChange={() => null} />)
    cy.get('[data-cy=page-number]').eq(3).should('be.disabled')
  }))

  it('click on next page button must fire onPageChange with increased page number', () => cy.task('generateFakeModel', 'Pageable').then((data) => {
    const fakePageableData = data as Pageable<unknown>
    fakePageableData.number = 3
    fakePageableData.totalPages = 7
    fakePageableData.last = false
    fakePageableData.first = false
    const onPageChangeSpy = cy.spy().as('onPageChangeSpy')

    cy.mount(<Pagination pageable={fakePageableData} onPageChange={onPageChangeSpy} />)
    cy.get('[data-cy=next-page]').click()
    cy.get('@onPageChangeSpy').should('have.been.calledWith', 4)
  }))

  it('click on page index button must fire onPageChange with exact page number',  () => cy.task('generateFakeModel', 'Pageable').then((data) => {
    const fakePageableData = data as Pageable<unknown>
    fakePageableData.number = 1
    fakePageableData.totalPages = 3
    fakePageableData.last = false
    fakePageableData.first = false
    const onPageChangeSpy = cy.spy().as('onPageChangeSpy')

    cy.mount(<Pagination pageable={fakePageableData} onPageChange={onPageChangeSpy} />)
    cy.get('[data-cy=page-number]').eq(2).click()
    cy.get('@onPageChangeSpy').should('have.been.calledWith', 2)
  }))

  it('click on size selector must fire onPageChange with exact size number', () => cy.task('generateFakeModel', 'Pageable').then((data) => {
    const fakePageableData = data as Pageable<unknown>
    fakePageableData.number = 1
    fakePageableData.totalPages = 3
    fakePageableData.last = false
    fakePageableData.first = false
    const onPageChangeSpy = cy.spy().as('onPageChangeSpy')

    cy.mount(<Pagination pageable={fakePageableData} onPageChange={onPageChangeSpy} />)
    cy.get('[data-cy=page-size]').select('15')
    cy.get('@onPageChangeSpy').should('have.been.calledWith', 1, 15)
  }))
})
