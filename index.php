<?php
$logos=array(
  "Le lit d'Oli" => "https://lelitdoli.eu/wp-content/uploads/2019/02/lelitdoli-logo-v1-fuchsia-1.png",
  "Gîtes Mosaïques" => "https://gites-mosaiques.com/wp-content/uploads/2019/06/mosaiques-logo-v3-1L-yellow.png",
  "Kaz à Moïse" => "https://kazamoise.fr/wp-content/uploads/2019/03/kazamoise-logo-v0-248x40.png",
);
if(isset($_REQUEST[logo])) {
  $logo=$_REQUEST[logo];
  setcookie("pickup_logo", $logo, time()+2*24*60*60);
} else if(isset($_COOKIE["pickup_logo"])) {
  $logo=$_COOKIE["pickup_logo"];
} else {
  $logo=array_values($logos)[0];
}

$action=$_REQUEST[action];
if($action != "Clear") {
  $name=$_REQUEST[name];
  $firstname=$_REQUEST[firstname];
  $nickname=$_REQUEST[nickname];
}
$resetlink=$_SERVER['SCRIPT_URI'] . "?" . http_build_query(array_merge( $_GET, array( 'action' => 'reset' )));
?><html>
<title><?php echo trim($firstname . " " . $name . " Pick Up"); ?></title>
<link rel="icon" href="images/pickup-logo-32x32.png" sizes="32x32" />
<link rel="icon" href="images/pickup-logo-192x192.png" sizes="192x192" />
<link rel="apple-touch-icon-precomposed" href="images/pickup-logo-180x180.png" />

<link rel='stylesheet' id='pu_main'  href='css/main.css' type='text/css' media='all' />
<?php if(!empty($_REQUEST[name])) { ?>
  <link rel='stylesheet' id='pu_main'  href='css/pane.css' type='text/css' media='all' />
<?php } ?>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<link type="text/css" rel="stylesheet[nickname]" href="pub/contrat.css" media="all" />
<style>

</style>

<head>
  <!-- <title><?php echo $name ?></title> -->
</head>
<body id=panel><center>
  <?php if(empty($name) || $action=="reset") { ?>
    <!-- <div id="logo"><img src="<?php echo $logo; ?>" alt="<?php echo "$company"; ?>"></div> -->
    <form method="post">
      <div>
      <select id="logo" name="logo">
        <?php while(list($key, $value) = each($logos)) {
          if($value==$logo) $selected="selected";
          else $selected="";
          echo "<option value='$value' $selected>$key</option>";
        }
        ?>
      </select>
    </div>
      <input type=text name=firstname placeholder="First name" value="<?php echo $firstname ?>">
      <input type=text name=name placeholder="Name (required)" value="<?php echo $name ?>">
      <input type=text name=nickname placeholder="Nick name" value="<?php echo $nickname ?>">
      <div>
        <?php if(!empty($firstname . $name . $nickname)) { ?>
          <input type="submit" name=action value="Clear">
        <?php } ?>
        <input type="submit" value="Submit">
      </div>
    </form>
  <?php } else { ?>
  <table>
    <tr>
      <td><div id="header">
        <div id="logo">
          <form method=post>
            <input type=hidden name=firstname value="<?php echo $firstname ?>">
            <input type=hidden name=name value="<?php echo $name ?>">
            <input type=hidden name=nickname value="<?php echo $nickname ?>">
            <button type="submit" name=action value="reset">
              <img src="<?php echo $logo; ?>" alt="<?php echo "$company"; ?>">
            </button>
          </form>
        </div>
      </div></td>
    </tr>
    <tr>
    <td id=name valign=middle style="">
        <?php
        if(!empty($firstname)) echo "<div class=firstname>$firstname</div>";
        if(!empty($name)) echo "<div class=lastname>$name</div>";
        if(!empty($nickname)) echo "<div class=nickname>($nickname)</div>";
        ?>
    </td></tr>
      <tr>
        <td><div id="footer">
        </div></td>
      </tr>
  </table>
  <?php } ?>
</center></body>
</html>
