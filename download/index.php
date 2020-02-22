<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);

function debug($message) {
  global $debug;
  $debug.=$message."\n";
}

$debug="";
$webroot="";
$lastversion="";
$downloadfile="";
$directory=dirname(getenv('SCRIPT_FILENAME'));
$baseuri=dirname(getenv('SCRIPT_URI')."ignore");

$d = dir("$webroot/$directory");
if($d) {
  while($file=$d->read())
  {
    if (! preg_match("/\.APK/i", $file)) continue;
    $version=(preg_replace("/^[^-]*-([0-9-\.]*)\.apk/i", "\\1", $file));
    if (version_compare($version, $lastversion, ">")) {
      $lastversion=$version;
      $downloadfile="$baseuri/$file";
      // if(!preg_match("/-/", $version)) {
      //   $laststable=$lastversion;
      //   $downloadstable=$downloadfile;
      // }
    };
  }
}
if(isset($_REQUEST['query'])) {
  header("Content-Type: text/plain");
  echo "VERSION=$lastversion\n";
  echo "LOCATION=$downloadfile\n";
  echo $debug;
} else {
  header("Location: $downloadfile");
  exit();
}
?>
