/** @jsx createElement */
import {createElement} from 'elliptical'

function filter (input) {
  return /^https?:\/\/\S+/i.test(input)
}

function describe ({props}) {
  return <freetext filter={filter}
    splitOn={props.splitOn} limit={props.limit} />
}

export default {describe}