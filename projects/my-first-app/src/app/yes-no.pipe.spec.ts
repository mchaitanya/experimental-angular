import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  // beforeEach is not required for a pure & stateless pipe.
  const pipe = new YesNoPipe();

  it('transforms true to Yes', () => {
    expect(pipe.transform(true)).toBe('Yes');
  });

  it('transforms false to No', () => {
    expect(pipe.transform(false)).toBe('No');
  });

  it('transforms undefined to No', () => {
    expect(pipe.transform(undefined)).toBe('No');
  });
});
