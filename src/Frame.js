import React from "react"
import PropTypes from 'prop-types'
import { Subscriber } from "react-broadcast"

const Frame = ({ stack, frame, exact, children }) => (
  <Subscriber channel={stack}>
    {({ dispatch, index }) => {
      if (exact ? frame === index : frame <= index) return children(dispatch)
      return null
    }}
  </Subscriber>
)

Frame.defaultProps = {
  stack: 'slides',
  frame: 0,
  exact: true,
}

Frame.propTypes = {
  stack: PropTypes.string,
  frame: PropTypes.number,
  exact: PropTypes.bool,
  children: PropTypes.func,
}

export default Frame
