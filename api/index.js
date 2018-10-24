const express = require('express')
const commonData = require('./data.js');
const router = express.Router()

const app = express();

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/login', (req, res) => {
  req.session.user = req.body.user
  res.cookie('access_token',req.body.token, { maxAge: 3600000, httpOnly: true }) /* 1 hour */
  return res.json( { status: 'success' })
})

router.post('/logout', (req, res) => {
  delete req.session.user
  res.clearCookie('access_token');
  return res.json({ status: 'success' })
})

router.post('/master-data/:id',(req,res) =>{
  return res.json({ data: commonData[req.params.id] });
});
module.exports = {
  path: '/api',
  handler: router
}
