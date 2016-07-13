/** @jsx createElement */
import {createElement} from 'elliptical'
import ImpliedURL from './implied-url'
import SpecificURL from './specific-url'

const defaultProps = {
  splitOn: /\s|,/,
  label: 'URL',
  limit: 1
}

function suppressWhen (input) {
  return /^(h|ht|htt|https?|https?:|https?:\/|https?:\/\/|(https?:\/\/)?|\w*|\w+\.|\w+\.[a-z])$/.test(input)
}

function describe ({props}) {
  return (
    <placeholder
      label={props.label}
      arguments={props.phraseArguments || (props.phraseArguments ? [props.phraseArgument] : [props.label])}
      suppressWhen={suppressWhen}>
      <choice>
        <ImpliedURL {...props} id={undefined} />
        <SpecificURL {...props} id={undefined} />
      </choice>
    </placeholder>
  )
}

export const URL = {defaultProps, describe}
