describe('smoke test', () => {
  it('should navigate to index page', () => {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Hello world');
  });
});
