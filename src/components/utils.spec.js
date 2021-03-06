import each from 'jest-each';

import {
  getRelativeUrl,
  removeElementFromPath,
  sanitizeElement,
  sanitizeRoute,
  startsWithUrl,
} from './utils';

describe('utils', () => {
  describe('startsWithUrl', () => {
    each([
      [true, '/path', '/path'],
      [true, '/path#element', '/path'],
      [true, '/path/another_path', '/path'],
      [true, '/#element', '/#element'],
      [true, '/path', '/path#element'], // ignores an element
      [false, '/another_path', '/path'],
      [false, '/', '/path'],
    ]).it(
      'returns %s for parent URL %s and URL %s',
      (expected, parentUrl, url) => {
        expect(startsWithUrl(parentUrl, url)).toBe(expected);
      }
    );
  });

  describe('getRelativeUrl', () => {
    each([
      ['', '', ''],
      ['/path', 'http://site.io/path', 'http://site.io'],
      ['/path', 'http://site.io/path', 'http://site.io/'],
      ['/path#element', 'http://site.io/path#element', 'http://site.io'],
      ['/#element', 'http://site.io/#element', 'http://site.io'],
      ['/path', 'http://site.io/#/path', 'http://site.io'],
      ['/path#element', 'http://site.io/#/path#element', 'http://site.io'],
      ['/#element', 'http://site.io/#/#element', 'http://site.io'],
    ]).it('returns %s for URL %s and origin %s', (expected, url, origin) => {
      expect(getRelativeUrl(url, origin)).toBe(expected);
    });
  });

  describe('removeElementFromPath', () => {
    each([
      ['', ''],
      ['/path', '/path'],
      ['/path', '/path#element'],
      ['/path', '/path#element-1#element-2'],
      ['#/path', '#/path'],
      ['#/path', '#/path#element'],
      ['#/path', '#/path#element-1#element-2'],
      ['/#/path', '/#/path#element'],
    ]).it('returns %s for path %s', (expected, path) => {
      expect(removeElementFromPath(path)).toBe(expected);
    });
  });

  describe('sanitizeElement', () => {
    each([
      [undefined, undefined],
      ['', ''],
      ['#element', '#element'],
      ['#element', 'element'],
    ]).it('returns %s for path %s', (expected, element) => {
      expect(sanitizeElement(element)).toBe(expected);
    });
  });

  describe('sanitizeRoute', () => {
    each([
      [undefined, undefined],
      ['', ''],
      ['/route', '/route'],
      ['/route', 'route'],
      ['/route', 'route/'],
    ]).it('returns %s for path %s', (expected, route) => {
      expect(sanitizeRoute(route)).toBe(expected);
    });
  });
});
