$(document).ready(function () {
  $('.profile').click(function () {
    $('.p-dropdown').toggle()
  })

  $('.upload-books').click(function () {
    $('#uploadFile').click()
  })

  $('#uploadFile').change(function () {
    $('#uploadFileSubmit').click()
  })

  $('#uploadForm').submit(function () {
    $(this).ajaxSubmit({
      error: function (xhr) {
        console.log('Error: ' + xhr.status)
      },
      success: function (response) {
        console.log(response)
        $('#status').empty().text(response)
      }
    })
    return false
  })

  $('.book-link').click(function (e) {
    e.preventDefault()
    var bookPath = $(this).attr('href')
    $('.library').hide()
    $('#bookFrame').attr('src', bookPath).show()
  })
})
