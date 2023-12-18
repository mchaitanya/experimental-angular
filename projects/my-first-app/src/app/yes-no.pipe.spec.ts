import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  // beforeEach is not required for a pure & stateless pipe.
  const pipe = new YesNoPipe();

  it('should transform true to Yes', () => {
    expect(pipe.transform(true)).toBe('Yes');
  });

  it('should transform false to No', () => {
    expect(pipe.transform(false)).toBe('No');
  });

  it('should transform undefined to No', () => {
    expect(pipe.transform(undefined)).toBe('No');
  });
});
