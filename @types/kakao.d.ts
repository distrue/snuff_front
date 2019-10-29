declare interface Maps {
    load: any;
    LatLng: any;
    Map: any;
    Marker: any;
    InfoWindow: any;
}

declare interface KakaoMap {
    maps: Maps;
}

declare let kakao:KakaoMap;
