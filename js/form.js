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

function populateValues() {
  if(getURLParameter("action") == "reset" || getURLParameter("lastname") == "") {
    document.getElementById("display").style.display = "none";
    document.getElementById("form").style.display = "block";
    if(getURLParameter("logo") != "") document.getElementById("f_logo").value = getURLParameter("logo");
    document.getElementById("f_firstname").value = getURLParameter("firstname");
    document.getElementById("f_lastname").value = getURLParameter("lastname");
    document.getElementById("f_nickname").value = getURLParameter("nickname");
    return;
  }

  document.getElementById("display").style.display = "block";
  document.getElementById("form").style.display = "none";

  document.getElementById("logo").src = getURLParameter("logo");
  if(getURLParameter("logo") != "") document.getElementById("alt_logo").style.display = "none";
  document.getElementById("firstname").innerHTML = getURLParameter("firstname");
  document.getElementById("lastname").innerHTML = getURLParameter("lastname");
  if(getURLParameter("nickname") != "") document.getElementById("nickname").innerHTML = "(" + getURLParameter("nickname") + ")";

  document.getElementById("h_logo").value = getURLParameter("logo");
  document.getElementById("h_firstname").value = getURLParameter("firstname");
  document.getElementById("h_lastname").value = getURLParameter("lastname");
  document.getElementById("h_nickname").value = getURLParameter("nickname");
}
