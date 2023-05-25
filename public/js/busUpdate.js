let busPosition = {
  '서울71나1010': null,
  '71저1221': null,
  '71저1210': null,
  '1701': null,
  '70라8517': null,
}

var mapOptions = {
  //center: new naver.maps.LatLng(37.6293065, 127.086812),
  center: new naver.maps.LatLng(37.6293065, 127.096812),
  zoom: 14,
}

var map = new naver.maps.Map('map', mapOptions)

// naver.maps.Event.addListener(map, 'zoom_changed', function (zoom) {})

setInterval(function () {
  getRequest().then(function (data) {
    jsondata = data
    for (let datas in data['data']) {
      var position = new naver.maps.LatLng(data['data'][datas]['lat'], data['data'][datas]['lon'])
      var markerOptions = {
        position: position,
        map: map,
        icon: {
          content: setBusIcon(data['data'][datas]),
          anchor: new naver.maps.Point(28, 52), // zoom base 14
        },
      }
      var marker = new naver.maps.Marker(markerOptions)
      var busMarker = busPosition[data['data'][datas]['name']]
      if (busMarker != null) busMarker.setMap(null)
      busMarker = marker
    }
    console.log(jsondata)
  })
}, 2000)

function setBusIcon(datas) {
  let routeid = datas['routeid']
  let status = datas['status']

  if (status == 2)
    return '<img src="http://localhost/icon/삼육대.png" width="56" height="56" alt="">'
  else if (routeid == 1)
    return '<img src="http://localhost/icon/화랑대.png" width="56" height="56" alt="">'
  else if (routeid == 2)
    return '<img src="http://localhost/icon/석계.png" width="56" height="56" alt="">'
  else if (routeid == 3)
    return '<img src="http://localhost/icon/별내.png" width="56" height="56" alt="">'
  else if (routeid == 4)
    return '<img src="http://localhost/icon/구리.png" width="56" height="56" alt="">'
  else return '알 수 없음'
}
