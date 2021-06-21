import { UserNameExtrPipe } from './user-name-extr.pipe';

describe('UserNameExtrPipe', () => {
  it('create an instance', () => {
    const pipe = new UserNameExtrPipe();
    expect(pipe).toBeTruthy();
  });
});
