import chai, { assert, expect } from 'chai'
import chaiHttp from 'chai-http'
import db from '../config/db'
import server from '../index'
import config from '../config'
import models from '../models'
// setups the test for use with an express api
chai.use(chaiHttp)
// setup for test before and after - has to be only in one file
before(function (done) {
  db.connect(done)
})
after(function (done) {
  process.exit()
  done()
})
// basic test scaffold
describe('Routes:', function () {
  it('should test basic route', function (done) {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) console.log(err)
        expect(res).to.have.status(200)
        done()
      })
  })
})