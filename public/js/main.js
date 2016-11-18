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
        status('Error: ' + xhr.status)
      },
      success: function (response) {
        console.log(response)
        $('#status').empty().text(response)
      }
    })
    return false
  })
})
