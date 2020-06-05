<!DOCTYPE HTML><html lang="en">

<head><meta charset="UTF-8"/>

  <meta content="#191919" name="theme-color"/>
  <title>Doce</title>
  <link rel="stylesheet" href="static/gamepage.css"/>


  <script type="text/javascript" src="static/lib.js"></script>
  <script type="text/javascript" src="static/util.js"></script>
  <script type="text/javascript" src="static/game.js"></script>

  <style>
  body{
    background:#cbcdd3;
  }
  .header-title{
    padding : 0;
    max-width: 50%;
    align-items: center;
    display:flex;
    justify-content: flex-start;
    margin: 0;
    margin-top: -1rem;
    margin-left: 2.4rem;
    font-family: "Helvetica";
    font-size: 1.8rem;
    letter-spacing: -0.015em;
    text-align: left;
  }
  .header-title .title{
    margin: 1rem,0,0,2.4rem;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    color: black;
  }
  </style>

</head>

<body data-page_name="game">

  <!-- <div id = "docegame-header" style = "background : #afafaf; height: 15%; width: 100%; ">
    <div class = 'header-title'>
      <a href = "https://docegame.com" class = "title">DOCE® Game</a>
  </div> -->
  <?php include "docegame.com/wp/wp-blog-header.php";?>

  </div>

  <div id="wrapper" class="main wrapper" style= "height: 100%; ">
    <div class="inner_column" id="inner_column" style = "margin-top: 1px; background:#cbcdd3;  ">

      <!-- GAME PAGE -->
      <div id="view_html_game_page_30137" class="view_html_game_page view_game_page page_widget">

        <!--GAME CONTAINER START-->
        <div id="html_embed_widget_94781" class="html_embed_widget embed_wrapper">
          <div data-height="524" data-width="896" class="game_frame game_pending" style="width: 896px; height: 524px; padding:0; margin: 0">
            <button title="Enter fullscreen" class="fullscreen_btn">
              <img src="Assets/fullScreenRed.png"/>
            </button>
            <!-- IFRAME -->
            <div style = "background:black;"   data-iframe="&lt;iframe mozallowfullscreen=&quot;true&quot;
              allow=&quot;autoplay; fullscreen *; geolocation; microphone; camera; midi&quot; frameborder=&quot;0&quot;
              src=web_build/index.html msallowfullscreen=&quot;true&quot; scrolling=&quot;no&quot;
              allowfullscreen=&quot;true&quot; webkitallowfullscreen=&quot;true&quot; id=&quot;game_drop&quot;
              allowtransparency=&quot;true&quot;&gt;&lt;/iframe&gt;" class="iframe_placeholder">

              <button id = "start_button" class="button load_iframe_btn" style = "background : #870c2d" >
                <svg stroke-linecap="round" stroke="grey" class="svgicon icon_play" role="img" version="1.1" viewBox="0 0 24 24"
                stroke-width="2" height="50" stroke-linejoin="round" aria-hidden fill="none" width="2">
                  <!-- <circle cx="12" cy="12" r="10"></circle> -->
                  <!-- <polygon points="10 8 15 12 10 16  9" style="fill:white";></polygon> -->
                </svg>START
              </button>
            </div>
          </div>
        </div>
      <!--GAME CONTAINER END-->

        <script type="text/javascript">
          new I.HtmlEmbed('#html_embed_widget_94781', {
            "width":896,
            "start_maximized":false,
            "height":524
          })
        </script>
    </div>
    <script type="text/javascript">

      new I.ViewHtmlGame(
        '#view_html_game_page_30137', {
          "id":611145,
          "hit_url":"",
          "type_name":"html",
          "play_after":90,
          "actual_price":0,
          "min_price":0,
          "slug":"doce-web",
          "play_url":"/web_build/index.html",
          "type":5
        }, {});
    </script>
    <script type="text/javascript">
          I.setup_layout()
    </script>
    <script id="loading_lightbox_tpl" type="text/template">
        <div class="lightbox loading_lightbox"><div class="loader_outer"><div class="loader_label">Loading</div><div class="loader_bar"><div class="loader_bar_slider"></div></div></div></div>
    </script>
    <script type="text/javascript">
        I.setup_page();
    </script>

  </div>
</div>

  </body>
</html>
