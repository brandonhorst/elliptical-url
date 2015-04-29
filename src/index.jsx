/** @jsx createElement */
import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'
import {DigitString} from 'lacona-phrase-number'
import Repeat from 'lacona-phrase-repeat'
import Validator from 'lacona-phrase-validator'

export default class URL {
  getValue(result) {
    // return (result.protocol || 'http://') +
      // result.domain.join('.') + (!_.isUndefined(result.port) ? (':' + result.port) : '')
  }

  noSpace (input) {
    return /^\S+$/.test(input)
  }

  describe() {
    return (
      <sequence>
        <choice id='protocol' optional={true}>
          <literal text='http://' value='http://' />
          <literal text='https://' value='https://' />
        </choice>
        <choice>
          <placeholder descriptor='ip address'>
            <Repeat id='domain' min={4} max={4}>
              <content>
                <DigitString min={0} max={255} allowLeadingZeros={false} />
              </content>
              <separator><literal text='.' /></separator>
            </Repeat>
          </placeholder>
          <placeholder descriptor='domain'>
            <sequence>
              <freetext limit={1} validate={this.noSpace} />
              <literal text='.' />
              <freetext limit={1} validate={this.noSpace} />
            </sequence>
          </placeholder>
        </choice>
        <sequence optional={true} merge={true}>
          <literal text=':' />
          <DigitString id='port' max={65535} />
        </sequence>
      </sequence>
    )
  }
}
