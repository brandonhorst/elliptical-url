/** @jsx createElement */
import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'

export default class URL {
  getValue (result) {
    if (!result) return

    return `${result.protocol}${result.remaining}`
  }
  // validate (input) {
  //   return /^(?:(?:https?):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i.test(input)
  // }
  //
  // displayWhen (input) {
  //   return /^(https?:\/\/|h$|ht$|htt$|https?$|https?:$|https?:\/$|https?:\/\/$)?([\w\d-]+(\.\w{0,18}\S*)?)?$/i.test(input)
  // }
  validateWithProtocol (input) {
    return /^(https?\:\/\/)([-_a-z0-9]+\.)+[-a-z]+\S+$/i.test(input)
  }

  displayWhen (input) {
    return /^(https?:\/\/|h$|ht$|htt$|http$|https$|http:$|http:\/$|https:$|https:\/$)?[-_a-z0-9]*(\.\S*)?$/.test(input)
    // return /^(\w{3,8}:\/\/|\w{3,8}$|\w{3,8}:$|\w{3,8}:\/$)?([\w\d-]+(\.\w{0,18}\S*)?)?$/i.test(input)
  }

  validateWithoutProtocol (input) {
    return /^([-_a-z0-9]+\.)+[a-z]+\S+$/i.test(input)
  }

  describe() {
    return (
      <argument text='URL' displayWhen={this.displayWhen}>
        <sequence>
          <choice limit={1} id='protocol'>
            <decorator text='http://' value='http://' />
            <decorator text='https://' value='https://' />
          </choice>
          <freetext validate={this.validateWithoutProtocol} splitOn={this.props.splitOn} limit={this.props.limit} id='remaining' />
        </sequence>
      </argument>
    )
  }
}

URL.defaultProps = {
  splitOn: ' ',
  limit: 1
}
