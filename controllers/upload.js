var express = require('express')
var formidable = require('formidable')
var Book = require('../models/book')
var router = express.Router()
var path = require('path')
var uploadDir = path.join(__dirname, '/../uploads/')
var uploadDir2 = path.join(__dirname, '/..')
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

    Book.find({email: email}, function (err, content) {
      if (err) return console.error(err)

      if (Array.isArray(files.userBooks)) {
        files.userBooks.forEach(function (item, index) {
          var bookPath = item.path.split('LibreRead')[1]
          saveBooks(content, bookPath)
        })
      } else {
        var bookPath = files.userBooks.path.split('LibreRead')[1]
        saveBooks(content, bookPath)
      }
    })

    function saveBooks (content, bookPath) {
      if (content.length) {
        content[0].list.push(bookPath)
        content[0].save(function (err) {
          if (err) return console.error(err)
          return getCover(bookPath)
        })
      } else {
        var book = new Book({email: email, list: [bookPath]})
        book.save(function (err, content) {
          if (err) return console.error(err)
          return getCover(bookPath)
        })
      }
    }

    function getCover (bookPath) {
      var cmd = 'pdfimages -p -png -f 1 -l 2 ' + uploadDir2 + bookPath + ' ' + imageDir + bookPath.split('/uploads/').pop()
      exec(cmd, function (err, stdout, stderr) {
        if (err) return console.error(err)
        console.log(stdout)
      })
    }

    res.redirect('/')
  })
  form.on('fileBegin', function (name, file) {
    const [fileName, fileExt] = file.name.split('.')
    file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
  })
})

module.exports = router
