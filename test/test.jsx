/** @jsx createElement */
/* eslint-env mocha */

import {createElement, Phrase} from 'lacona-phrase'
import URL from '..'
import {expect} from 'chai'
import fulltext from 'lacona-util-fulltext'
import {Parser} from 'lacona'

function from (i) {const a = []; for (let x of i) a.push(x); return a}

describe('URL', () => {
  let parser, data

  beforeEach(() => {
    parser = new Parser()
  })

  it('handles IP addresses with ports', () => {
    parser.sentences = [<URL />]

    data = from(parser.parse('http://127.0.0.1:57772'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('http://127.0.0.1:57772')
    expect(data[0].result).to.equal('http://127.0.0.1:57772')

    data = from(parser.parse('http://127.0.0.300:57772'))
    expect(data).to.have.length(0)
  })
})
