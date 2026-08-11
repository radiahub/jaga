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

home.onshow = function() {
    jQuery("#btn_close_home").off("click").on("click", function() {
        //alert(`clicked`);
        onbackbutton();
    });
};


// End of file: contact.js
// ============================================================================
