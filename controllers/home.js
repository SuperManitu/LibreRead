var Book = require('../models/book')

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (req.user) {
    Book.find({email: req.user.email}, function (err, content) {
      if (err) return console.error(err)
      if (content[0]) {
        res.render('home', {
          books: content[0].list
        })
      } else {
        res.render('home', {
          books: []
        })
      }
    })
  } else {
    res.render('home', {
      books: []
    })
  }
}
