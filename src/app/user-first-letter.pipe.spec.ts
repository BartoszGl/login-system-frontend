import { UserFirstLetterPipe } from './shared/pipes/user-first-letter.pipe';

describe('UserFirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new UserFirstLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
