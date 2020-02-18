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

function refreshPage() {
  document.getElementById("logo").src = document.getElementById("f_logo").value;
  if(document.getElementById("f_logo").value != "") document.getElementById("alt_logo").style.display = "none";
  document.getElementById("firstname").innerHTML = document.getElementById("f_firstname").value;
  document.getElementById("lastname").innerHTML = document.getElementById("f_lastname").value;
  document.getElementById("nickname").innerHTML = "";
  if(getURLParameter("nickname") != "") document.getElementById("nickname").innerHTML = "(" + document.getElementById("f_logo").value + ")";
  showDisplay();
  return;
}

function populateValues() {
  if(getURLParameter("action") == "reset" || getURLParameter("lastname") == "") {
    showForm();
    if(getURLParameter("logo") != "") document.getElementById("f_logo").value = getURLParameter("logo");
    document.getElementById("f_firstname").value = getURLParameter("firstname");
    document.getElementById("f_lastname").value = getURLParameter("lastname");
    document.getElementById("f_nickname").value = getURLParameter("nickname");
    return;
  }

  showDisplay();

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
