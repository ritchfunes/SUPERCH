/**
 * Created by Walter Suazo on 17/03/2016.
 */
//var mandrill = require('mandrill-api/mandrill');
var SparkPost = require('sparkpost');

exports.mail = function(data,callback)
{
  key='cd35f268d0da357b7b0799c546d455cc3ef5b562';
  var sparky = new SparkPost(key);
  //mandrill_client = new mandrill.Mandrill('Wb9tcIxw5AtosCXwofgxpw');
  var message = {
    "html": getmail(data.token,data.empresa),
    "text": "chsa.stgands.com/invitado?token=" +data.token,
    "subject": "Acceso a GPS",
    "from_email": "GPS Tracker Provider <notificaciones@gpsandsecurity.com>",//new field on string
    "from_name": "GPS Tracker Provider",
    "to": [{
      "email": data.mail,
      "name": "Recipient Name",
      "type": "to"
    }],
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "tags": [
      "acceso-gps"
    ]
  };
  var async = false;
  var ip_pool = "Main Pool";
  var send_at = "2016-01-01 00:00:00";

  sparky.transmissions.send({
    transmissionBody: {
      options: {
        inline_css: true
      },
      content: {
        from: message.from_email,
        subject: 'Acceso a GPS',
        html: message.html,
        message: message
      },
      recipients: [
        {address: data.mail}
      ]
    }
  }, function (err, res) {
    if (err) {
      console.log('Error with Spark Post: '+err);
      callback(err,null);
    } else {
      console.log('Email send!');
      callback(null,"OK");
    }
  });

  /*mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
    console.log(result);
    callback (null,result)
      }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    callback(e,null);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });*/
}


function getmail(token,empresa)
{
  var strVar="";
  strVar += "";
  strVar += "<!doctype html>";
  strVar += "<html>";
  strVar += "<head>";
  strVar += "<meta name=\"viewport\" content=\"width=device-width\">";
  strVar += "<meta http-equiv=\"Content-Type\" content=\"text\/html; charset=UTF-8\">";
  strVar += "<title>Sabueso Track +<\/title>";
  strVar += "<style>";
  strVar += "";
  strVar += "* {";
  strVar += "  font-family: \"Helvetica Neue\", \"Helvetica\", Helvetica, Arial, sans-serif;";
  strVar += "  font-size: 100%;";
  strVar += "  line-height: 1.6em;";
  strVar += "  margin: 0;";
  strVar += "  padding: 0;";
  strVar += "}";
  strVar += "img {";
  strVar += "  max-width: 600px;";
  strVar += "  width: auto;";
  strVar += "}";
  strVar += "body {";
  strVar += "  -webkit-font-smoothing: antialiased;";
  strVar += "  height: 100%;";
  strVar += "  -webkit-text-size-adjust: none;";
  strVar += "  width: 100% !important;";
  strVar += "}";
  strVar += "\/* -------------------------------------";
  strVar += "    ELEMENTS";
  strVar += "------------------------------------- *\/";
  strVar += "a {";
  strVar += "  color: #348eda;";
  strVar += "}";
  strVar += ".btn-primary {";
  strVar += "  Margin-bottom: 10px;";
  strVar += "  width: auto !important;";
  strVar += "}";
  strVar += ".btn-primary td {";
  strVar += "  background-color: #348eda;";
  strVar += "  border-radius: 25px;";
  strVar += "  font-family: \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;";
  strVar += "  font-size: 14px;";
  strVar += "  text-align: center;";
  strVar += "  vertical-align: top;";
  strVar += "}";
  strVar += ".btn-primary td a {";
  strVar += "  background-color: #348eda;";
  strVar += "  border: solid 1px #348eda;";
  strVar += "  border-radius: 25px;";
  strVar += "  border-width: 10px 20px;";
  strVar += "  display: inline-block;";
  strVar += "  color: #ffffff;";
  strVar += "  cursor: pointer;";
  strVar += "  font-weight: bold;";
  strVar += "  line-height: 2;";
  strVar += "  text-decoration: none;";
  strVar += "}";
  strVar += ".last {";
  strVar += "  margin-bottom: 0;";
  strVar += "}";
  strVar += ".first {";
  strVar += "  margin-top: 0;";
  strVar += "}";
  strVar += ".padding {";
  strVar += "  padding: 10px 0;";
  strVar += "}";
  strVar += "\/* -------------------------------------";
  strVar += "    BODY";
  strVar += "------------------------------------- *\/";
  strVar += "table.body-wrap {";
  strVar += "  padding: 20px;";
  strVar += "  width: 100%;";
  strVar += "}";
  strVar += "table.body-wrap .container {";
  strVar += "  border: 1px solid #f0f0f0;";
  strVar += "}";
  strVar += "\/* -------------------------------------";
  strVar += "    FOOTER";
  strVar += "------------------------------------- *\/";
  strVar += "table.footer-wrap {";
  strVar += "  clear: both !important;";
  strVar += "  width: 100%;";
  strVar += "}";
  strVar += ".footer-wrap .container p {";
  strVar += "  color: #666666;";
  strVar += "  font-size: 12px;";
  strVar += "";
  strVar += "}";
  strVar += "table.footer-wrap a {";
  strVar += "  color: #999999;";
  strVar += "}";
  strVar += "\/* -------------------------------------";
  strVar += "    TYPOGRAPHY";
  strVar += "------------------------------------- *\/";
  strVar += "h1,";
  strVar += "h2,";
  strVar += "h3 {";
  strVar += "  color: #111111;";
  strVar += "  font-family: \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;";
  strVar += "  font-weight: 200;";
  strVar += "  line-height: 1.2em;";
  strVar += "  margin: 40px 0 10px;";
  strVar += "}";
  strVar += "h1 {";
  strVar += "  font-size: 36px;";
  strVar += "}";
  strVar += "h2 {";
  strVar += "  font-size: 28px;";
  strVar += "}";
  strVar += "h3 {";
  strVar += "  font-size: 22px;";
  strVar += "}";
  strVar += "p,";
  strVar += "ul,";
  strVar += "ol {";
  strVar += "  font-size: 14px;";
  strVar += "  font-weight: normal;";
  strVar += "  margin-bottom: 10px;";
  strVar += "}";
  strVar += "ul li,";
  strVar += "ol li {";
  strVar += "  margin-left: 5px;";
  strVar += "  list-style-position: inside;";
  strVar += "}";
  strVar += "\/* ---------------------------------------------------";
  strVar += "    RESPONSIVENESS";
  strVar += "------------------------------------------------------ *\/";
  strVar += "\/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something *\/";
  strVar += ".container {";
  strVar += "  clear: both !important;";
  strVar += "  display: block !important;";
  strVar += "  Margin: 0 auto !important;";
  strVar += "  max-width: 600px !important;";
  strVar += "}";
  strVar += "\/* Set the padding on the td rather than the div for Outlook compatibility *\/";
  strVar += ".body-wrap .container {";
  strVar += "  padding: 20px;";
  strVar += "}";
  strVar += "\/* This should also be a block element, so that it will fill 100% of the .container *\/";
  strVar += ".content {";
  strVar += "  display: block;";
  strVar += "  margin: 0 auto;";
  strVar += "  max-width: 600px;";
  strVar += "}";
  strVar += "\/* Let's make sure tables in the content area are 100% wide *\/";
  strVar += ".content table {";
  strVar += "  width: 100%;";
  strVar += "}";
  strVar += "<\/style>";
  strVar += "<\/head>";
  strVar += "";
  strVar += "<body bgcolor=\"#f6f6f6\">";
  strVar += "";
  strVar += "<!-- body -->";
  strVar += "<table class=\"body-wrap\" bgcolor=\"#f6f6f6\">";
  strVar += "  <tr>";
  strVar += "    <td><\/td>";
  strVar += "    <td class=\"container\" bgcolor=\"#FFFFFF\">";
  strVar += "";
  strVar += "      <!-- content -->";
  strVar += "      <div class=\"content\">";
  strVar += "      <table>";
  strVar += "        <tr>";
  strVar += "          <td>";
  strVar += "            <h2>"+empresa+" te ha invitado a observar un vehiculo<\/h2>";
  strVar += "            <!-- button -->";
  strVar += "            <table class=\"btn-primary\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">";
  strVar += "              <tr>";
  strVar += "                <td>";
  strVar += "                  <a href=\'http:\/\/chsa.stgands.com/invitado?t="+token+"'>Click para ver unidad</a>";
//  strVar += "                  <a href=\'localhost:300/invitado?t="+token+"'>Click para ver unidad<\/a>";
  strVar += "                <\/td>";
  strVar += "              <\/tr>";
  strVar += "            <\/table>";
  strVar += "            <!-- \/button -->";
  strVar += "            <p>Entra y Observa la ubicacion actual del vehiculo<\/p>";
  strVar += "";
  strVar += "          <\/td>";
  strVar += "        <\/tr>";
  strVar += "      <\/table>";
  strVar += "      <\/div>";
  strVar += "      <!-- \/content -->";
  strVar += "";
  strVar += "    <\/td>";
  strVar += "    <td><\/td>";
  strVar += "  <\/tr>";
  strVar += "<\/table>";
  strVar += "<!-- \/body -->";
  strVar += "";
  strVar += "";
  strVar += "<!-- footer -->";
  strVar += "<table class=\"footer-wrap\">";
  strVar += "  <tr>";
  strVar += "    <td><\/td>";
  strVar += "    <td class=\"container\">";
  strVar += "";
  strVar += "      <!-- content -->";
  strVar += "      <div class=\"content\">";
  strVar += "        <table>";
  strVar += "          <tr>";
  strVar += "            <td align=\"center\">";
  strVar += "              <p> <a href=\"https:\/\/twitter.com\/Terwalito\"><unsubscribe>Follow me<\/unsubscribe><\/a>.";
  strVar += "              <\/p>";
  strVar += "            <\/td>";
  strVar += "          <\/tr>";
  strVar += "        <\/table>";
  strVar += "      <\/div>";
  strVar += "      <!-- \/content -->";
  strVar += "";
  strVar += "    <\/td>";
  strVar += "    <td><\/td>";
  strVar += "  <\/tr>";
  strVar += "<\/table>";
  strVar += "<!-- \/footer -->";
  strVar += "";
  strVar += "<\/body>";
  strVar += "<\/html>";
  strVar += "";
  return strVar;

}
