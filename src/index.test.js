import React from "react"
import { Stack, Frame } from "./index"
import { create as render } from "react-test-renderer"

test("Stack should render", () => {
  const component = render(<Stack>Foo</Stack>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test("Stack should render multiple Frames", () => {
  const component = render(
    <Stack>
      <Frame>{() => <span>Slide 1</span>}</Frame>
      <Frame>{() => <span>Slide 2</span>}</Frame>
    </Stack>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test("Stack should render only Frames that match index", () => {
  const matchedSlide = jest.fn(() => <span>Slide 1</span>)
  const unmatchedSlide = jest.fn(() => <span>Slide 2</span>)
  const component = render(
    <Stack>
      <Frame frame={0}>{() => matchedSlide()}</Frame>
      <Frame frame={1}>{() => unmatchedSlide()}</Frame>
    </Stack>
  )
  expect(unmatchedSlide).not.toBeCalled()
  expect(matchedSlide).toBeCalled()
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test("Stack should render nested Stacks", () => {
  const component = render(
    <Stack startAt={0}>
      <Frame frame={0}>
        {() => (
          <Stack stack="slide-1" startAt={1}>
            <Frame frame={1} stack="slide-1">
              {() => <h1>Heading</h1>}
            </Frame>
          </Stack>
        )}
      </Frame>
      <Frame frame={0}>{() => <div>Slide 2</div>}</Frame>
    </Stack>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test("Stack should respond to action dispatch", () => {
  let triggerForward, triggerBack, triggerJump
  let tree
  const component = render(
    <Stack>
      <Frame>
        {dispatch => {
          triggerForward = () => dispatch("goForward")
          triggerBack = () => dispatch("goBack")
          triggerJump = () => dispatch("jumpTo", 2)
          return <h1>Zero</h1>
        }}
      </Frame>
      <Frame frame={1}>{() => <h1>One</h1>}</Frame>
      <Frame frame={2}>{() => <h1>Two</h1>}</Frame>
    </Stack>
  )
  tree = component.toJSON()
  expect(tree).toMatchSnapshot("initialTree")

  triggerForward()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot("forwardTree")

  triggerBack()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot("backWardTree")

  triggerJump()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot("jumpTree")
})
