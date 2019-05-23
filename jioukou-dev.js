(function() {
  /**
   * Config
   */
  var Group_buy_url =
    "https://shopify-app-development.yosgo.com" + "/clients?groupId=";
  var ParamName = "groupId";
  var PageName = "group-buy";

  /**
   * 1. Read window url. Check url is Shopify group buy page or not
   * 2. Parse group buy page to get groupId from Shopify store webiste
   * 3. Insert Jioukou app into Shopify group buy page
   */

  console.log("[Jioukou ScriptTag loaded]");

  function qs(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  if (window.location.href.indexOf(PageName) >= 0) {
    if (qs(ParamName)) {
      var page = document.createElement("iframe");
      page.setAttribute("style", "width: 100%; border: 0px; height: 100vh;");
      page.setAttribute("src", Group_buy_url + qs(ParamName));
      document.body.innerHTML = "";
      document.body.appendChild(page);
    } else {
      alert(
        "Can't read group ID. Please check webiste url or page is set with right way"
      );
    }
  }
})();
