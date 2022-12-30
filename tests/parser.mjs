'use strict';

import { assert, test } from 'st';

import { parse } from '../lib/parser.mjs';

test('equality expressions are parsed correctly', () => {
  const parsed = parse('foo == "bar"');

  assert.eq(typeof parsed, 'object', 'an object is returned');
  assert.eq(parsed.left, 'foo', 'the left side is parsed correctly');
  assert.eq(parsed.right, 'bar', 'the right side is parsed correctly');
  assert.eq(parsed.operator, '==', 'the operator is parsed correctly');
});

test('greater-than equal expressions are parsed correctly', () => {
  const parsed = parse('foo >= "bar"');

  assert.eq(typeof parsed, 'object', 'an object is returned');
  assert.eq(parsed.left, 'foo', 'the left side is parsed correctly');
  assert.eq(parsed.right, 'bar', 'the right side is parsed correctly');
  assert.eq(parsed.operator, '>=', 'the operator is parsed correctly');
});

test('less-than equal expressions are parsed correctly', () => {
  const parsed = parse('foo <= "bar"');

  assert.eq(typeof parsed, 'object', 'an object is returned');
  assert.eq(parsed.left, 'foo', 'the left side is parsed correctly');
  assert.eq(parsed.right, 'bar', 'the right side is parsed correctly');
  assert.eq(parsed.operator, '<=', 'the operator is parsed correctly');
});

test('greater-than expressions are parsed correctly', () => {
  const parsed = parse('foo > "bar"');

  assert.eq(typeof parsed, 'object', 'an object is returned');
  assert.eq(parsed.left, 'foo', 'the left side is parsed correctly');
  assert.eq(parsed.right, 'bar', 'the right side is parsed correctly');
  assert.eq(parsed.operator, '>', 'the operator is parsed correctly');
});

test('less-than expressions are parsed correctly', () => {
  const parsed = parse('foo < "bar"');

  assert.eq(typeof parsed, 'object', 'an object is returned');
  assert.eq(parsed.left, 'foo', 'the left side is parsed correctly');
  assert.eq(parsed.right, 'bar', 'the right side is parsed correctly');
  assert.eq(parsed.operator, '<', 'the operator is parsed correctly');
});

test('not-equal expressions are parsed correctly', () => {
  const parsed = parse('foo != "bar"');

  assert.eq(typeof parsed, 'object', 'an object is returned');
  assert.eq(parsed.left, 'foo', 'the left side is parsed correctly');
  assert.eq(parsed.right, 'bar', 'the right side is parsed correctly');
  assert.eq(parsed.operator, '!=', 'the operator is parsed correctly');
});

test('strings are handled correctly', () => {
  let parsed = parse('"foo" == bar');

  assert.eq(parsed.left, 'foo', 'a double-quoted string is parsed');
  assert.eq(parsed.right, 'bar', 'an unquoted string is parsed');

  parsed = parse(`'foo"' == "'"`);

  assert.eq(parsed.left, 'foo"', 'a single-quoted string is parsed');
  assert.eq(parsed.right, "'", 'a double-quoted single-quote is parsed');
});

test('an error is thrown when there are no characters', () => {
  try {
    const parsed_null = parse();
    assert.eq(1, 0, 'this should never run');
  } catch (err) {
    assert.eq(
      err.message,
      `Cannot read properties of undefined (reading 'charAt')`,
      'the correct error is thrown'
    );
  }

  try {
    const parsed_empty = parse('');
    assert.eq(1, 0, 'this should never run');
  } catch (err) {
    assert.eq(
      err.message,
      'Expected "(", quoted string, or unquoted string but end of input found.',
      'the correct error is thrown'
    );
  }
});

test('an error is thrown when a number is first', () => {
  try {
    const parsed = parse('1 == hello');
    assert.eq(1, 0, 'this should never run');
  } catch (err) {
    assert.eq(
      err.message,
      `Expected "(", quoted string, or unquoted string but "1" found.`,
      'the correct error is thrown'
    );
  }
});
