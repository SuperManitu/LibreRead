var express = require('express')
var formidable = require('formidable')
var Book = require('../models/book')
var router = express.Router()
var path = require('path')
var uploadDir = path.join(__dirname, '/../uploads/')
var imageDir = path.join(__dirname, '/../uploads/images/')
var exec = require('child_process').exec

router.post('/api/upload', function (req, res, next) {
  var email = req.user.email
  var form = new formidable.IncomingForm()
  form.multiples = true
  form.keepExtensions = true
  form.uploadDir = uploadDir

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: err })

    res.redirect('/')
  })
  form.on('fileBegin', function (name, file) {
    const [fileName, fileExt] = file.name.split('.')
    file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
  })
})

module.exports = router
