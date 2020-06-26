/*
 * @Author: BlueCat
 * @Date: 2020-06-25 22:50:01
 * @LastEditTime: 2020-06-26 21:03:39
 * @LastEditors: BlueCat
 * @Description: 
 */

$(function() {
  ajax()
  setTimeout(function() {
    $('.box').css('background-image', 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)')
    test()
  }, 1000)

  var test = function() {
    $('.app').css('background-image', 'linear-gradient(180deg, #2af598 0%, #009efd 100%)')
  }

  function ajax() {
    $.get('/v1/getNewUserDiscountTicketDetail?uid=&client_id=&token=&src=web', function(data) {
      var d = data ? data.d : {}
      var serverTimeAt = d.serverTimeAt || ''
      $('.time').text(`跨域数据：${serverTimeAt}`)
    })
  }
})