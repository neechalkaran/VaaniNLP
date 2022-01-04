var autoc = 'MainContent_autoc';

           // console.log(getwords(true));
            function noformat()
            {
              $("vaani").each(function( index ) {
                this.outerHTML = this.innerHTML;
});
            }
            var normallizelog=[];
            function normalize(b){
                        //removing previous footprint of vaani tag
					b=b.replace(/<\/vaani>/gi,"");
					b=b.replace(/ id=\"vword[0-9]+_[0-9]+\"/gi,"");
					b=b.replace(/ data-popupmenu=\"popmenu[0-9]+_[0-9]+\"/gi,"");
					b=b.replace(/ class=\"err\"/gi,"");
          b=b.replace(/ class=\"sugg\"/gi,"");
          b=b.replace(/ class=\"corr\"/gi,"");
          b=b.replace(/ class=\"\"/gi,"");
          b=b.replace(/<vaani >/gi,"");
          b=b.replace(/<vaani>/gi,"");
          b=b.replace(/&nbsp;/gi," ");//tocleanup
	        b=b.replace(/[\u200B-\u200D\uFEFF]/g, '');//to cleanup
              //adjust format to get proper tamil, this will be reverted later
               normallizelog=[];
          b=b.replace(/[ஂ-௺]<span .*?>([ஂ-௺]+)<\/span>/gi, function(c,d){var e = c.substring(0,1)+d+ c.substring(1).replace(d,""); normallizelog.push([c,e]);return e;});//to avoid அடித்திருக்<span id="5_TRN_a">கார்</span> 
          b=b.replace(/<span .*?>([ஂ-௺]+)<\/span>[ஂ-௺]/gi, function(c,d){var e = c.substring(0,c.length-1).replace(d,"")+d+c.substring(c.length-1); normallizelog.push([c,e]);return e;});//to avoid <span id="5_TRN_a">அடித்திருக்</span>கார் 
              return b;
            }
 function gettextnode(block)
                            {
                            var cblock=block.childNodes; //get the reference to the parent div
                            for (var i = 0; i < cblock.length; i++) {
                               if(cblock[i].childNodes.length==0){
                               //to avoid empty nodes
                            if(cblock[i].nodeValue!=null)if(cblock[i].nodeValue.trim()!=""){dotextnode(cblock[i]);}
                               }
                               else{gettextnode(cblock[i]);}
                              }
                            }

function dotextnode(block)
{//block.parentNode.setAttribute("vname", "tag");
//console.log(block.nodeValue);
  if ((block.nodeValue).search(RegExp("[A-⅟0-9]", "gi")) >-1)
  //if ((block.nodeValue).search(RegExp("[ஂ-௺0-9]", "gi")) >-1)//add node only to tamil or numeric forms
  {var newItem = document.createElement("vname");
newItem.appendChild(document.createTextNode(block.nodeValue));
 block.parentNode.replaceChild(newItem, block);
  }
}
            var breakreg =".,:;\"!&*\(\)\[\]\?\na-zA-Z";//string allowed between two words
function getwords(typ)//a-true return tamil words. false return all words
        {/*directly match and fetch tamil words? uword is unused more
        because sandhi divide is not possible*/
          //noformat();
          var doby=document.getElementById(myarea).cloneNode(true);
          //doby.innerHTML=normalize(doby.innerHTML);//to clear  generated format
          doby.innerHTML =doby.innerHTML.replace(/&nbsp;/gi," ");
          doby.innerHTML =doby.innerHTML.replace(/<\/div><div>/gi,"<\/div><br\/><div>");
          doby.innerHTML =doby.innerHTML.replace(/></gi,"> <");//to avoid joined tags words fusion அளவிற்கு</a><a>அதிகமான</a>
      
          doby.innerHTML =doby.innerHTML.replace(/>[ஂ-௺]/gi,function(a){return a.substring(0,1)+" "+a.substring(1)});//to avoid joined tag with words fusion அளவிற்கு</a>அதிகமான
          

          var vbox =doby.innerText; //to avoid tagged tamil words
         //alert(vbox);
            if (vbox.length < 1) { return ""; }//To break since no input words
            var words = vbox +" ";//This space will be omitted in last toggle
            var ta = "";
            var sy = "";
            var word = [];//tamilword
            var uword = [];//all word
            var tamil = false;
            var istam = false;
            words=words.replace(/[\u200B-\u200D\uFEFF]/g, '');//Zerowidth non joiner &zwnj; = &#8204;அக்‌ஷரா X அக்ஷரா
         //console.log(words);
          //console.log(normallizelog);
           // words=words.replace(/\n/gi,"<br/>");          
            //words[i]->words.charAt(i) since ECMAScript 5 feature is not enabled in few browser
            for (i = 0; i < words.length; i++) {
             //console.log(words.charAt(i).charCodeAt(0));
                //if ((words.charAt(i) >= String.fromCharCode(2944)) && (words.charAt(i) <= String.fromCharCode(3071)))
               if (words[i].search(RegExp("[A-⅟0-9]", "gi")) === 0)
                //if (words[i].search(RegExp("[ஂ-௺0-9]", "gi")) === 0)//dotextnode als use same regexp
                { ta = ta + words.charAt(i); if (tamil === false) { tamil = true; writ(sy, 0); } sy = ""; istam = true; }
                else { sy = sy + words.charAt(i); if (tamil === true) { tamil = false; writ(ta, 1); } ta = ""; }
                if (word.length > 99999) { document.getElementById('report').innerHTML = "அளவிற்கு அதிகமான வார்த்தைகள். கொஞ்சம் வார்த்தையைக் குறைத்துக் கொடுங்கள்"; $("#load").hide(); return; }
            }
            writ(sy.substring(0, sy.length - 1), 0);//for last toggle
         
            function writ(a, b) {//b 0 mean ignore, 1 means write
//console.log(a+" "+b + " ");// + a.search("&#8228;") + " " +a.search("<br/>"));
                uword[uword.length] = a;//all words
                if (b == 1) { word[word.length] = a; } else {
if(a.replace(/ /gi, "").length > 0) //not allow newline too.to access comma for Ottru decision
{ uword.push(""); word.push(""); }
                  
//console.log(a.charCodeAt(0)+" "+a.charCodeAt(1));
//non sandhi breaker
else if((a.search("&#8228;")>-1)||(a.search("&nbsp;")>-1)||(a.search(RegExp(breakreg,"gi"))>-1))
                              //.search(",")>-1)||(a.search(/\./gi)>-1)||(a.search(/\:/gi)>-1))
{ uword.push(""); uword.push("");word.push("");}
// uword.push("");word.push(""); 

                    //word[word.length] = "";
                }
            }
            // alert(word);
 if (istam === false) { document.getElementById('report').innerHTML = "தமிழ் வார்த்தைகள் இல்லாததால் ஆய்வு செய்ய முடியவில்லை"; $('#load').hide();return; }
            //document.getElementById('report').innerHTML = "ஆய்வு தொடங்கியது...";
//console.log(word);console.log(uword);
          
          
            if (typ) { return word; } else { return uword; }
        }
            function get_common_ancestor(a, b)
{
    $parentsa = $(a).parents();
    $parentsb = $(b).parents();

  var found = [];
var child1=a;
  var abranch;
  var bbranch;//largest individual node of word
  $parentsa.each(function() {
    if($(child1).text()==$(a).text()){abranch=child1;}
        var thisa = this;
    var child2=b;
    
        $parentsb.each(function() {
          if($(child2).text()==$(b).text()){bbranch=child2;}          
            if (thisa == this)
            {
                found.push(child1,child2);//when parent matched return childs
                return false;
            }          
          child2=this;
        });

        if (found.length==2) return false;
    child1=thisa;
    });
found.push(abranch,bbranch);
    return found;//return 4 array. frist & second word node(when common parents), first & second word node(when parent have other words)
}
              function design(data) {//diplay the server return in UI model
//alert(data);
//keep existing html and replace the correction over it.
               //$("#threadcount").val(parseInt($("#threadcount").val())-1);
            //var tamil = getwords(false);					
					//////Pending at -Mismatch input count & output count
					///var a = parseInt($("#wordmark").val());
           // var uwords= tamil.slice(a,a+tsize)
					//console.log(data);
				//	if(uwords.length!=(2*data.length)+1){alert("Data Missed " + uwords.length + "/" +data.length);}//ensure input and output are matched
					var preput= document.getElementById(myarea).innerHTML;
                
var div = document.getElementById(myarea);
gettextnode(div);
console.log(div.innerHTML);//get all child textnodes
 //document.getElementById(myarea).innerHTML=document.getElementById(myarea).innerHTML.replace(/<vname> /gi," <vname>");//to avoid space inside textnode.<vname> ங்கு</vname>
              //  console.log(document.getElementById(myarea).innerHTML);
var vnode = document.getElementsByTagName('vname');
               // console.log(vnode);
var nodecursor =parseInt($("#nodecursormark").val());//starting node
var threadid=parseInt($("#threadcount").val());//used as identifier on suggestion order
            var plate = "";
            var cursor =parseInt($("#cursormark").val());//starting search
            var su = [];//for suggestion words seperate with comma
            var ori = [];//for all non correct original words

/*
foreach processed words
1.Flag=true  -skip
2.Flag=False + If no suggestion - tell word is not in dictionary
3.Flag=False + suggestion + solspan=1 - provide that suggestion to the single words
4.Flag=False + suggestion + solspan=2 + both words in same node, do easy
5.Flag=False + suggestion + solspan=2 + different node
    i)  both words are single - get outerhtml of both parentnodes til same parent. insert both into vaani node//no code loss//
    ii) word1 is single in this node not other- get outerhtml parentnodes of word1 when is equalto next word parentnode. insert outerhtml into vaani node along with second word //no code loss-format loss//
    iii)word2 is single in that node not this -get outerhtml parentnodes of next words when is equalto this word parentnode. insert first word into vaani node along with outerhtml//no code loss - format loss//
    iv) both words are in different nodes(even both are different format) - remove second word and add it to this node.//code & format loss//
5.Flag=False + suggestion + solspan=>2 - do when all are in same node
==second item is mark==
தொலைக்காட்சியில<span style="font-size: medium;">்  -  தொலைக்காட்சியில்<span style="font-size: medium;"> 
==both items get valid together==
<span><big>எ</big></span>ங்கு. - <big>எ</big></span>ங்கு.
<span>போலீஸ்</span> <span>ஸ்டேசன்</span>
*/
                //To get right node index for every userword
var nodeword="";//present node text values
var owordnode=[];                
                     for(var i = 0; i < data.length;i++){   
                       owordnode.push(nodecursor);//means i'th word belongs to nodecursor'th node
                      // console.log(nodecursor + " "+data[i].Userword);
              if(nodeword==""){nodeword=vnode[nodecursor].innerText;}//just to loop nodecursor to identify the matched node
                       nodeword=nodeword.replace(data[i].Userword,"");
                 if(nodeword.search(RegExp("[A-⅟0-9]", "gi")) ===-1)// 65-8543
              //if(nodeword.search(RegExp("[ஂ-௺0-9]", "gi")) ===-1)
                                                                 {nodeword="";
                                                                  if(vnode.length<nodecursor)nodecursor+=1;//ensure maximum limit
                                                                 }//if no other tamil words(result of getwords) in this node then move to next word
                     
                     }
                
                
            for(var i = 0; i < data.length;i++){
                var oword =data[i].Userword;
              
              nodecursor=owordnode[i];//tells the vnode index of this userword
              //console.log("\""+oword + "\""+nodeword+"\"")
  var previouscursor = cursor;//
              if(oword==="")continue;
if(data[i].Flag===true){// && data[i].Solspan==1
                  cursor =  getcursor(preput,oword,cursor);//preput.indexOf(oword,cursor);
                //  console.log(cursor +" "+oword);
                  cursor=cursor+oword.length;//to move the cursor minimum search location
                  
}else if(data[i].Flag===false && data[i].Solspan==2){
  
                    var vaaniopen ="<vaani class=\"sugg\" id=\"vword"+threadid+"_"+ori.length+"\" data-popupmenu=\"popmenu"+threadid+"_"+ori.length+"\">";
                  var vaaniend = "</vaani>";
                var oword2 =data[i+1].Userword;
                cursor =  getcursor(preput,oword,cursor);//first word startindex
                var cursor2 =  getcursor(preput,oword2,cursor+oword.length);//second word start index
                var midput=preput.substring(cursor+oword.length,cursor2);//between oword & oword2;

  
  //|| (midput.search("&nbsp;")>-1)
  //first letter formatted words will be skipped.
                if((oword+oword2)!=data[i].Suggestions || (midput.replace(/<[^>]*>/gi,"").search(" ")>-1))//skip the tagging, when both input & output are same  ||  space between them
                if(midput.search("<")>-1)//identify element between words.other partition checks were already done in getwords
                {//assuming next word present as colspan=2
                  //common ancestor
                 //var word1single =(vnode[nodecursor].innerText ==oword?true:false);
                 //var word2single =(vnode[nodecursor+1].innerText ==oword2?true:false);
                  //console.log(vnode);
                //  console.log(nodecursor);
                  var outernode=get_common_ancestor(vnode[nodecursor], vnode[nodecursor+1]);//get node html of both words(at common parent & longest branch)
                  var outerhtml =[$(outernode[0])[0].outerHTML,$(outernode[1])[0].outerHTML,$(outernode[2])[0].outerHTML,$(outernode[3])[0].outerHTML];//this also contains vname tags
                  var outertext =[$(outernode[0]).text(),$(outernode[1]).text()];
             //   console.log(outertext);
                  var word1single =(outertext[0]==oword?true:false);//toensure parent node has no other child
                  var word2single =(outertext[1]==oword2?true:false);
                 // console.log(word1single);
                   // console.log(word2single);
                  if(word1single && word2single)//<span><i>பங்க</i></span> <span><sd><b>ளிப்புகள்</b></sd></span>
                    {
                    midput=outerhtml[0].split("<vname>")[0] +oword + midput+ oword2+outerhtml[1].split("</vname>")[1];//entire node html of both words
                    //  console.log(midput);
    //preput = preput.substring(0,previouscursor) + "<vaani class=\"sugg\" id=\"vword"+ori.length+"\" data-popupmenu=\"popmenu"+ori.length+"\">"+ midput + "</vaani>" + preput.substring(previouscursor+midput.length);
     preput = preput.substring(0,previouscursor) + preput.substring(previouscursor).replace(midput,vaaniopen+ midput + vaaniend);
                     ori.push(oword+" "+oword2);//since htmlaffect the popup
                su.push(data[i].Suggestions);     
                    }
                   else if(word1single && !word2single)//|<span><i>பங்க</i></span> |<span><sd><b>|ளிப்புகள் தற்பொழுதுள்ள </b></sd></span>
                    {
                      //console.log(outerhtml);
                      var node1prefix =outerhtml[0].split("<vname>")[0];
                      var node1suffix =outerhtml[0].split("</vname>")[1];//since single word considering 1 is the last index
                      
                  var cursor3 =  getcursor(preput,node1prefix,previouscursor);//till firstword node
                 var cursor4 =  getcursor(preput,outerhtml[1].split("<vname>")[0],cursor3+node1prefix.length+oword.length+node1suffix.length);//till secondword node.starting point is from end of firstwordnode
                  var cursor5 =  getcursor(preput,oword2,cursor4);//till secondword. not node
                  var nodemid=preput.substring(cursor3,cursor4).replace(oword,"").replace(node1prefix,"").replace(node1suffix,"")+outertext[1].split(oword2)[0];// str between 2 node +  vname tag's space prefix              
                     // console.log("'"+nodemid+"'");
//preput till first word node+ secondword's prefix tags + firstword node html + middle content+ second word + remaining
preput = preput.substring(0,cursor3) + preput.substring(cursor4,cursor5)+vaaniopen +outerhtml[0]+nodemid+oword2+ vaaniend +preput.substring(cursor5+oword2.length);
                 ori.push(oword+" "+oword2);//since htmlaffect the popup
                 su.push(data[i].Suggestions);     
                    }
                      else if(!word1single && word2single)//<span>தற்பொழுதுள்ள <i>பங்க|</i></span> |<span><sd><b>ளிப்புகள்|</b></sd></span>
                    {//<span><vname>தற்பொழுதுள்ள </vname><i><vname>பங்க</vname></i></span>", "<span><sd><b><vname>ளிப்புகள்</vname></b></sd></span>", "<i><vname>பங்க</vname></i>", "<span><sd><b><vname>ளிப்புகள்</vname></b></sd></span>        
                      cursor3 =  getcursor(preput,oword,previouscursor)+oword.length;//till end of firstword
                  var cursor4 =  getcursor(preput,outerhtml[1].split("<vname>")[0],previouscursor+oword.length);//till secondword node                                 
                  var cursor5 =  getcursor(preput,oword2,cursor4)+oword2.length;//till end of secondword. not node
                      var node1suffix = outerhtml[0].split("</vname>").slice(-1)[0];
                  var nodemid =preput.substring(cursor3,cursor4).replace(node1suffix ,"");
                      //console.log("'"+nodemid+"'");
//preput till oword + oword + middle node content + secondword node html + owordsuffixnode+ remaining        
preput =  preput.substring(0,cursor)  +vaaniopen +oword+ nodemid + outerhtml[1]+vaaniend+ node1suffix+(preput.substring(cursor5).replace(outerhtml[1].split("</vname>")[1],""));
                     //console.log(preput);
                 ori.push(oword+" "+oword2);//since htmlaffect the popup
                 su.push(data[i].Suggestions);     
                    }
               /*   else{//last option keep as it is
                    preput = preput.substring(0,cursor) +vaaniopen + oword + "<span></span>" +oword2+ vaaniend + midput+  preput.substring(cursor2+oword2.length);
              ori.push(oword+"\n"+oword2);
              su.push(data[i].Suggestions);
                  }*/
                  
                }
  else{//same node.
    preput = preput.substring(0,cursor) + vaaniopen + oword + midput+oword2+ vaaniend+ preput.substring(cursor2+oword2.length);
              ori.push(oword+midput+oword2);
                su.push(data[i].Suggestions);    
  }
                //console.log(midput);
               /* if(oword2.replace(/[ா-்]/gi,"")===""){//தொலைக்காட்சியில<span style="font-size: medium;">் 
              preput = preput.substring(0,cursor) +"<vaani class=\"sugg\" id=\"vword"+ori.length+"\" data-popupmenu=\"popmenu"+ori.length+"\">" + oword + "<span></span>" +oword2+ "</vaani>"+ midput+  preput.substring(cursor2+oword2.length);
              ori.push(oword+"\n"+oword2);
              su.push(data[i].Suggestions);
                   }
               else if(midput.search(" ")==-1)//<big>எ</big></span>ங்கு. 2 consecutive words suggestion when 
                {preput = preput.substring(0,cursor) +"<vaani class=\"sugg\" id=\"vword"+ori.length+"\" data-popupmenu=\"popmenu"+ori.length+"\">" + oword + oword2+ "</vaani>"+  midput+preput.substring(cursor2+oword2.length);
              ori.push(oword+" "+oword2);
                su.push(data[i].Suggestions);
                }*/

                cursor=cursor2+oword2.length;//to move the cursor minimum search location
                data[i+1].Userword="";
               // su.push("");
                i+=1;
}
else if(data[i].Flag===false && data[i].Solspan>2){//accept only space,comma, hyphen and period in between
                var osol=[];var oeli=[];
                osol[0]=data[i].Userword;//oword replica
                oeli[0]=getcursor(preput,osol[0],cursor); ;//cursor replica
                var midput=[];
                var osolall=osol[0];//consolidated string of tamil & nontamil segment when it contains mentioned character
                //osol[0] is first word, oeli[0] is its starting position
                for(var item=1;item<data[i].Solspan;item++)
                  {osol[item]=data[i+item].Userword;//assign userword
                oeli[item] =  getcursor(preput,osol[item],oeli[item-1]+osol[item-1].length);//get assigned userword start position
                midput[item]=preput.substring(oeli[item-1]+osol[item-1].length,oeli[item]);//get midchar
                data[i+item].Userword="";   
                   if(midput[item].replace(/[ ,\.-]/gi,"")!="")break;
                   osolall+=midput[item]+osol[item];
                  }
                
                preput = preput.substring(0,oeli[0]) +"<vaani class=\"sugg\" id=\"vword"+threadid+"_"+ori.length+"\" data-popupmenu=\"popmenu"+threadid+"_"+ori.length+"\">" + osolall + "</vaani>"+  preput.substring(oeli[item-1]+osol[item-1].length);
              ori.push(osolall);
                su.push(data[i].Suggestions);
                
               // console.log(midput);
                
                cursor=oeli[item-1]+osol[item-1].length;//to move the cursor minimum search location
                
               // su.push("");
  //adjusting the node since it skip the next word
                //nodeword=nodeword.replace(oword,"");if(nodeword.search(RegExp("[ஂ-௺0-9]", "gi")) ===-1){nodeword="";nodecursor+=1;nodeword=vnode[nodecursor].innerText;}
                i+=item;
                   
}else{cursor =  getcursor(preput,oword,cursor);
      if(cursor<0){cursor=previouscursor;continue;}//to avoid miss placement of words.
                  //   console.log(cursor +" "+oword);
                 if(data[i].Suggestions!="wrong")
                   {//console.log(cursor);
                    preput = preput.substring(0,cursor) +"<vaani class=\"sugg\" id=\"vword"+threadid+"_"+ori.length+"\" data-popupmenu=\"popmenu"+threadid+"_"+ori.length+"\">" + oword + "</vaani>"+  preput.substring(cursor+oword.length);                 
                     su.push(data[i].Suggestions);}
                  else{preput = preput.substring(0,cursor) +"<vaani class=\"err\" id=\"vword"+threadid+"_"+ori.length+"\" data-popupmenu=\"popmenu"+threadid+"_"+ori.length+"\">" + oword + "</vaani>"+  preput.substring(cursor+oword.length);
                      su.push("");}   
                 ori.push(oword);
                 cursor=cursor+oword.length;//to move the cursor minimum search location
}
            // console.log("'"+nodeword+"'"+oword+"'");
             // nodeword=nodeword.replace(oword,"").trim();//replace first match and remove any space  
              //console.log("'"+nodeword+"'"+oword+"'");
              //if(nodeword.search(RegExp("[ஂ-௺0-9]", "gi")) ===-1){nodeword="";nodecursor+=1;}//if no other tamil words(result of getwords) in this node then move to next word
            }//end of i
                //revert back normalize format changes
                //for(var i in normallizelog){preput=preput.replace(normallizelog[i][1],normallizelog[i][0]);}
                $("#cursormark").val(previouscursor);//to store the cursor for next 
                $("#nodecursormark").val(nodecursor);
            document.getElementById(myarea).innerHTML = preput;
               //if(document.getElementById(myarea).innerHTML!=preput)alert("good");
            for ( i = 0; i < su.length; i++) {
                var ulis = document.createElement('ul');
                ulis.id = "popmenu" + threadid+"_"+ i;
                ulis.className = "jqpopupmenu";
if(su[i]!==''){
                //for suggestion words
                var s = su[i].split(",");
                for (var j = 0; j < s.length; j++) {
                    var span = document.createElement('span');
                    span.innerHTML = s[j];
                    span.className = "sugword";
                    span.onclick = function () { replaceme(this.innerHTML, this.parentElement.parentElement.id); };
                    var lis = document.createElement('li');
                    lis.appendChild(span);
                    ulis.appendChild(lis);
                }//end of j
}
                //for user word
                var span = document.createElement('span');
                span.innerHTML = ori[i];
                span.className = "userword";
                span.onclick = function () { replaceme(this.innerHTML, this.parentElement.parentElement.id); };
                var cover = document.createElement('span');
                var ut = document.createElement('input');
                ut.type = "text";
                ut.value = span.innerText;//ori[i];//used innertext to avoid html raw element
                ut.className = "userbox";
                var but1 = document.createElement('input');
                but1.type = "button";
                but1.value = "மாற்று";
                but1.onclick = function (e) { replaceme(this.parentElement.previousSibling.value, this.parentElement.parentElement.parentElement.parentElement.id); e.preventDefault(); };
                var but2 = document.createElement('input');
                but2.type = "button";
                but2.value = "மாற்று(எ)";
                but2.onclick = function (e) { replaceall(this.parentElement.previousSibling.value, this.parentElement.parentElement.parentElement.parentElement.id); e.preventDefault(); };
                var but = document.createElement('span');
                but.appendChild(but1); but.appendChild(but2);
                var lis = document.createElement('li');
                lis.appendChild(span);
                cover.appendChild(ut);
                cover.appendChild(but);
                lis.appendChild(cover);
                ulis.appendChild(lis);

                document.getElementById('sug').appendChild(ulis);

            }//end of i

            //By default, add popup menu to anchor links with attribute "data-popupmenu"
            jQuery(document).ready(function ($) {
                //$("#submi").click(function () {})
                var $anchors = $('*[data-popupmenu]')
                $anchors.each(function () {
                    // check(this.innerText);
                    $(this).addpopupmenu(this.getAttribute('data-popupmenu'))
                })
            })
            document.getElementById('report').innerHTML = "";//removing loading message

            //document.getElementById(myarea).style.display = "block";
          //  document.getElementById("Vaani_Box").style.display = "none";
           // document.getElementById('submit').innerHTML = "சம்மதம்";
            
            common();

           $("vname").each(function( index ) {this.outerHTML = this.innerHTML;});
                
            //checkload();
                $("#"+myarea).focus();//to also avoid placeholder mix in IE browser
           //   Sendthreadme();
              }

  function checkload()
  {
    if($("#threadcount").val()>0){$("#load").show();}
    else{$("#load").hide();}
    
  }

        //google.setOnLoadCallback(onLoad);
               
          
        //document.getElementById("myarea").innerHTML = document.getElementById("myarea").innerHTML + " <span id=\"word2\" class=\"doudt\" data-popupmenu=\"popmenu1\"><u>test</u></span>";

        function clearme() {//clearing the content and set default
            document.getElementById(myarea).innerHTML = "";
            //document.getElementById('Vaani_Box').value = "";
            $('.jqpopupmenu').find('ul').andSelf().remove();
           document.getElementById('report').innerHTML = "";//toclear previous suggestion
          // document.getElementById('submit').innerHTML = "திருத்துக";
          // document.getElementById(myarea).style.display = "none";
           //document.getElementById("Vaani_Box").style.display = "block";
        }

        function replaceme(sp, i) {
            var id = i.replace("popmenu", "vword");
            //alert(sp);
            document.getElementById(id).innerHTML = sp;
            document.getElementById(id).className = "";
            document.getElementById(id).removeAttribute("data-popupmenu");
            //$("#"+id).removeData() ;
        }
                function replaceall(sp, num) {
            var up = document.getElementById(num.replace("popmenu", "vword")).innerHTML;
            var sorkal = document.getElementById(myarea).getElementsByTagName('vaani');
            for (i = 0; i < sorkal.length; i++) {
                if (sorkal[i].innerHTML == up) {
                    sorkal[i].innerHTML = sp;
                    sorkal[i].className = "";
                    sorkal[i].removeAttribute("data-popupmenu");
                } 
            }

        }


function getcursor(preput,oword,cursor)
            {/*cursor =  preput.indexOf(oword,cursor);
            assuming must return a cursor positon
            get cursor position of given HTML excluding Tamil attributes in HTMl tags*/
              for(var i=cursor;i<preput.length;i++)
                {
                  c1 = preput.indexOf(oword,i);
                  c2 = preput.indexOf("<",i);
                if((c2!=-1)&&(c2<c1)){c3 = preput.indexOf(">",i);
                 if(c3!=-1){i=c3;}else{return c1;}}
                  else{return c1;}
                }
              return -1;
              
            }
						

        common();
//this function needs to be called to ensure dynamic dropdown on every server response
        function common() {
          //  jQuery.noConflict()
            var jquerypopupmenu = {
                popupmenuoffsets: [0, 0], //additional x and y offset from mouse cursor for popup menus
                animspeed: 400, //reveal animation speed (in milliseconds)
                showhidedelay: [150, 150], //delay before menu appears and disappears when mouse rolls over it, in milliseconds

                //***** NO NEED TO EDIT BEYOND HERE
                startzindex: 1000,
                ismobile: navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null, //boolean check for popular mobile browsers
                builtpopupmenuids: [], //ids of popup menus already built (to prevent repeated building of same popup menu)

                positionul: function ($, $ul, e) {

                    var docrightedge = $(document).scrollLeft() + $(window).width() - 40 //40 is to account for shadows in FF
                    var docbottomedge = $(document).scrollTop() + $(window).height() - 40

                    var x = e.pageX + this.popupmenuoffsets[0] //x pos of main popup menu UL
                    var y = e.pageY + this.popupmenuoffsets[1]
                    // x = (x + $ul.data('dimensions').w > docrightedge) ? docrightedge - $ul.data('dimensions').w : x //if not enough horizontal room to the ridge of the cursor
                    //y = (y + $ul.data('dimensions').h > docbottomedge) ? docbottomedge - $ul.data('dimensions').h : y

                    $ul.css({ left: x, top: y })
                },

                showbox: function ($, $popupmenu, e) {
                    try {
                        clearTimeout($popupmenu.data('timers').hidetimer)
                        $popupmenu.data('timers').showtimer = setTimeout(function () { $popupmenu.show(jquerypopupmenu.animspeed) }, this.showhidedelay[0])
                    } catch (e) { }
                },

                hidebox: function ($, $popupmenu) {
                    try {
                        clearTimeout($popupmenu.data('timers').showtimer)
                        $popupmenu.data('timers').hidetimer = setTimeout(function () { $popupmenu.hide(100) }, this.showhidedelay[1]) //hide popup menu plus all of its sub ULs
                    } catch (e) { }
                },


                buildpopupmenu: function ($, $menu, $target) {
                    //$target.get(0).id-> word id, $menu.get(0).id ->list id
                    $menu.css({ display: 'block', visibility: 'hidden', zIndex: this.startzindex }).addClass('jqpopupmenu').appendTo(document.body)
                    $menu.bind('mouseenter', function () {//dblclick
                        clearTimeout($menu.data('timers').hidetimer)
                    })
                    $menu.bind('click', function () { //hide menu when mouse moves out of it
                        jquerypopupmenu.hidebox($, $menu)
                    })
                    $menu.data('dimensions', { w: $menu.outerWidth(), h: $menu.outerHeight() }) //remember main menu's dimensions
                    $menu.data('timers', {})
                    $menu.find('ul').andSelf().css({ display: 'none', visibility: 'visible' }) //collapse all ULs again
                    $menu.data('$targetref', $target)
                    this.builtpopupmenuids.push($menu.get(0).id) //remember id of popup menu that was just built
                },



                init: function ($, $target, $popupmenu) {
                    this.triggerevt = (this.ismobile) ? "click" : "mouseenter"//dblclick
                    this.showhidedelay[0] = (this.ismobile) ? 0 : this.showhidedelay[0]
                    if (this.builtpopupmenuids.length === 0) { //only bind click event to document once
                        $(document).bind("click", function (e) {
                            if (e.button === 0) { //hide all popup menus (and their sub ULs) when left mouse button is clicked
                                $('.jqpopupmenu').find('ul').andSelf().hide()
                            }
                        })
                    }
                    if (jQuery.inArray($popupmenu.get(0).id, this.builtpopupmenuids) == -1) //if this popup menu hasn't been built yet
                        this.buildpopupmenu($, $popupmenu, $target)
                    if ($target.parents().filter('ul.jqpopupmenu').length > 0) //if $target matches an element within the popup menu markup, don't bind onpopupmenu to that element
                        return;
                    $target.bind(jquerypopupmenu.triggerevt, function (e) {
                        //alert("g");
                        $popupmenu.css('zIndex', ++jquerypopupmenu.startzindex)
                        jquerypopupmenu.positionul($, $popupmenu, e)
                        jquerypopupmenu.showbox($, $popupmenu, e)
                        if (jquerypopupmenu.triggerevt == "click")
                            e.preventDefault()                        
$(".userbox").click(function (e) { e.stopPropagation(); });
$(".userword").css({'background-image':'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDMtMjRUMTk6MDA6NDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUdUmQAAAFuSURBVDiNnZK9TuNQEIU/XydRZCVe6yayLFEYWSm2gzdYt1OteAJeASpKKOmAJ4HulkHiCeiosrhAitwkazdxEV0K4hCCIRKnuj8zZ+acGcdaC4DjONQQkQC4Bo6BOXBjjLlgA3Vei2bcxnGcJklCVVVBlmXnIvLLGHO6Hai2H0TksN/vp0mSYK2l0+kwGo1otVonq86+JwD+DgaDdZvWWpRS9Ho9gIPt4CYJz4vF4oNOgOVyCW9+7CS4m06nz57n7Xe7XVzXpSgKyrK8N8Y87pRgjPkP/JlMJi9lWTKbzciy7Ak4aijWbCLwOBwO95RSuK6L1vo3MN5pooikwDgMwyAIgrWJWmu01ofAv1WBzwQicul53jiKosD3feB9CgBaa8IwDIAHETlp6uAsiqJ6XFRVtf6oz77vE8dxD7hqlKBU01p8RLvd/tqDn2CTYF4Uxc6EVcx6oTYXKc3z/D7P80+j2sIcSOuLs7muP8ErN1mCs0l5TPIAAAAASUVORK5CYII=)', 'background-position':'right', 'background-repeat':'no-repeat'});
                    })

                    $target.bind("mouseleave", function (e) {
                        jquerypopupmenu.hidebox($, $popupmenu)
                    })
                }
            }

            jQuery.fn.addpopupmenu = function (popupmenuid) {
                var $ = jQuery
                return this.each(function () { //return jQuery obj
                    var $target = $(this)
                    jquerypopupmenu.init($, $target, $('#' + popupmenuid))
                })
            };
        }