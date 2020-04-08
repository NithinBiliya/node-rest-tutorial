require('should');
const sinon = require('sinon');
const booksController = require('../controllers/books');

describe('Books controller tests: ', () => {
  describe('Post', () => {
    it('should not allow empty title on post', () => {
      // eslint-disable-next-line func-names
      const Book = function () {
        this.save = () => {};
      };
      const req = {
        body: {
          author: 'Nithin',
        },
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = booksController(Book);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
