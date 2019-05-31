/** v1.0.0 */
(function() {
  /** Env config */
  var Group_buy_url =
    "https://shopify-app-development.yosgo.com" + "/group-buy?groupId=";
  var API_URL = "https://shopify-api-development.yosgo.com/graphql";

  /** Common config */
  var Param_groupId = "groupId"; /**網址上，用於的揪團 ID */
  var Param_shopId = "shopId"; /**網址上，用於查詢商店基本資料 */
  var PageName = "group-buy";

  function qs(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  /**僅在 group-buy 的 page 內作用 */
  if (window.location.href.indexOf(PageName) >= 0) {
    /**確認 groupId, shopId 是否存在 */
    if (qs(Param_groupId) && qs(Param_shopId)) {
      /**查詢 shop 資料 */
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query:
            '{  getShopSettings(shopId: "' +
            qs(Param_shopId) +
            '.myshopify.com") {    tag_type    tag_name    language    message    errors  }}'
        })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(jsonData) {
          var tag_name = jsonData.data.getShopSettings.tag_name;
          var tag_type = jsonData.data.getShopSettings.tag_type;
          /**建立 iframe 元件 */
          var page = document.createElement("iframe");
          page.setAttribute("src", Group_buy_url + qs(Param_groupId));
          page.setAttribute(
            "style",
            "width: 100%; border: 0px; min-height: 100vh;"
          );
          /**決定 iframe 位置 */
          if (tag_type === "body") {
            /**Iframe 於 body  */
            document.body.innerHTML = "";
            document.body.appendChild(page);
            console.log("[Jioukou loaded in body]");
          } else {
            if (tag_type === "class") {
              var element = document.getElementsByClassName(tag_name)[0];
              element.innerHTML = "";
              element.appendChild(page);
              console.log("[Jioukou loaded in class]");
            } else if (tag_type === "id") {
              var element = document.getElementById(tag_name);
              element.innerHTML = "";
              element.appendChild(page);
              console.log("[Jioukou loaded in id]");
            }
          }
        });
    } else {
      alert("GroupId is missing. It might wrong with url");
    }
  }
})();
