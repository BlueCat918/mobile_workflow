/*
 * @Author: BlueCat
 * @Date: 2020-06-25 22:50:01
 * @LastEditTime: 2020-06-26 16:27:27
 * @LastEditors: BlueCat
 * @Description: 
 */

$(function() {
  ajax()
  setTimeout(() => {
    $('.box').css('background-image', 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)')
    test()
  }, 1000)

  const test = () => {
    $('.app').css('background-image', 'linear-gradient(180deg, #2af598 0%, #009efd 100%)')
  }

  function ajax() {
    $.get('/v1/getNewUserDiscountTicketDetail?uid=&client_id=&token=&src=web', function(data) {
      const { serverTimeAt = '' } = data ? data.d : {}
      $('.time').text(`跨域数据：${serverTimeAt}`)
    })
  }
})