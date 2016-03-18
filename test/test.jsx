/** @jsx createElement */
/* eslint-env mocha */

import _ from 'lodash'
import { createElement, compile } from 'elliptical'
import URL from '../src'
import { expect } from 'chai'

function text(input) {
  return _.map(input.words, 'text').join('')
}

describe('URL', () => {
  let parse, data

  beforeEach(() => {
    parse = compile(<URL />)
  })

  it('handles IP addresses', () => {
    data = parse('http://127.0.0.1')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://127.0.0.1')
    expect(data[0].result).to.equal('http://127.0.0.1')
  })

  it('handles normal URLs', () => {
    data = parse('http://google.com')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com')
    expect(data[0].result).to.equal('http://google.com')

    data = parse('http://google.com/mail')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com/mail')
    expect(data[0].result).to.equal('http://google.com/mail')
  })

  it('handles ports', () => {
    data = parse('http://127.0.0.1:57772')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://127.0.0.1:57772')
    expect(data[0].result).to.equal('http://127.0.0.1:57772')

    data = parse('http://google.com:57772')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com:57772')
    expect(data[0].result).to.equal('http://google.com:57772')

    data = parse('http://google.com:57772/mail')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com:57772/mail')
    expect(data[0].result).to.equal('http://google.com:57772/mail')
  })

  it('adds http:// by default for basic urls', () => {
    data = parse('google.com')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com')
    expect(data[0].result).to.equal('http://google.com')

    data = parse('google.com/mail')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('http://google.com/mail')
    expect(data[0].result).to.equal('http://google.com/mail')
  })

  it('suppresses incomplete URLs', () => {
    data = parse('google.c')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('URL')
    expect(data[0].words[0].placeholder).to.be.true

    data = parse('goo')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('URL')
    expect(data[0].words[0].placeholder).to.be.true

    data = parse('http:')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('URL')
    expect(data[0].words[0].placeholder).to.be.true

    data = parse('https')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('URL')
    expect(data[0].words[0].placeholder).to.be.true
  })
})
