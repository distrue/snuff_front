import Axios from 'axios';

export function multiNodes(options: any, mapRef: any, query: any, visible: any) {
    let map = new kakao.maps.Map(mapRef.current, options);
    Axios.get(`https://www.snufoodfighter.com/api/eventTgt?eventName=${query.eventName}`)
    .then(res => {
      res.data.participants.map((item:any) => {    
        if(item.location) {
          let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(item.location.lat, item.location.lng)
          });
          var content = '<div class="wrap" style="position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;line-height: 1.5;">' + 
            '    <div class="info" style="width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff; border: 0;box-shadow: 0px 1px 2px #888;">' + 
            '        <div class="title" style="padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;">' + 
            `            ${item.name.match(/^.*\./)}` + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="desc" style="padding: 10px; width: 250px; white-space: normal">' + 
            `${res.data.reward[item._id]}` + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';
          var overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition()       
          });
          kakao.maps.event.addListener(marker, 'click', function() {
            let tmpShow:any = visible[0];
            let f = tmpShow.findIndex((e:any) => {
              return e === item.name.match(/^.*\./)[0]
            });
            if(f === -1) {
              overlay.setMap(map);
              tmpShow.push(item.name.match(/^.*\./)[0]);
              visible[1](tmpShow);
            }  
            else {
              overlay.setMap(null);
              tmpShow.splice(f, 1);
              visible[1](tmpShow);
            }
          });
          overlay.setMap(null);  
        }
      })
    })
  }

export function singleNode(options: any, mapRef: any, query: any) {
    if(query.lat && query.lat !== "undefined") {
      options.center = new kakao.maps.LatLng(query.lat, query.lng)
    }
    let map = new kakao.maps.Map(mapRef.current, options);
    if(query.lat && query.lat !== "undefined") {
        let infowindow = new kakao.maps.InfoWindow({
        map: map,
        position: new kakao.maps.LatLng(query.lat, query.lng),
        content: `<div style="padding:5px;">${query.name}</div>`
      });
    }
    else {
      let infowindow = new kakao.maps.InfoWindow({
        map: map,
        position: new kakao.maps.LatLng(37.478701, 126.951267),
        content: `<div style="padding:5px;">준비중</div>`
      });
    }
  }