/** @jsx createElement */
import {createElement} from 'elliptical'

function mapResult (result) {
  return `http://${result.remaining}`
}

function filter (input) {
  return /^([\w-]+\.)+\w{2,63}\S*$/i.test(input)
}

function describe ({props}) {
  return (
    <sequence>
      <literal decorate allowInput={false} text='http://'/>
      <freetext filter={filter} splitOn={props.splitOn} limit={props.limit} id='remaining' />
    </sequence>
  )
}

export default {mapResult, describe}