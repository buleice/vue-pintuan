const WindowEvents={
  pageShow(){
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        return true
      } else {
        return false;
      }
    })
  },
  pageHide(){
    window.addEventListener('pagehide', function(event) {
      if (event.persisted) {
        return true;
      } else {
        return false;
      }
    })
  }
}

export {
  WindowEvents
}
