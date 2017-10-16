import React, { Component } from "react"
import  PropTypes from "prop-types"
import { Broadcast } from "react-broadcast"

class Stack extends Component {
  state = { index: this.props.startAt }

  reducer = {
    goForward: () => ({ index }) => ({ index: index + 1 }),
    goBack: () => ({ index }) => ({ index: Math.max(0, index - 1) }),
    jumpTo: index => ({ index }),
  }

  dispatch = (type, payload) => {
    if (!this.reducer[type]) return this.setState({})
    this.setState(this.reducer[type](payload))
  }

  render() {
    const { dispatch } = this
    const { stack, children } = this.props
    const { index } = this.state
    return (
      <Broadcast value={{ dispatch, index }} channel={stack}>
        <div>{children}</div>
      </Broadcast>
    )
  }
}

Stack.defaultProps = {
  stack: "slides",
  startAt: 0,
}

Stack.propTypes = {
  stack: PropTypes.string,
  startAt: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
}

export default Stack
