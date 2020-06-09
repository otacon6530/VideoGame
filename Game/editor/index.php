<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <script src="http://www.google.com/jsapi"></script>
      <script>
         google.load("jquery", "1.3.2");
         google.load("jqueryui", "1.7.1");
      </script>
      <script type="text/javascript" src="editor/js/main.js"></script>
      <title>HTML5 RPG</title>
   </head>
   <body>
      <h1>Game Editor</h1>
      <div id="control">
          <?php
          ini_set('display_errors', 1);
          ini_set('display_startup_errors', 1);
          error_reporting(E_ALL);
          $scanned_directory = array_diff(scandir(__DIR__."\chunk\layer1"), array('..', '.'));
          ?>
          <select id='image' size=10>
              <?php
              foreach ($scanned_directory as $value) {
              echo "
              <option value='".$value."'>".$value."</option>";
              }
              unset($value);
              ?>
          </select>
          <canvas id="canvas" width="1024" height="1024"></canvas>
      </div>
   </body>
</html>