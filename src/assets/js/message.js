var infor = function (text) {
  var innerHtml = '<section id="messageInfor" style="position: fixed;top: 0;left: 0;height: 100vh;width: 100vw;background: rgba(0,0,0,0.3);z-index: 2000">' +
    '<div style="background: #FFFFFF;width: 70vw;position: absolute;top: 40%;left: 15%;transform: translateY(-50%);border-radius: 0.25rem;padding: 1.5rem">' +
    '<div style="font-weight: 600;font-size: 1.125rem;margin-bottom: 1rem;">提示</div>' +
    '<div style="margin-bottom: 1rem;">' +
    text +
    '</div>' +
    '<div  style="color: #08BAC6;text-align: right"><div id="messageClose" style="display: inline-block;">确定</div></div>' +
    '</div>' +
    '</section>';
  document.getElementsByTagName('body')[0].insertAdjacentHTML("afterbegin", innerHtml);
  document.getElementById('messageClose').addEventListener('click', () => {
    document.getElementsByTagName('body')[0].removeChild(document.getElementById('messageInfor'))
  }, false)
}

module.exports = {
  infor
}
