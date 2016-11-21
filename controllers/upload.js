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
    if (Array.isArray(files.userBooks)) {
      files.userBooks.forEach(function (item, index) {
        // bookPath.push(item.path.split('LibreRead')[1])
        item = item.path.split('LibreRead')[1]
        saveBooks(item)
        getCover(item)
      })
    } else {
      var item = files.userBooks.path.split('LibreRead')[1]
      saveBooks(item)
      getCover(item)
    }

    function saveBooks (bookPath) {
      Book.find({email: req.user.email}, function (err, content) {
        if (err) console.error(err)
        var coverPath = '/uploads/images/' + bookPath.split('/uploads/').pop() + '-001-000.png'
        var list = [{bookPath: bookPath, coverPath: coverPath}]

        if (!content.length) {
          var b = new Book({email: email, list: [list]})
          return b.save(function (err, content) {
            if (err) return console.log(err)
            console.log(content)
          })
        } else {
          content[0].list.push(list)
          return content[0].save(function (err, content) {
            if (err) return console.error(err)
            console.log(content)
          })
        }
      })
    }

    function getCover (bookPath) {
      var cmd = 'pdfimages -p -png -f 1 -l 2 ' + uploadDir2 + bookPath + ' ' + imageDir + bookPath.split('/uploads/').pop()
      return exec(cmd, function (err, stdout, stderr) {
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
