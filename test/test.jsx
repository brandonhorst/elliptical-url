/** @jsx createElement */
/* eslint-env mocha */

import _ from 'lodash'
import { createElement, Phrase } from 'lacona-phrase'
import { URL } from '..'
import { expect } from 'chai'
import { Parser } from 'lacona'

function text(input) {
  return _.map(input.words, 'text').join('')
}

describe('URL', () => {
  let parser, data

  beforeEach(() => {
    parser = new Parser()
    parser.grammar = <URL />
  })

  it('handles IP addresses', () => {
    data = parser.parseArray('http://127.0.0.1')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://127.0.0.1')
    expect(data[0].result).to.equal('http://127.0.0.1')
  })

  it('handles normal URLs', () => {
    data = parser.parseArray('http://google.com')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com')
    expect(data[0].result).to.equal('http://google.com')

    data = parser.parseArray('http://google.com/mail')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com/mail')
    expect(data[0].result).to.equal('http://google.com/mail')
  })

  it('handles ports', () => {
    data = parser.parseArray('http://127.0.0.1:57772')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://127.0.0.1:57772')
    expect(data[0].result).to.equal('http://127.0.0.1:57772')

    data = parser.parseArray('http://google.com:57772')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com:57772')
    expect(data[0].result).to.equal('http://google.com:57772')

    data = parser.parseArray('http://google.com:57772/mail')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com:57772/mail')
    expect(data[0].result).to.equal('http://google.com:57772/mail')
  })

  it('adds http:// by default for basic urls', () => {
    data = parser.parseArray('google.com')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com')
    expect(data[0].result).to.equal('http://google.com')

    data = parser.parseArray('google.com/mail')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com/mail')
    expect(data[0].result).to.equal('http://google.com/mail')
  })

  it('suppresses incomplete URLs', () => {
    data = parser.parseArray('google.c')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('URL')
    expect(data[0].words[0].placeholder).to.be.true

    data = parser.parseArray('goo')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('URL')
    expect(data[0].words[0].placeholder).to.be.true

    data = parser.parseArray('http:')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('URL')
    expect(data[0].words[0].placeholder).to.be.true

    data = parser.parseArray('https')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('URL')
    expect(data[0].words[0].placeholder).to.be.true
  })
})
