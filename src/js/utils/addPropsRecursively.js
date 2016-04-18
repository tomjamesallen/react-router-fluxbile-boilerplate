import React from 'react'

export default function addPropsRecursively(el, props) {
  let cloneChildren = []

  React.Children.forEach(el.props.children, (child) => {
    let replacement = addPropsRecursively(child, props)
    cloneChildren.push(replacement)
  })

  if (cloneChildren.length) {
    props.children = cloneChildren
  }

  return React.cloneElement(el, props)
}
