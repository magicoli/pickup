function debug(message) {
  // document.getElementById("debug").innerHTML = document.getElementById("debug").innerHTML + message + "\n<br>";
  return;
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
}

function setCookie(cname, cvalue, exdays) {
 var d = new Date();
 d.setTime(d.getTime() + (exdays*24*60*60*1000));
 var expires = "expires="+ d.toUTCString();
 document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
 debug("setCookie " + cname + "=" + cvalue);
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
      debug("getCookie: " + cname + "=" + c.substring(name.length, c.length));
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function refreshPage() {
  document.getElementById("logo").src = document.getElementById("f_logo").value;
  if(document.getElementById("f_logo").value != "") {
    document.getElementById("alt_logo").style.display = "none";
    setCookie("logo", document.getElementById("logo").getAttribute("src"), 60);
  }
  document.getElementById("firstname").innerHTML = document.getElementById("f_firstname").value;
  document.getElementById("lastname").innerHTML = document.getElementById("f_lastname").value;
  document.getElementById("nickname").innerHTML = "";
  if(getURLParameter("nickname") != "") document.getElementById("nickname").innerHTML = "(" + document.getElementById("f_nickname").value + ")";
  showDisplay();
  return;
}

function initValues() {
  var logo;
  debug("init");
  if(getURLParameter("source") != "mobileapp")
  document.getElementById("download").style.display = "block";

  if(getURLParameter("logo") != "") {
    logo = getURLParameter("logo");
    debug("from url: " + logo);
  } else {
    logo = getCookie("logo");
    debug("from cookies: " + logo);
  }

  if(logo != "") {
    document.getElementById("logo").src = logo;
    document.getElementById("h_logo").value = logo;
    document.getElementById("f_logo").value = logo;
  }
  if(getURLParameter("firstname") != "") {
    document.getElementById("firstname").innerHTML = getURLParameter("firstname");
    document.getElementById("h_firstname").value = getURLParameter("firstname");
    document.getElementById("f_firstname").value = getURLParameter("firstname");
  }
  if(getURLParameter("lastname") != "") {
    document.getElementById("lastname").innerHTML = getURLParameter("lastname");
    document.getElementById("h_lastname").value = getURLParameter("lastname");
    document.getElementById("f_lastname").value = getURLParameter("lastname");
  }
  if(getURLParameter("nickname") != "") {
    document.getElementById("nickname").innerHTML = "(" + getURLParameter("nickname") + ")";
    document.getElementById("h_nickname").value = getURLParameter("nickname");
    document.getElementById("f_nickname").value = getURLParameter("nickname");
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
