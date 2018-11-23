import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Child.css'

class Child extends React.Component {
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  method() {
    window.alert('do stuff')
  }
  render() {
    return <h1 className={s.root}>Hello World!</h1>
  }
}

export default withStyles(s)(Child);