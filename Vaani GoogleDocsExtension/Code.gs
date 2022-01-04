
/**
==todo=
if it is long text? parse and to API call
publish it in app store
 * //@OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 https://stackoverflow.com/questions/58719628/how-do-i-create-a-user-managed-cloud-platform-project
 todo
 threading on large words
 split word function with standard codes. sandhi is missing
 */
function onOpen(e) {
  DocumentApp.getUi().createMenu("spellcheck").addItem('Start', 'showSidebar').addToUi()
  //.createAddonMenu().addItem('Start', 'showSidebar').addToUi();
}

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 */
function showSidebar() {
 
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Vaani SpellChecker');
  DocumentApp.getUi().showSidebar(ui);
}



function test(){//var r=getspellcheck();//"நாமும் அடுத்த தலைமுறையும் கணினியில் இயன்றளவிற்குத் தமிழைப் பயன்படுத்துவோம்.");
//var r =replaceText("கிண்டில்","குண்டில்");
//Logger.log(r);
  
  
  var words = wordspit("நாமும் அடுத்த தலைமுறையும் கணினியில் இயன்றளவிற்குத் தமிழைப் பயன்படுத்துவோம்.");
  Logger.log(words.join("|"));
}
function doGet(e) {
return HtmlService.createTemplateFromFile('sidebar').evaluate();
}
function getspellcheck() {
  var text = getAllText();//.join('\n');
  //return text;
  //return [{"uword":text,"sword":"test"}];
  if(text.length<1)return [];

  var prod = true;
var url="http://vaani.neechalkaran.com/v2/spellcheck";
var txt=text;txt=txt.replace(RegExp("ெ"+"ா","gi"),"ொ");txt=txt.replace(RegExp("ே"+"ா","gi"),"ோ");
  
  //return [{"uword":txt,"sword":"test"}];
   if(prod){var pload={"tamilwords":txt,"sandhi":true, "translated":true, "apikey":"master98654"};}
   else{  var pload={"tamilwords":txt,"sandhi":false, "translated":false, "apikey":"master98654"};}
   
  var options ={"method" : "POST","followRedirects" : false,  "header":{"ContentType":"application/xml; charset=utf-8"}, "payload" : pload };
var data = JSON.parse(UrlFetchApp.fetch(url,options).getContentText());

  
var content=[];
 for(var i = 0; i < data.length;i++){
                var oword =data[i].Userword;
              if(oword==="")continue;//skip if word is empty
      
     if(data[i].Flag===false){
              if(data[i].Suggestions!="wrong"){
                                               if(data[i].Solspan<0)continue;//to avoid -1 solspan
                 if(i+1<data.length) {
                   
                 
                 content.push({"uword":data[i].Userword+" "+data[i+1].Userword, "sword":data[i].Suggestions+" "+data[i+1].Userword});}
                  else{content.push({"uword":data[i].Userword, "sword":data[i].Suggestions});}}
              
      }
  }
  
return content;
}


function wordspit(words)
{
var ta="";
var sy="";
var word=new Array();
var tamil=false;
for(i=0;i<words.length;i++)
{   if (words[i].search(RegExp("[ஂ-௺0-9]", "gi")) == 0)//accept tamil or numeric
  //if((words[i]>=String.fromCharCode(2944))&&(words[i]<=String.fromCharCode(3071)))
{ta = ta + words[i];if(tamil!=true){tamil=true;write(sy,0);}sy="";}
else{sy=sy+words[i];if(tamil==true){tamil=false;write(ta,1);}ta="";}
}


function write(a,b){//b=1,then write content
if(b==1){
var found="false";
//for(j=0;j<filter1.length;j++){if((a.search(filter1[j])==0)&&(filter1[j]!="")){found="true";break;}}
//for(j=0;j<filter2.length;j++){if(a==filter2[j]){found="true";break;}}
if(found=="false"){word.push(a);}

}else{
if(a.replace(/ /gi,"").length>0){word.push("");}//to access comma for Ottru desion
//if(a != RegExp("[ ]+","gi")){word.push("");}//to access comma for Ottru desion
//word.push("");
}}
return word;

}


function getAllText() {
var Mdoc = DocumentApp.getActiveDocument()
var paras = Mdoc.getParagraphs(); 

var selection="";
  for (var h=0; h<paras.length; h++){
selection += ". "+paras[h].getText();}

return wordspit(selection).join("|");
}
function replaceText(a,b,c)//from word. to word, error number
{
var Mdoc = DocumentApp.getActiveDocument()
var check =Mdoc.getBody().findText(a);
if(check!=null)
{var t =Mdoc.getBody().replaceText(a, b);
//Logger.log(t);
return c;// to hide the options
}
return false;
}


    