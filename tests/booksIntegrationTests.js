require('should');

const request = require('supertest');
const mongoose = require('mongoose');
const Book = require('../models/book');
const app = require('../app');

process.env.ENV = 'Test';
const agent = request.agent(app);

describe('Book CRUD tests', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = {
      title: 'Some book title',
      author: 'Some book author',
      genre: 'Action',
    };
    agent
      .post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // console.log('results:', results);
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
