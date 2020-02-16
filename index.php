<?php
$logo="https://lelitdoli.eu/wp-content/uploads/2019/02/lelitdoli-logo-v1-fuchsia-1.png";
$name=$_REQUEST[name];
$firstname=$_REQUEST[firstname];
$nickname=$_REQUEST[nickname];
?><html>
<title><?php echo trim($firstname . " " . $name . " Pick Up"); ?></title>
<link rel="icon" href="images/pickup-logo-32x32.png" sizes="32x32" />
<link rel="icon" href="images/pickup-logo-192x192.png" sizes="192x192" />
<link rel="apple-touch-icon-precomposed" href="images/pickup-logo-180x180.png" />

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<link type="text/css" rel="stylesheet[nickname]" href="pub/contrat.css" media="all" />
<style>
#panel {
  font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
  line-height: 100%;
  margin: 0;
  padding: 0;
  width: auto;
}
#panel table {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: 0;
}
#panel,
#panel #header,
#panel #name {
  text-align: center;
  font-size: 100pt;
}
#panel #header,
#panel #footer {
  height: 0px;
}

#panel #name {
  vertical-align:middle;
}
#panel .firstname {
  font-size: 70%;
  font-weight: light;
  line-height: 100%;
}
#panel .lastname {
  font-weight: bold;
}
#panel .nickname {
  font-size: 50%;
  line-height: 100%;
}
img,
table,
tr,
td,
div {
  max-width: 100%;
}
</style>

<head>
  <title><?php echo $name ?></title>
</head>
<body id=panel><center>
  <table>
    <tr>
      <td><div id="header">
        <div id="logo"><img src="<?php echo $logo; ?>" alt="<?php echo "$company"; ?>"></div>
      </div>
    </td>
  </tr>
  <tr>
    <td id=name valign=middle style="">
      <?php if(empty($name)) { ?>
      <h1>Pick Up</h1>
      <div>Choose a name</div>
        <form>
          <input type=text name=firstname placeholder="First name">
          <input type=text name=name placeholder="Last Name">
          <!-- <input type=text name=nickname placeholder="Nick name"> -->
          <input type="submit" value="Submit">
        </form>
      <?php } else { ?>
      <div class=firstname><?php echo $firstname ?></div>
      <div class=lastname><?php echo $name ?></div>
    <?php } ?>
    </td></tr>
  </table>
</center></body>
</html>
