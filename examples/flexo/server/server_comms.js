
altspaceutil.getFullspaceEnclosure().then(function(enclosure) { start(enclosure); });

function start(enclosure) {
    sim = new altspace.utilities.Simulation();
    console.log("Start...");
}

function ServerComms() {
    var siteURL = "https://rocketfoss.org/";

    var req = new XMLHttpRequest();

    console.log(req);

    // req.open('GET', 'proxy.php?url=http://www.google.com', false);
    req.open('GET', "url=" + siteURL, false);
    req.send(null);

    // if(req.status == 200) {
    alert(req.responseText);
    // }
}
