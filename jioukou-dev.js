/** v1.0.0 */
(function() {
  /** Config */
  var Group_buy_url =
    "https://shopify-app-development.yosgo.com" + "/group-buy?groupId=";
  var Param_groupId = "groupId"; /**網址上，用於的揪團 ID */
  var Param_tagType = "tagType"; /**網址上，用於承裝 Iframe 容器的類別 */
  var Param_tagName = "tagName"; /**網址上，用於承裝 Iframe 容器的名稱 */
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
    /**確認 groupId 是否存在 */
    if (qs(Param_groupId)) {
      /**建立 iframe 元件 */
      var page = document.createElement("iframe");
      page.setAttribute("src", Group_buy_url + qs(Param_groupId));
      page.setAttribute(
        "style",
        "width: 100%; border: 0px; min-height: 100vh;"
      );
      /**決定 Iframe 位置 */
      if (
        qs(Param_tagName) &&
        qs(Param_tagType) &&
        qs(Param_tagName) !== "" &&
        qs(Param_tagType) !== ""
      ) {
        if (qs(Param_tagType) === "class") {
          /**Iframe 於 class 的元件中*/
          var ele = document.getElementsByClassName(qs(Param_tagName));
          ele.innerHTML = "";
          ele.appendChild(page);
          console.log("[Jioukou loaded in class element]");
        } else if (qs(Param_tagType) === "id") {
          /**Iframe 於 id 的元件中*/
          var ele = document.getElementById(qs(Param_tagName));
          ele.innerHTML = "";
          ele.appendChild();
          console.log("[Jioukou loaded in id element]");
        }
      } else {
        /**Iframe 於 body  */
        document.body.innerHTML = "";
        document.body.appendChild(page);
        console.log("[Jioukou loaded in body]");
      }
    } else {
      alert("GroupId is missing. It might wrong with url");
    }
  }
})();
