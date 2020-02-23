<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);

function debug($message) {
  global $debug;
  $debug.=$message."\n";
}

$debug="";
$webroot="";
$buildVersion="";
$buildUrl="";
$directory=dirname(getenv('SCRIPT_FILENAME'));
$baseuri=dirname(getenv('SCRIPT_URI')."ignore");

$d = dir("$webroot/$directory");
if($d) {
  while($file=$d->read())
  {
    if (! preg_match("/\.APK/i", $file)) continue;
    $version=(preg_replace("/^[^-]*-([0-9-\.]*)\.apk/i", "\\1", $file));
    if (version_compare($version, $buildVersion, ">")) {
      $buildVersion=$version;
      $buildUrl="$baseuri/$file";
      if(!preg_match("/-/", $version)) {
        $stableVersion=$buildVersion;
        $stableUrl=$buildUrl;
      }
    };
  }
}
if(isset($_REQUEST['dev'])) {
  $version=$buildVersion;
  $location=$buildUrl;
} else {
  $version=$stableVersion;
  $location=$stableUrl;
}
if(isset($_REQUEST['query'])) {
  header("Content-Type: text/plain");
  header("Access-Control-Allow-Origin: *");
  echo "VERSION=$version\n";
  echo "LOCATION=$location\n";
  echo $debug;
} else  {
  header("Location: $location");
  exit();
}

?>
