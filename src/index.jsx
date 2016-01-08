/** @jsx createElement */
import {createElement, Phrase} from 'lacona-phrase'

export class URL extends Phrase {
  static defaultProps = {
    splitOn: /\s|,/,
    argument: 'URL',
    limit: 1
  }

  suppressWhen (input) {
    return /^(h|ht|htt|https?|https?:|https?:\/|https?:\/\/|(https?:\/\/)?|\w*|\w+\.|\w+\.[a-z])$/.test(input)
  }

  describe() {
    return (
      <label text={this.props.argument} suppressWhen={this.suppressWhen}>
        <choice>
          <ImpliedURL {...this.props} />
          <SpecifiedURL {...this.props} />
        </choice>
      </label>
    )
  }
}

class ImpliedURL extends Phrase {
  getValue (result) {
    return `http://${result.remaining}`
  }

  filter (input) {
    return /^(\w+\.)+\w{2,63}\S*$/i.test(input)
  }

  describe () {
    return (
      <map function={this.getValue}>
        <sequence>
          <literal decorate allowInput={false} text='http://'/>
          <freetext filter={this.filter} splitOn={this.props.splitOn} limit={this.props.limit} id='remaining' />
        </sequence>
      </map>
    )
  }

}

class SpecifiedURL extends Phrase {
  filter (input) {
    return /^https?:\/\/\S+/i.test(input)
  }

  describe () {
    return <freetext filter={this.filter} splitOn={this.props.splitOn} limit={this.props.limit} />
  }
}
