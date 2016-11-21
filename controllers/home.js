var Book = require('../models/book')

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (req.user) {
    // Book.find({email: req.user.email}).remove().exec()
    Book.find({email: req.user.email}, function (err, content) {
      if (err) return console.error(err)
      console.log(content)
      if (content[0]) {
        return resRender(res, content[0].list)
      } else {
        return resRender(res, [])
      }
    })
  } else {
    return resRender(res, [])
  }
}

function resRender (res, books) {
  return res.render('home', {
    books: books
  })
}
