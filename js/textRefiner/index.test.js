const { test, expect, describe } = require('@jest/globals')
const sut = require('./index')
const faker = require('faker')

// test('sut transforms "hello  world: to "hello world"', () => {
//     const actual = sut("hello  world")
//     expect(actual).toBe("hello world")
// })

// test('sut transforms "hello    world" to "hello world', () => {
//     const actual = sut("hello    world")
//     expect(actual).toBe("hello world")
// })

// test('sut transforms "hello   world" to "hello world', () => {
//     const actual = sut("hello   world")
//     expect(actual).toBe("hello world")
// })

// test('sut correctly works',() => {
//     for (const source of ['hello  world', 'hello   world', 'hello    world']) {
//         const actual = sut(source)
//         expect(actual).toBe('hello world')
//     }
// })

test.each`
  source                 | expected
  ${"hello  world"}      | ${"hello world"}
  ${"hello   world"}     | ${"hello world"}
  ${"hello    world"}    | ${"hello world"}
  ${"hello     world"}   | ${"hello world"}
  ${"hello      world"}  | ${"hello world"}
  ${"hello       world"} | ${"hello world"}
`('sut transforms "$source" to "$expected"', ({ source, expected }) => {
  const actual = sut(source)
  expect(actual).toBe(expected) 
})

test.each`
  source             | expected
  ${"hello\t world"} | ${"hello world"}
  ${"hello \tworld"} | ${"hello world"}
`('sut transforms "$source" that contains tab character to "$expected"', ({source, expected}) => {
  const actual = sut(source)
  expect(actual).toBe(expected)
})

test.each`
  source | bannedWords | expected
  ${"hello mockist"} | ${["mockist", "purist"]} | ${"hello *******"}
  ${"hello purist"} | ${["mockist", "purist"]} | ${"hello ******"}
`('sut fransforms "$source" to "$expected"', ({source, bannedWords, expected}) => {
  const actual = sut(source, { bannedWords })
  expect(actual).toBe(expected)

})

describe('given banned word', () => {
  const bannedWord = faker.lorem.word()
  const source = "hello " + bannedWord
  const expected = "hello " + "*".repeat(bannedWord.length)

  test(`${bannedWord} when invoke sut then it returns ${expected}`, () => {
    const actual = sut(source, {bannedWords: [bannedWord]})
    expect(actual).toBe(expected)
  })
})

test.each`
  source | expected
  ${" hello world"} | ${"hello world"}
`('sut correctly trims whitespace', ({source, expected}) => {
  const actual = sut(source)
  expect(actual).toBe(expected)
})