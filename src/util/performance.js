function handleData(performance) {
  let navigationStart = performance.navigationStart || performance.fetchStart
  let performanceData = {}
  if (performance) {
    // 重定向时间
    performanceData.redirectTime = performance.redirectEnd - performance.redirectStart
    // 缓存时间
    performanceData.cacheTime = performance.domainLookupStart - performance.fetchStart
    // dns查询时间
    performanceData.dnsTime = performance.domainLookupEnd - performance.domainLookupStart
    // tcp握手时间
    performanceData.TcpTime = performance.connectEnd - performance.connectStart
    // ajax请求时间
    performanceData.ajaxTime = performance.responseEnd - performance.requestStart
    // 开始解析dom时间，此时document.readyState 变为 loading
    performanceData.domLoadingTime = performance.domLoading ? performance.domLoading - navigationStart : null
    // dom解析完成时间，此时document.readyState 变为 interactive
    performanceData.domInteractiveTime = performance.domInteractive - navigationStart
    // dom解析完成，资源加载完成，脚本完成
    performanceData.domContentLoadedEventEndTime = performance.domContentLoadedEventEnd - navigationStart
    // 页面从开始到结束的全部时间时间
    performanceData.loadPageTime = performance.loadEventEnd ? performance.loadEventEnd - navigationStart : null
  }
  return performanceData
}

function getPaintTime() {
  let obj = {}
  if (window.performance && window.performance.getEntriesByType) {
    let paintArr = window.performance.getEntriesByType('paint')
    if (paintArr && paintArr.length) {
      paintArr.forEach(function (item) {
        obj[item.name] = item.startTime
      })
    }
  }
  return obj
}

function getAllSourceTime() {
  let allSourceTime = []
  if (window.performance && window.performance.getEntries) {
    window.performance.getEntries().forEach(function (item) {
      let temp = {}
      temp.name = item.name
      temp.entryType = item.entryType
      if (item.entryType === 'paint') {
        temp.startTime = item.startTime
      } else {
        temp.transferSize = item.transferSize
        temp.duration = item.duration
        temp.initiatorType = item.initiatorType
      }
      allSourceTime.push(temp)
    })
  }
  return allSourceTime
}

function performanceObserver() {
  let obj = {}
  var observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      if (entry.entryType === 'paint') {
        obj[entry.name] = entry.startTime
      } else {
        let temp = handleData(entry)
        obj = Object.assign({}, obj, temp)
      }
    })
    obj.from = 'window.PerformanceObserver'
    obj.url = location.href
    obj.timestamp = Date.now()
    console.log(obj)
  });
  observer.observe({ entryTypes: ['navigation', 'paint'] });
}

function init() {
  if (window.PerformanceObserver) {
    performanceObserver()
  } else if (window.performance) {
    window.onload = function () {
      let timing = window.performance.timing;
      let performanceData = handleData(timing)
      performanceData.timestamp = Date.now()
      performanceData.url = location.href
      performanceData.from = 'window.performance'
      performanceData = Object.assign({}, performanceData, getPaintTime())
      console.log(performanceData)
    }
  }
}

let performanceMonitor = {
  init
}

export default performanceMonitor