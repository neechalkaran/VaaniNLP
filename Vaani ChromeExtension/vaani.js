/*Developed by neechalkaran@gmail.com*/

var tsize = 150;
var myarea;
var nosandhi ="மட்டுமே,அங்கே,இங்கே,எங்கே,இதோ,அதோ,ஏதோ,கீழே,மேலே,வழியிலோ,அங்கோ,இங்கோ,மட்டுமோ,என்றோ,போன்ற,நல்ல,கரிய,அரிய,பழைய,இனிய,இளைய,மூத்த,சிறந்த,உயர்ந்த,சிறிய,பெரிய,புதிய,முதலிய,என்ற,ஆகிய,கடந்த,வந்த,இணைந்த.கொண்ட,கண்ட,செய்த,இருந்த,கூடிய,தகாத,இல்லாத,செல்லாத,காணாத,ஓடாத,ஏற்காத,போன்று,என்று,வந்து,கடந்து,நடந்து,தொடர்ந்து,கொண்டு,கண்டு,செய்து,இணைந்து,அவருடைய,அவனுடைய,அவளுடைய,அம்மா,அப்பா,தம்பி,தங்கை,அக்கா,அண்ணா,தாத்தா,பாட்டி,தோழி,நண்பர்,மனைவி,தந்தை,மாமா,பலர்,சிலர்,அவர்,இவர்,எவர்,அவ்வளவு,எவ்வளவு,இவ்வளவு,ஓரளவு,இதன்படி,சொன்னபடி,செய்தபடி,மற்றபடி,மேற்படி,அது,எது,இது,ஏது,உனது,எனது,நமது,தனது,அவரது,அவனது,அவளது,என்பது,அவை,எவை,இவை,யாவை,ஆகியவை,ஒன்று,ஒரு,ஒரே,ஓர்,இரண்டு,இரு,மூன்று,நான்கு,ஐந்து,ஆறு,அறு,ஏழு,எழு,ஒன்பது,நூறு,கோடி,அவ்வாறு,இவ்வாறு,எவ்வாறு,ஏற்றவாறு,அன்று,நாளை,நேற்று,இன்று,அன்றைய,நேற்றைய,நாளைய,இன்றைய,என்றைய,முந்தைய,பிந்தைய,முன்னர்,பின்னர்,கடைசி,வேளை,மறு,அக்கறை,நன்றி,முடியாது,தவறு,அல்லது,ஏதாவது,போது,பிற,ஏனைய,மீது,பிறகு,சும்மா,சரி,அல்லாது,அல்ல,மேதகு,அடுத்த,சரிவர,அற்று,நீ,ஏன்,யாது,என்ன,இல்லை,வேறு,நன்கு,அற்ற,இல்லாத,முதன்முறை,அடுத்தமுறை,வரை,வெகு,என்பது,பல,சில,என்ன,சிறு,முது,சரியான,அன்ன".split(",");

function spellcheckit()
{

if(document.activeElement)
{
var d = new Date();
if(!document.activeElement.id)document.activeElement.setAttribute("id", "vaani-container"+d.getMinutes()+d.getSeconds());//since multiple element in same page
myarea = document.activeElement.id;
}
$("#threadount").val(0);
$("#wordmark").val(0);

document.getElementById("vaani-report").innerHTML=" <div style=\"display: flex\" id=\"vaani-plateheader\" ><hr style=\"flex: 1;cursor:grab;margin-top:0;height: 12px;background: black;\"/><a style=\"cursor: pointer;float:right;\" onclick=\"document.getElementById('vaani-plate').style.display='none';\"/>X</a></div><table frame='box'><tr  valign='top'><td style='width:40%'><b>பரிந்துரைகள்</b><br/><hr></td><td style='width:25%'><b>அகராதியில் இல்லாதவை</b><br/><hr></td><td style='width:25%'><b>சந்தி கணிக்க இயலாதவை</b><br/><hr></td></tr></table>";
dragElement(document.getElementById("vaani-plate"));
//console.log("getwordscompleted");
Sendthreadme();
/*
text=getwords(true);//document.activeElement.innerText);
//console.log(text);
  fetch('https://www.vaanieditor.com/spellcheck',
   {   
      method: 'post',
      headers:
      {
         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: "tamilwords="+ text.join('|') +"&sandhi=true&translated=true&apikey=master98654"
   }).then(function(response)
   {
      if(response.ok)
      {
         return response.text();
      }
      else
      {
         return Promise.reject(new Error(response.statusText));
      }
   }).then(function(resTxt)
   {

console.log(resTxt);
presenttable(JSON.parse(resTxt));
   });
*/

}



function getwords(typ)//a-true return tamil words. false return all words
{/*directly match and fetch tamil words? uword is unused more
        because sandhi divide is not possible*/
          //noformat();
          var doby=document.getElementById(myarea);
var vbox=""; 
console.log(doby.innerText);
if(doby.innerText){vbox =doby.innerText;} //to avoid tagged tamil words
else if(doby.value){vbox =doby.value;}
      //   alert(vbox);
            if (vbox.length < 1) { return ""; }//To break since no input words
            var words = vbox +" ";//This space will be omitted in last toggle
            var ta = "";
            var sy = "";
            var word = [];//tamilword
            var uword = [];//all word
            var tamil = false;
            var istam = false;
            words=words.replace(/[\u200B-\u200D\uFEFF]/g, '');//Zerowidth non joiner &zwnj; = &#8204;அக்‌ஷரா X அக்ஷரா
         
            for (i = 0; i < words.length; i++) {        
               if (words[i].search(RegExp("[ஂ-௺0-9]", "gi")) === 0)
                { ta = ta + words.charAt(i); if (tamil === false) { tamil = true; writ(sy, 0); } sy = ""; istam = true; }
                else { sy = sy + words.charAt(i); if (tamil === true) { tamil = false; writ(ta, 1); } ta = ""; }
                if (word.length > 999) { return -1; }
            }
            writ(sy.substring(0, sy.length - 1), 0);//for last toggle
         
            function writ(a, b) {//b 0 mean ignore, 1 means write
//console.log(a+" "+b + " ");// + a.search("&#8228;") + " " +a.search("<br/>"));
                uword[uword.length] = a;//all words
                if (b == 1) { word[word.length] = a; } else {
if(a.replace(/ /gi, "").length > 0) //not allow newline too.to access comma for Ottru decision
{ uword.push(""); word.push(""); }
//non sandhi breaker
else if((a.search("&#8228;")>-1)||(a.search("&nbsp;")>-1))//||(a.search(RegExp(breakreg,"gi"))>-1))
{ uword.push(""); uword.push("");word.push("");}
                }
            }
            // alert(word);
 if (istam === false) { return 0; }
            if (typ) { return word; } else { return uword; }
        }


if(!document.getElementById("vaani-plate"))
{var node = document.createElement("div");
  node.setAttribute("id", "vaani-plate");
node.setAttribute("style", "font-size:12px;align:right;position:fixed;display:none;top:30px;background-color:#f1f1f1!important;right:5px;float:right;");
document.body.appendChild(node);

target = document.getElementById("vaani-plate");

inode = document.createElement("img");
inode.setAttribute("id", "vaani-load");
//var t=chrome.runtime.getURL("images/loading2.gif");
var imgURL = chrome.extension.getURL("images/load.svg");
//inode.setAttribute("src", "http://vaanieditor.com/Content/loading.gif");
inode.setAttribute("src", imgURL);
inode.setAttribute("style","max-height:30px;margin:-15px;display:none;" );
inode.setAttribute("border","0");
//inode.src = chrome.runtime.getURL("images/loading2.gif");
target.appendChild(inode);

rnode = document.createElement("div");
rnode.setAttribute("id", "vaani-report");
target.appendChild(rnode);


}


if(!document.getElementById("sug"))
{
var node = document.createElement("div");
  node.setAttribute("id", "sug");
document.body.appendChild(node);
}

if(!document.getElementById("threadcount"))
{
var node = document.createElement("input");
node.setAttribute("id", "threadcount");
node.setAttribute("value", 0);
node.setAttribute("type", "hidden");
document.body.appendChild(node);
}

if(!document.getElementById("wordmark"))
{
var node = document.createElement("input");
  node.setAttribute("id", "wordmark");
  node.setAttribute("value", 0);
node.setAttribute("type", "hidden");
document.body.appendChild(node);
}

if(!document.getElementById("cursormark")){
var node = document.createElement("input");
  node.setAttribute("id", "cursormark");
  node.setAttribute("value", 0);
node.setAttribute("type", "hidden");
document.body.appendChild(node);}


if(!document.getElementById("nodecursormark")){
var node = document.createElement("input");
node.setAttribute("id", "nodecursormark");
node.setAttribute("value", 0);
node.setAttribute("type", "hidden");
document.body.appendChild(node);
}
spellcheckit();



function Sendthreadme()
{//it send limitted tsize words to api query. starts from wordmark to tsize. design function will call this again
//console.log(myarea);
$("#vaani-plate").show();
$('#vaani-load').show();
              var tamil;



 try { tamil = getwords(true); } 
catch (e) { $('#vaani-load').hide();$('#vaani-plate').hide();return; }

               var a =parseInt($("#wordmark").val());
//if(tamil.length>0){$("#vaani-plate").show();}
              
              //if(a==0)noformat();//clear the fomat only at starting
               $("#threadcount").val(parseInt($("#threadcount").val())+1);//add the threadcount 
                     if(tamil.length<=a){$("#vaani-load").hide();$("#cursormark").val(0); 
                                         $("#wordmark").val(0);$("#nodecursormark").val(0);
                                         $("#threadount").val(0);
                                         return}
                                    else{$("#vaani-load").show();}
       threadapi(tamil.slice(a,(a+tsize)).join('|'));
                      a+=tsize-1;
                     $("#wordmark").val(a);//to know word demark
                     //console.log(a);
               
        }
            
            function threadapi(tamilword)
  {//console.log(tamilword);
                       jQuery.ajax({
                        method: "post",
                        url: "https://core.vaanieditor.com/spellcheck",
                        data: {tamilwords: tamilword, sandhi: true, translated:true, apikey:"master98654" }, 
                        dataType: "json",
                        success: function (result) {presenttable(result); },
                        error: function (xhr, status) { alert('Unknown error ' + status);}
                    });         
  }
 
  
  function checkload()
  {
    if($("#threadcount").val()>0){$("#vaani-load").show();}
    else{$("#vaani-load").hide();}
    
  }










function presenttable(data)
{
 $("#threadcount").val(parseInt($("#threadcount").val())-1);

   var wrongs=0;
      var suggestions=0;
    var content="";
    var sandhicontent="";
    var unknowncontent="";
    for(var i = 0; i < data.length;i++){
                var oword =data[i].Userword;
              if(oword==="")continue;//skip if word is empty
      
     if(data[i].Flag===true){//if word is correct, then check for sandhi probability
      if(i<data.length-1){var nword =data[i+1].Userword;//next word
      if(nword.search(/[கசதப]/)==0)//second word first letter has possibility
        if(oword.search(/([யரழ]்|[க-ஹ]|[ா-ௌ])$/gi)>-1)//first word last letter has possibility
           if(nosandhi.indexOf(oword)==-1)//first word has possibility
           { sandhicontent+=oword+" "+nword+"<br/>";}
                         }                                 
    }
      else{
              if(data[i].Suggestions!="wrong"){suggestions+=1;
                                               if(data[i].Solspan<0)continue;//to avoid -1 solspan
                 if(i+1<data.length) {
                   if(data[i].Solspan==1){content=content+data[i].Userword+" "+data[i+1].Userword+" - "+data[i].Suggestions+" "+data[i+1].Userword+"<br/>";}
                  else{content=content+data[i].Userword+" "+data[i+1].Userword+" - "+data[i].Suggestions+"<br/>";}
                 }
                  else{content=content+data[i].Userword+" - "+data[i].Suggestions+"<br/>";}}
              else{wrongs+=1;unknowncontent+=data[i].Userword+"<br/>";}
      }
  }
    if(content.length>0)
    {var stat="";
      if(content.length>1)
    {stat= "மொத்தச் சொற்கள் " + data.length+"/";
     if(suggestions>1){stat+=" பரிந்துரைகள் "+suggestions;}else{stat+=" பரிந்துரை "+suggestions;}
     if(wrongs>0){stat+=" இல்லாதவை "+wrongs;}
    
    }
      //words count
    // var stat=stat+"<br/><table frame='box'><tr><td><b>பரிந்துரைகள்</b><br/>"+content+"</td></tr><tr><td><hr><b>அகராதியில் இல்லாதவை</b><br/>"+unknowncontent+"</td></tr><tr><td><hr><b>சந்தி கணிக்க இயலாதவை</b><br/>"+sandhicontent+"</td></tr></table>";

    $("#vaani-report td").eq(0).append(content);
    $("#vaani-report td").eq(1).append(unknowncontent);
    $("#vaani-report td").eq(2).append(sandhicontent);
    }
//    checkload();
Sendthreadme();
}






function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id+"header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id+"header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.bottom = (elmnt.offsetBottom + pos2) + "px";
    elmnt.style.right = (elmnt.offsetRight + pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}




/*script convertor*/
var div = null;
function drawBorderAroundSelection() {
var selection = window.getSelection(); // get the selection then
range = selection.getRangeAt(0); // the range at first selection group
if(selection.baseNode.parentNode.className=="tooltip")return;//to avoid further selection
rect = range.getBoundingClientRect(); // and convert this to useful data
var otext="";    //return selected text
if (window.getSelection) {
        otext = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        otext = document.selection.createRange().text;
    }

if(otext=="" && div!=null) {div.parentNode.removeChild(div);div=null}
  if (rect.width > 0) {
if(div!=null) {div.parentNode.removeChild(div);}    
div = document.createElement('div'); // make box
div.className="tooltip";
div.style.top = (rect.top + rect.height) +'px'; // set coordinates
div.style.left=rect.left+'px';
div.innerHTML=convertme(otext, -1,1);
document.body.appendChild(div); // finally append
  }
}

window.onmouseup = drawBorderAroundSelection;