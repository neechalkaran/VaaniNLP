/*Developed by neechalkaran@gmail.com*/

// Keep tab ids with injected code here.
const injectedTabs = new Set();

function Spellcheckme(text, tabId, message) {//load vaani script here due to construct needs to called
chrome.tabs.executeScript({file: "vaani.js"}, function() {
  if(chrome.runtime.lastError) {
    console.error("Script injection failed: " + chrome.runtime.lastError.message);
  }
});
}


dictionaryme = function(word){ var query = word.selectionText;
    chrome.tabs.create({url: "http://vaani.neechalkaran.com/word/" + query}); };

//ensure no space to use it in url
function fakePost(url, selectedtext) {//selectedtext will be send as post request to given url
var form = document.createElement("form");
form.setAttribute("method", "post");
form.setAttribute("action", url);
var params = {content: selectedtext};
for(var key in params) {
var hiddenField = document.createElement("input");
hiddenField.setAttribute("type", "hidden");
hiddenField.setAttribute("name", key);
hiddenField.setAttribute("value", params[key]);
form.appendChild(hiddenField);
}
document.body.appendChild(form);
form.submit();
};
//minify function
fakePostCode = fakePost.toString().replace(/(\n|\t)/gm,'');

nokkarme = function(word){ var query = encodeURIComponent(word.selectionText.replace(/"/gi, "''"));
chrome.tabs.create({url: "javascript:"+fakePostCode+"; fakePost(\""+"http://apps.neechalkaran.com/nokkar"+"\", \""+query+"\");"}); };

sulakume = function(word){ var query = encodeURIComponent(word.selectionText.replace(/"/gi, "''"));
chrome.tabs.create({url: "javascript:"+fakePostCode+"; fakePost(\""+"http://apps.neechalkaran.com/sulaku"+"\", \""+query+"\");"}); };


chrome.contextMenus.create({id: "vaani_id", title:"மொழிக் கருவிகள்", contexts: ["selection"]});
chrome.contextMenus.create({
  id: "Vaani_s",
  parentId: "vaani_id",
  title: "பிழை சோதனை",
  contexts: ["editable"],
  onclick: (info, tab) => Spellcheckme(info.selectionText, tab.id, { model: 'czech-spellchecker', edit: true }),
});

chrome.contextMenus.create({
  id: "Vaani_d",
  parentId: "vaani_id",
  title: "அகராதி தேடல்",
  contexts: ["selection"],
  onclick: dictionaryme
});
chrome.contextMenus.create({
  id: "Vaani_n",
  parentId: "vaani_id",
  title: "பிழை சோதனை2",
  contexts: ["selection"],
  onclick: nokkarme
});
chrome.contextMenus.create({
  id: "Vaani_g",
  parentId: "vaani_id",
  title: "சொல் ஆய்வு",
  contexts: ["selection"],
  onclick: sulakume
});





