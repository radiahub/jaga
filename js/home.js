// ============================================================================
// Module      : home.js
// Version     : 1.0
//
// Author      : Denis Patrice <denispatrice@yahoo.com>
// Copyright   : Copyright (c) Denis Patrice Dipl.-Ing. 2010-2025
//               All rights reserved
//
// Application : jaga
// Description : home page
//
// Date+Time of change   By     Description
// --------------------- ------ ----------------------------------------------
// 01-Sep-26 00:00 WIT   Denis  Deployment V. 2026 "Alexandre Dumas"
//
// ============================================================================

const home = new view('home', '', '/jaga/html/home.html');

jQuery.extend(home, {
    
    // ************************************************************************
    // ************************************************************************
    //
    // MAP
    //
    // ************************************************************************
    // ************************************************************************
    
    map: null,
    
    map_init: function() {
        return new Promise((resolve)=>{
            console.info('IN home.init()');
            get_current_location().then((position)=>{
                console.log(position);
                const center = (position === false) ? DEFAULT_POSITION : [position.longitude, position.latitude];
                console.log(center);
                home.map = new mapboxgl.Map({
                    container: 'div_home_map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: center,
                    zoom: 8 
                });
                
                console.log(document.getElementById('div_home_map').getBoundingClientRect());
                console.log(document.querySelector('#div_home_map canvas'));
                home.map.on('load', ()=>{ 
                    console.log('MAP LOADED');
                    console.log(document.getElementById('div_home_map').innerHTML);
                    resolve(true);
                });
                home.map.on('error', (e) => {
                    console.error('MAP ERROR:', e);
                    resolve(false);
                });
                
            });
        });
    },
    
    
    // ************************************************************************
    // ************************************************************************
    //
    // RUNTIME EVENTS
    //
    // ************************************************************************
    // ************************************************************************
    
    onviewportresize : function () {
        console.info(`IN home.onviewportresize()`);
        if (home.map !== null) {
            home.map.resize();
        }
    },
    
    onshow : function() {
        console.info(`IN home.onshow()`);
        console.log (geometry());
        home.map_init().then((result)=>{
            console.log(result);
        });
    }
    
    
});

/*
home.onshow = function() {
    
    console.log(`IN home.onshow()`);
    
    jQuery("#btn_home_fcm").off("click").on("click", function() {
        alert(`clicked for FCM selftest`);
        fcm.selftest().then((result)=>{
            console.log(result);
        });
    });
    
    jQuery("#btn_home_fcm_push").off("click").on("click", function() {
        alert(`clicked for FCM push`);
        let identifier = storage.get('identifier');
        let url = `https://radiahub.22web.org/fcm_push.php?package_id=${PACKAGE_ID}&identifier=${identifier}&text=`;
        console.log(url);
        let result = freadSync(url, true);
        console.log(result);
    });
    
    jQuery("#btn_home_geolocation").off("click").on("click", function() {
        alert(`clicked for geolocation`);
        get_current_location().then((position)=>{
            console.log(position);
            mapbox_reverse_geocoding(position.longitude, position.latitude).then((data)=>{
                console.log(data);
            });
        });
    });
    
    jQuery("#btn_home_forward_geolocation").off("click").on("click", function() {
        alert(`clicked for FORWARD geolocation`);
        mapbox_forward_geocoding(`Mal Kelapa Gading, Jakarta`).then((data)=>{
            console.log(data);
        });
    });
    
};
*/

// End of file: home.js
// ============================================================================
