(function() {
  /**
   * Config
   */
  var Group_buy_url =
    "https://shopify-app-development.yosgo.com" + "/group-buy?groupId=";
  var Param_groupId = "groupId"; /**網址上，用於的揪團 ID */
  var Param_tagType = "tagType"; /**網址上，用於承裝 Ifrmae 容器的類別 */
  var Param_tagName = "tagName"; /**網址上ㄝ用於承裝 Ifame 容器的名稱 */
  var PageName = "group-buy";

  function qs(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  if (window.location.href.indexOf(PageName) >= 0) {
    /**僅在 group-buy 的 page 內作用 */
    if (qs(Param_groupId)) {
      /**確認 groupId 是否存在 */
      var page = document.createElement("iframe");
      page.setAttribute("src", Group_buy_url + qs(Param_groupId));
      page.setAttribute("scrolling", "no");
      page.setAttribute(
        "style",
        "width: 100%; border: 0px; min-height: 100vh;"
      );
      if (qs(Param_tagName) && qs(Param_tagType)) {
        /**Iframe 放在某元件中 */
        console.log("[Jioukou Iframe loaded in certain element]");
      } else {
        /**Iframe 放在 Body 內 */
        document.body.innerHTML = "";
        document.body.appendChild(page);
        console.log("[Jioukou Iframe loaded in body]");
      }
    } else {
      alert(
        "Can't read group ID. Please check webiste url or page is set with right way"
      );
    }
  }
})();
