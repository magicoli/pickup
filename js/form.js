window.androidObj = function AndroidClass(){};

var updateURL = "https://magiiic.com/downloads/pickup/";
var downloadURL = "https://play.google.com/store/apps/details?id=com.magiiic.pickup";

function debug(message) {
  document.getElementById("debug").innerHTML = document.getElementById("debug").innerHTML + message + "\n<br>";
  return;
}

function checkUpates()
{
  httpGetAsync(updateURL + "?query", processHTML);
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    // // xmlHttp.send( null );
    // return xmlHttp.responseText;
}

function compareVersion(v1, v2) {
    if (typeof v1 !== 'string') return false;
    if (typeof v2 !== 'string') return false;
    if (v1 == v2) return 0;
    v1 = v1.replace("-",".").split('.');
    v2 = v2.replace("-",".").split('.');
    // v1 = v1.split('.');
    // v2 = v2.split('.');
    const k = Math.min(v1.length, v2.length);
    for (let i = 0; i < k; ++ i) {
        v1[i] = parseInt(v1[i], 10);
        v2[i] = parseInt(v2[i], 10);
        if (v1[i] > v2[i]) return 1;
        if (v1[i] < v2[i]) return -1;
    }
    return v1.length == v2.length ? 0: (v1.length < v2.length ? -1 : 1);
}

function processHTML(data) {
  // eval(data);
  var json = JSON.parse(data);
  var availableVersion=json.VERSION;
  if(getURLParameter("version") != "") {
    var currentVersion = getURLParameter("version");
    if(compareVersion(availableVersion, currentVersion) > 0) {
      document.getElementById("download").style.display = "block";
      document.getElementById("download").innerHTML = " <a href='" + json.LOCATION + "'>" + $.i18n("Version $1 is available", availableVersion) +"</a>";
    }
  } else {
    document.getElementById("download").style.display = "block";
    document.getElementById("download").innerHTML = " <a href='" + downloadURL + "'>" + $.i18n("Download Android app", availableVersion) +"</a>";
  }
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function getURLParameter(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable) {
      var value = pair[1];
      return decodeURIComponent( value.replace(/\+/g, ' ') );
    }
  }
  return "";
}

function showDisplay() {
  if(document.getElementById("lastname").innerHTML == "") {
    showForm();
    return;
  }
  document.getElementById("form").style.display = "none";
  document.getElementById("display").style.display = "block";
}

function showForm() {
  document.getElementById("display").style.display = "none";
  document.getElementById("form").style.display = "block";
}

function clearForm() {
  document.getElementById("f_firstname").value = "";
  document.getElementById("f_lastname").value = "";
  document.getElementById("f_nickname").value = "";
  document.getElementById("f_logo").value = "";
  refreshPage();
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function imagePicker() {
  if(typeof window.androidObj.textToAndroid === "function") {
    window.androidObj.textToAndroid("openImagePicker");
  }
}

function refreshPage() {
  document.getElementById("logo").src = document.getElementById("f_logo").value;
  if(document.getElementById("f_logo").value != "") {
    // document.getElementById("alt_logo").style.display = "none";
    setCookie("logo", document.getElementById("logo").getAttribute("src"), 60);
    if(typeof window.androidObj.textToAndroid === "function")
      window.androidObj.textToAndroid(document.getElementById("f_logo").value);
    document.getElementById("company_name").style.display = "none";
    document.getElementById("logo").style.display = "inline-block";
  } else {
    if(document.getElementById("company_name").innerHTML == "")
      document.getElementById("company_name").innerHTML = "Pick-Up";
    document.getElementById("company_name").style.display = "inline-block";
    document.getElementById("logo").style.display = "none";
  }
  document.getElementById("firstname").innerHTML = document.getElementById("f_firstname").value;
  document.getElementById("lastname").innerHTML = document.getElementById("f_lastname").value;
  if(document.getElementById("f_nickname").value != "")
  document.getElementById("nickname").innerHTML = "(" + document.getElementById("f_nickname").value + ")"
  else
  document.getElementById("nickname").innerHTML = "";
  showDisplay();

  return;
}

function initValues() {
  var logo;

  initLocales();
  // Fix buttons and placeholders
  document.getElementById("submit").value=$.i18n("Submit");
  document.getElementById("clear").value=$.i18n("Clear");
  document.getElementById("change").value=$.i18n("Change logo");
  document.getElementById("f_firstname").placeholder=$.i18n("First name");
  document.getElementById("f_lastname").placeholder=$.i18n("Name (required)");
  document.getElementById("f_nickname").placeholder=$.i18n("Nickname");

  checkUpates();

  if(getURLParameter("logo") != "") {
    logo = getURLParameter("logo");
  } else {
    logo = getCookie("logo");
  }
  if(logo != "") {
    document.getElementById("logo").src = logo;
    // document.getElementById("h_logo").value = logo;
    document.getElementById("f_logo").value = logo;
  }
  if(getURLParameter("firstname") != "") {
    document.getElementById("firstname").innerHTML = getURLParameter("firstname");
    // document.getElementById("h_firstname").value = getURLParameter("firstname");
    document.getElementById("f_firstname").value = getURLParameter("firstname");
  }
  if(getURLParameter("lastname") != "") {
    document.getElementById("lastname").innerHTML = getURLParameter("lastname");
    // document.getElementById("h_lastname").value = getURLParameter("lastname");
    document.getElementById("f_lastname").value = getURLParameter("lastname");
  }
  if(getURLParameter("nickname") != "") {
    document.getElementById("nickname").innerHTML = getURLParameter("nickname");
    // document.getElementById("h_nickname").value = getURLParameter("nickname");
    document.getElementById("f_nickname").value = getURLParameter("nickname");
  }
  if(getURLParameter("company_name") != "") {
    document.getElementById("company_name").innerHTML = getURLParameter("company_name");
  }

  if(getURLParameter("action") == "reset" || getURLParameter("lastname") == "") {
    document.getElementById("f_firstname").value = getURLParameter("firstname");
    document.getElementById("f_lastname").value = getURLParameter("lastname");
    document.getElementById("f_nickname").value = getURLParameter("nickname");
    showForm();
    return;
  }

  refreshPage()
  // showDisplay();
}
