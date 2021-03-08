var Main = {
    markersArray : [],          // 現在表示中のマーカーのリスト(コンテンツマーカー以外)
    contentsMarkers : [],       // 現在表示中のコンテンツマーカーのリスト
    myLocationIcon : null,      // 現在位置マーカー
    startMarker : null,         // スタートマーカー
    endMarker : null,           // ゴールマーカー

    paintPolyLine : null,       // 現在描画されている案内線ライン
    locusPolyLines : [],        // 一本ずつ描画されたラインの配列
    startNaviPoly : null,       // スタート地点から該当コンテンツまでのライン
    moveNaviPoly : null,        // 案内予定のコースのライン

    routeLatitudes : null,      // 緯度のリスト（文字列カンマ区切り）
    routeLongitudes : null,     // 経度のリスト（文字列カンマ区切り）

    startPolyline : 0,          //

    // startNaviPolyの座標
    startNaviPos : {
        start: {
            lat: null,
            lng: null
        },
        target: {
            lat: null,
            lng: null
        }
    },

    // アイコン画像
    myLocationIconImage: {
        url: "../img/icon/my_direction_south.png",
        width: 40,
        height: 40,
        offsetWidth: 20,
        offsetHeight: 20
    },
    startMarkerIconImage: {
        url: "../img/icon/route_start.png",
        width: 44,
        height: 62,
        offsetWidth: 22,
        offsetHeight: 62
    },
    endMarkerIconImage: {
        url: "../img/icon/route_end.png",
        width: 45,
        height: 62,
        offsetWidth: 22,
        offsetHeight: 62
    },

    // ================================================================================
    // iOS・Android両アプリから呼ばれている関数
    // ================================================================================

    // ********************************************************************************
    // 初期化
    initialize: function() {
        ApiWrap.mapInitialize(36.23423, 139.263948, 16);
    },
    initialize_navi: function() {
        ApiWrap.mapInitialize(36.23423, 139.263948, 16);
    },
    initialize_stamp: function() {
        ApiWrap.mapInitialize(36.23423, 139.263948, 11);
    },
    initialize_dictionary: function() {
        ApiWrap.mapInitialize(36.23423, 139.263948, 16);
    },
    initialize_earthquakeInfo: function() {
        ApiWrap.mapInitialize(36.23423, 139.263948, 7);
    },
    initialize_satellite: function() {
        // 航空写真を表示 (震源地表示のためzoom=7)
        ApiWrap.mapInitialize(36.23423, 139.263948, 7, {
            isSatellite: true
        });
    },

    // ********************************************************************************
    // ズームレベル設定
    setZoom: function(zoomData) {
        // zoomDataはズーム値
        ApiWrap.setMapZoom(zoomData);
    },

    // ********************************************************************************
    // マップ表示位置を指定した緯度経度が中心になるように移動
    myLocation: function(data) {
        // markerdataは　緯度,経度
        ApiWrap.setLocation(data);
    },

    // ********************************************************************************
    // 地図の中心を取得
    displayCenter: function() {
        ApiWrap.getMapCenter();
    },

    // ********************************************************************************
    // 現在地アイコン表示
    myLocationIconDispChange: function(markerdata) {
        // markerdataは「緯度,経度,ファイル名」
        var myLocationIconData = markerdata.split(",");

        // アイコンが表示されていたら消す
        ApiWrap.removeMaker(this.myLocationIcon);

        // アイコン画像指定して描画
        var iconImage = this.myLocationIconImage;
        this.myLocationIcon = ApiWrap.viewMaker(myLocationIconData[0], myLocationIconData[1], {
            url: "../img/icon/" + myLocationIconData[2],
            width: 40,
            height: 40,
            offsetWidth: 20,
            offsetHeight: 20
        });
    },
    // ********************************************************************************
    // 現在地アイコン表示とナビゲーションラインを再描画
    myLocationIconDispChangeAndNavigation: function (markerdata) {
        this.myLocationIconDispChange(markerdata);

        if (this.startNaviPos.target) {
            var myLocationIconData = markerdata.split(",");
            var data = myLocationIconData[0] + "," + myLocationIconData[1] + ","
                + this.startNaviPos.target.lat + "," + this.startNaviPos.target.lng;
            // ナビゲーションラインを再描画
            this.setStartNavigation(data);
        }
    },

    // ********************************************************************************
    // コンテンツマーカー設定
    changeContentsMarker: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    changeContentsMarkerFree: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },

    // ********************************************************************************
    // スタートナビゲーションライン消去
    removeStartNavigation: function() {
        ApiWrap.removePolyline(this.startNaviPoly);
    },

    // ********************************************************************************
    // マーカー跳ねる
    setBounce: function(id) {
        var newOldId = id.split(",");
        if (this.contentsMarkers) {
            // 現在飛び跳ねているマーカーと違うマーカーがタップされたら
            if (newOldId[0] != newOldId[1]) {
                // アニメ停止
                var nullMarker = this.contentsMarkers[newOldId[0]];
                ApiWrap.stopMarkerBounce(nullMarker);
            }
            // 跳ねる
            var targetMarker = this.contentsMarkers[newOldId[1]];
            ApiWrap.startMarkerBounce(targetMarker);
            // ２秒後に停止
            setTimeout(function(){
                Main.setBounceStop(newOldId[1]);
            }, 2000);
        }
    },

    // ********************************************************************************
    // コンテンツマーカーアニメーション(飛び跳ねる停止)
    setBounceStop: function(id) {
        if (this.contentsMarkers) {
            var targetMarker = this.contentsMarkers[id];
            ApiWrap.stopMarkerBounce(targetMarker);
        }
    },
    // 全コンテンツマーカーアニメーション(飛び跳ねる停止)
    setBounceStops: function() {
        if (this.contentsMarkers) {
            for (var i in this.contentsMarkers) {
                var targetMarker = this.contentsMarkers[i];
                ApiWrap.stopMarkerBounce(targetMarker);
            }
        }
    },
    // マーカーアニメーション(飛び跳ねる停止)
    setBounceStop_stamp: function(id) {
        if(this.markersArray) {
            var targetMarker = this.markersArray[id];
            ApiWrap.stopMarkerBounce(targetMarker);
        }
    },
    // 全マーカーアニメーション(飛び跳ねる停止)
    setBounceStops_stamp: function() {
        if(this.markersArray) {
            for(var i in this.markersArray) {
                var targetMarker = this.markersArray[i];
                ApiWrap.stopMarkerBounce(targetMarker);
            }
        }
    },
    setBounce_stamp: function(id) {
        // idはマーカー番号
        this.setBounce(id);
    },

    // ********************************************************************************
    // 地図の中心とズームレベル取得
    getSaveData: function() {
        ApiWrap.getMapCenterZoom();
    },
    getMapCenterZoom: function() {
        ApiWrap.getMapCenterZoom();
    },

    // ********************************************************************************
    // マーカー描画
    changeScrnContentsMarker: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    changeContentsMarker_stamp: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    setScrnContentsMaker: function(data) {
        this.viewContentsMarker(data, false, "../img/icon/icon_small_type");
    },
    setMaker_contentsRoute: function(data) {
        this.viewContentsMarker(data, false, "../img/icon/icon_small_type");
    },
    setMaker_surroundFacilities: function(latlngdata) {
        this.viewContentsMarker(latlngdata, false, "../img/icon/icon_small_type");
    },
    setMaker_earthquakeInfo: function(latlngdata) {
        this.viewContentsMarker(latlngdata, false, "../img/icon/icon_small_type");
    },
    setContentsMaker_free: function(data) {
        this.viewContentsMarker(data, false, "../img/icon/icon_small_type");
    },
    changeScrnContentsMarker_free: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    changeContentsMarker_navi: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    changeContentsMarker_dictionary: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    changeContentsMarker_surroundFacilities: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    changeContentsMarker_free: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    setMaker_route: function(latlngdata) {
        this.viewContentsMarker(latlngdata, false, "../img/icon/icon_small_type");
    },

    // ********************************************************************************
    // スタート位置アイコン描画
    startMaker_contentsRoute: function(data) {
        // dataは緯度,経度
        var latlng = data.split(",");

        // スタート位置アイコンが表示されていたら消す
        ApiWrap.removeMaker(this.startMarker);

        // アイコン画像指定して描画
        var iconImage = this.myLocationIconImage;
        var makerStart = ApiWrap.viewMaker(latlng[0], latlng[1], iconImage);
        this.startMarker.push(makerStart);

    },

    // ********************************************************************************
    // 現在位置マーカーを表示してラインを１本引く
    startLocationToMyLocation: function(latlngdata) {
        // latlngdataは始点緯度,始点経度,終点緯度,終点経度
        var latlng = latlngdata.split(",");
        var latList = latlng[0]+","+latlng[2];
        var lngList = latlng[1]+","+latlng[3];

        this.paintPolyLine = ApiWrap.viewPolyline(latList, lngList, "#0000ff", 5, 0.6);

        // 現在地アイコン
        // アイコン画像指定して描画
        var iconImage = this.myLocationIconImage;
        this.myLocationIcon = ApiWrap.viewMaker(latlng[0], latlng[1], iconImage);

    },
    startLocationToMyLocation_contentsRoute: function(latlngdata) {
        this.startLocationToMyLocation(latlngdata) ;
    },

    // ********************************************************************************
    // スタートナビゲーションライン表示
    setStartNavigation: function(data) {
        // dataは始点緯度,始点経度,終点緯度,終点経度
        var latlng = data.split(",");

        var latList = latlng[0]+","+latlng[2];
        var lngList = latlng[1]+","+latlng[3];

        // スタートナビゲーションラインが引かれていたら消す
        if(this.startNaviPoly){
            this.removeStartNavigation();
        }

        this.startNaviPoly = ApiWrap.viewPolyline(latList, lngList, "#ff0000", 5, 0.7);
        this.startNaviPos.start = {
            lat: latlng[0],
            lng: latlng[1]
        }
        this.startNaviPos.target = {
            lat: latlng[2],
            lng: latlng[3]
        }
    },
    // ********************************************************************************
    // ナビゲーションラインのターゲットを変更
    setNavigationTarget: function (lat, lng) {
        this.startNaviPos.target = {
            lat: lat,
            lng: lng
        }
    },

    // ********************************************************************************
    // スタート地点とゴール地点のマーカーを表示してラインを引く
    setPolyline_navi: function(latlngdata) {
        // latlngdataは緯度１,緯度２,・・・,緯度n_経度１,経度２,・・・,経度n

        var latlng = latlngdata.split("_");
        var routeLat = latlng[0].split(",");
        var routeLng = latlng[1].split(",");

        // スタート地点を中心に表示する
        ApiWrap.setLocation(routeLat[0]+","+routeLng[0]);
        this.paintPolyLine = ApiWrap.viewPolyline(latlng[0], latlng[1], "#0000ff", 5, 0.6);

        if(routeLat.length>0) {
            // スタート地点アイコン画像指定して描画
            var startIconImage = this.startMarkerIconImage;
            this.startMarker = ApiWrap.viewMaker(routeLat[0], routeLng[0], startIconImage);
            this.markersArray.push(this.startMarker);
            // ゴール地点アイコン画像指定して描画
            var endIconImage = this.endMarkerIconImage;
            this.endMarker = ApiWrap.viewMaker(routeLat[routeLat.length-1], routeLng[routeLng.length-1], endIconImage);
            this.markersArray.push(this.endMarker);
        }

    },
    setPolyline_contentsRoute: function(latlngdata) {
        this.setPolyline_navi(latlngdata);
    },
    setPolyline_route: function(latlngdata) {
        this.setPolyline_navi(latlngdata);
    },

    // ********************************************************************************
    // 前回までのラインを削除し、新たな移動先ラインを描画
    moveNavigationPolyline: function(latlngdata) {
        // latlngdataは緯度１,緯度２,・・・,緯度n_経度１,経度２,・・・,経度n

        var latlng = latlngdata.split("_");
        var moveLatitudes = latlng[0].split(",");
        var moveLongitudes = latlng[1].split(",");

        //前回の線を削除
        if(this.moveNaviPoly){
            ApiWrap.removePolyline(this.moveNaviPoly);
        }

        this.moveNaviPoly = ApiWrap.viewPolyline(latlng[0], latlng[1], "#a0a000", 5, 0.4);
    },

    // ********************************************************************************
    // ゴール地点を中心点として表示し、ラインを引く
    setPolyline_dictionary: function(latlngdata) {
        // latlngdataは緯度１,緯度２,・・・,緯度n_経度１,経度２,・・・,経度n

        var latlng = latlngdata.split("_");
        var routeLat = latlng[0].split(",");
        var routeLng = latlng[1].split(",");
        // ゴール地点を中心に表示する
        ApiWrap.setLocation(routeLat[routeLat.length-1]+","+routeLng[routeLng.length-1]);
        this.paintPolyLine = ApiWrap.viewPolyline(latlng[0], latlng[1], "#0000ff", 5, 0.6);

    },


    // ================================================================================
    // Android側アプリから呼ばれている関数
    // ================================================================================

    // ********************************************************************************
    // 現在地に移動:スムーズ
    myLocationPanto: function(latlngdata) {
        ApiWrap.setLocationPanto(latlngdata);
    },
    myLocation_stamp: function(latlngdata) {
        ApiWrap.setLocationPanto(latlngdata);
    },

    // ********************************************************************************
    // スタートナビゲーションライン表示（太い線）
    setStartNavigationStraightLine: function(data) {
        // dataは始点緯度,始点経度,終点緯度,終点経度
        var latlng = data.split(",");

        var latList = latlng[0]+","+latlng[2];
        var lngList = latlng[1]+","+latlng[3];

        // スタートナビゲーションラインが引かれていたら消す
        if(this.startNaviPoly){
            this.removeStartNavigation();
        }

        this.startNaviPoly = ApiWrap.viewPolyline(latList, lngList, "#ff0000", 20, 0.5);
    },

    // ********************************************************************************
    // スタート地点までの自動ルート設定
    startAutoRoad: function(latlngdata) {
        this.autoRoad(latlngdata, true, "#ff0000");
    },
    routeAutoRoad: function(latlngdata) {
        this.autoRoad(latlngdata, true, "#0000ff");
    },

    // ********************************************************************************
    // 現在地アイコン表示
    myLocationIconDispChange_stamp: function(data) {
        this.myLocationIconDispChange(data);
    },

    // ********************************************************************************
    // ポリラインの設定
    setPolyline: function(data) {
        // 種類_緯度1,緯度2,・・・,緯度n_経度1,経度2,・・・,経度n_表示緯度_表示経度

        var latlng = data.split("_");
        var reqfunc = latlng[0];
        var latList = latlng[1];
        var lngList = latlng[2];
        var viewLat = latlng[3];
        var viewLng = latlng[4];
        // この二つの値はグローバルで持っているので注意！(polylineRouteDetail() で使っている)
        this.routeLatitudes = latlng[1].split(",");
        this.routeLongitudes = latlng[2].split(",");
        // locusPorylineのクリア
        this.allDelLocusPolyline();
        this.locusPolyLines = [];
        this.startPolyline = 0;

        if(reqfunc == "contents"){
            this.polylineContents(latlng[1], latlng[2]);
            ApiWrap.setLocation(this.routeLatitudes[0]+","+this.routeLongitudes[0]);    // 始点を表示
        }else if(reqfunc == "route"){
            // ルート確認画面用　ポリライン表示
            this.setPolyline_navi(latList+"_"+lngList);
            ApiWrap.setLocation(viewLat+","+viewLng);    // 指定された位置を表示
        }else if(reqfunc == "navi"){
            this.polylineNavi(this.routeLatitudes, this.routeLongitudes);
        }else if(reqfunc == "dictionary" || reqfunc == "free"){
            this.polylineDictionary(latList, lngList);
        }
    },
    // 軌跡線を単位で表示させる
    // setPolylineの後に呼ばれる？
    setLocusPolyline: function(seq) {
        var locusData = new Array();
        if(seq <= 1){
            this.startPolyline = seq - 1;
        }
        for(var i=this.startPolyline; i<seq; i++){
            var latList = this.routeLatitudes[i] + "," + this.routeLatitudes[i + 1];
            var lngList = this.routeLongitudes[i] + "," + this.routeLongitudes[i + 1];
            this.locusPolyLines[i] = ApiWrap.viewPolyline(latList, lngList, "#a0a000", 5, 0.4);
            // 何処まで軌跡線を引いたか覚えておく
            this.startPolyline = i+1;
        }
    },
    // 軌跡線を単位で表示させる (autoRoadの後)
    setLocusPolylineAutoRoad: function(seq) {
        ApiWrap.setLocusPolylineAutoRoad(seq);
    },
    // 施設詳細ルート画面用　ポリライン表示
    polylineDictionary: function(latList, lngList)
    {
        this.paintPolyLine = ApiWrap.viewPolyline(latList, lngList, "#0000ff", 5, 0.4);
    },
    // 施設詳細ルート確認画面用　ポリライン表示
    polylineContents: function(latList, lngList) {

        // 線を引く
        this.paintPolyLine = ApiWrap.viewPolyline(latList, lngList, "#0000ff", 5, 0.4);

        // アイコン画像指定して描画
        var markerLat = latList.split(",");
        var markerLng = lngList.split(",");
        var makerStart = ApiWrap.viewMaker(markerLat[0], markerLng[0], this.myLocationIconImage);
        this.startMarker.push(makerStart);
    },

    // お勧め用　ポリライン表示 　一辺単位で表示させる
    polylineNavi: function(routeLat, routeLng) {
        var routeData = new Array();

        if(routeLat.length>0) {
            this.locusPolyLines = [];
            for(var i=0; i<routeLat.length-1; i++) {
                var latList = routeLat[i] + "," + routeLat[i+1];
                var lngList = routeLng[i] + "," + routeLng[i+1];
                var polyArray = ApiWrap.viewPolyline(latList, lngList, "#0000ff", 5, 0.4);
                // 今までに追加した線のリストに今引いた線を追加
                this.locusPolyLines.push(polyArray);
            }
            // アイコン画像指定して描画
            // スタート
            var startIconImage = this.startMarkerIconImage;
            this.startMarker = ApiWrap.viewMaker(routeLat[0], routeLng[0], startIconImage);
            this.markersArray.push(this.startMarker);
            // エンド
            var endIconImage = this.endMarkerIconImage;
            this.endMarker = ApiWrap.viewMaker(routeLat[routeLat.length-1], routeLng[routeLng.length-1], endIconImage);
            this.markersArray.push(this.endMarker);
        }

    },

    // ポリライン消去　一辺単位で消去する
    delLocusPolyline: function(seq) {
        if(this.locusPolyLines[seq - 1]){
            ApiWrap.removePolyline(this.locusPolyLines[seq - 1]);
        }
    },

    // ポリライン消去
    allDelLocusPolyline: function() {
        this.locusPolyLines.forEach(function(polyLine) {
            ApiWrap.removePolyline(polyLine);
        });
        this
    },
    allDelPolyline: function() {
        this.removepaintPolyLine();
    },

    // マーカー削除
    removeEpicenterMaker: function() {
        this.removeContentsMaker();
    },
    // マーカー表示
    changeEpicenterMaker: function(data) {
        this.removeContentsMaker();
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    setContentsMaker: function(data) {
        this.viewContentsMarker(data, false, "../img/icon/icon_small_type");
    },
    setMaker: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    setMaker_stamp: function(data) {
        this.viewContentsMarker(data, true, "../img/icon/icon_small_type");
    },
    // マーカーイベント設定
    attachMessage: function(marker, no) {
        ApiWrap.attachMessage(marker, no);
    },
    attachMessage_stamp: function(marker, no) {
        ApiWrap.attachMessage(marker, no);
    },
    attachMessage_earthquakeInfo: function(marker, no) {
        ApiWrap.attachMessage(marker, no);
    },

    // ================================================================================
    // iOS側アプリから呼ばれている関数
    // ================================================================================

    // ********************************************************************************
    // コンテンツマーカー描画
    viewContentsMarker: function(markerdata, clearFlg, iconFn) {
        // markerdataは
        // コンテンツNo[0],コンテンツNo[1],・・・,コンテンツNo[n]_
        // カテゴリNo[0],カテゴリNo[1],・・・,カテゴリNo[n]_
        // 緯度[0],緯度[1],・・・,緯度[n]_
        // 経度[0],経度[1],・・・,経度[n]_
        // サブカテゴリ[0],サブカテゴリ[1],・・・,サブカテゴリ[n] （省略可）
        var mkdata = markerdata.split("_");
        var contentsNo = mkdata[0].split(",");
        var contentsType = mkdata[1].split(",");
        var contentsLatitudes = mkdata[2].split(",");
        var contentsLongitudes = mkdata[3].split(",");
        var contentsSubType = "";
        if(mkdata.count==4) contentsSubType = mkdata[4].split(",");

        if(contentsLatitudes.length == 1 && contentsLatitudes[0] == "") {
            return;
        }

        if (clearFlg) {
            this.removeContentsMaker();
        }
        var contentsData = new Array();
        for(var i=0; i<contentsLatitudes.length; i++) {

            var iconUrl = iconFn + contentsType[i] + ".png";
            // アイコン描画
            var marker = ApiWrap.viewMaker(contentsLatitudes[i], contentsLongitudes[i], {
                url: iconFn + contentsType[i] + ".png",
                width: 49,
                height: 72,
                offsetWidth: 25,
                offsetHeight: 72
            });

            ApiWrap.attachMessage(marker, contentsNo[i]);    // タッチイベント追加
            this.contentsMarkers.push(marker);                // マーカーを削除するときのためにグローバル配列に入れておく
        }
    },

    // ********************************************************************************
    // 描画されているコンテンツマーカーを削除する
    removeContentsMaker: function() {
        if (this.contentsMarkers) {
            for (var i in this.contentsMarkers) {
                ApiWrap.removeMaker(this.contentsMarkers[i]);
            }
            this.contentsMarkers = [];
        }
    },

    // ********************************************************************************
    // マーカー描画
    setMaker_dictionary: function(data) {
        this.viewContentsMarker(data, false, "../img/icon/icon_small_type");
    },
    setMaker_navi: function(latlngdata) {
        this.viewContentsMarker(latlngdata, false, "../img/icon/icon_small_type");
    },

    // ********************************************************************************
    // 現在地アイコン消去
    removeMyLocationIcon: function() {
        ApiWrap.removeMaker(this.myLocationIcon);
    },
    removeMyLocationIconDispChange: function() {
        ApiWrap.removeMaker(this.myLocationIcon);
    },

    // ********************************************************************************
    // スタート位置アイコン消去
    removeStartMaker: function() {
        ApiWrap.removeMaker(this.startMarker);
    },

    // ********************************************************************************
    // ゴール位置アイコン消去
    removeEndMaker: function() {
        ApiWrap.removeMaker(this.endMarker);
    },

    // ********************************************************************************
    // 案内線を消去
    removepaintPolyLine: function(){
        if(this.paintPolyLine){
            ApiWrap.removePolyline(this.paintPolyLine);
        }
    },

    // ********************************************************************************
    // 自動ルーティング（歩き)
    // ルート検索をした後、検索結果を　road_data:1,緯度,経度2,緯度,経度,3,緯度,経度,・・・で
    // document.locationへ送出します
    autoRoad: function(latlngdata, polyline, color){
        // latlngdataは 始点緯度_始点経度_終点緯度_終点経度
        // polyline true:ラインを描画する false:描画しない（document.locationへ road_data:〜 を送出）
        var roadData = latlngdata.split("_");

        ApiWrap.routeSearchWalking({
            startLat: roadData[0],
            startLng: roadData[1],
            endLat: roadData[2],
            endLng: roadData[3],
            isLinePaint: polyline,
            color: color,
            weight: 5,
            opacity: 0.6
        });
    },

    // 自動ルーティングで描画したラインの消去
    removeAutoRoad: function() {
        ApiWrap.removeAutoRoad();
    }
}
