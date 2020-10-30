import fixMarkdown from './index';

test('No symbols', () => {
  expect(fixMarkdown('a')).toBe('a');
});

test('Only new lines', () => {
  expect(fixMarkdown('a\na')).toBe('a\na');
});

test('Only markdown', () => {
  expect(fixMarkdown('~~a~~')).toBe('~~a~~');
});

test('Only closed markdown', () => {
  expect(fixMarkdown('~~a~~\nb')).toBe('~~a~~\nb');
});

test('New line on end', () => {
  expect(fixMarkdown('a\n')).toBe('a\n');
});

test('One open markdown', () => {
  expect(fixMarkdown('~~a\nb~~')).toBe('~~a~~\n~~b~~');
});

test('Two open markdown', () => {
  expect(fixMarkdown('~~**a\nb**~~')).toBe('~~**a**~~\n~~**b**~~');
});

test('Three open markdown', () => {
  expect(fixMarkdown('~~**~~a\nb~~**~~')).toBe('~~**~~a~~**~~\n~~**~~b~~**~~');
});

test('Mixed single and double symbols', () => {
  expect(fixMarkdown('* a * ** b **')).toBe('* a * ** b **');
  expect(fixMarkdown('* a *\n** b **')).toBe('* a *\n** b **');
  expect(fixMarkdown('*** a ***')).toBe('*** a ***');
});

test('Lennart', () => {
  const input = '**dit** is ~~regel 1 **en\ndit is regel** 2~~ cool he';
  const expected =
    '**dit** is ~~regel 1 **en**~~\n~~**dit is regel** 2~~ cool he';

  expect(fixMarkdown(input)).toBe(expected);
});
