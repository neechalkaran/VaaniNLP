var tsize = 150;
var myarea;
function spellcheckit()
{

myarea = document.activeElement.id;
if(myarea == "" || myarea == undefined){
document.activeElement.setAttribute("id", "vaani-container");
console.log(myarea);
myarea = document.activeElement.id;//when there is no id
console.log(myarea);
}
Sendthreadme();
/*
text=getwords(true);//document.activeElement.innerText);

  fetch('http://vaani.neechalkaran.com/v2/spellcheck',
   {   
      method: 'post',
      headers:
      {
         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: "tamilwords="+ text.join('|') +"&sandhi=true&translated=true&apikey=master8675"
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
design(resTxt)
   });
*/
}
if(!document.getElementById("report"))
{var node = document.createElement("span");
  node.setAttribute("id", "report");
node.setAttribute("style", "font-size:20px");

var inode = document.createElement("img");
inode.setAttribute("id", "load");
inode.setAttribute("style", "max-height:30px;margin:-15px;display:none;");
inode.setAttribute("border", "0");
inode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDMtMjRUMTk6MDA6NDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUdUmQAAAFuSURBVDiNnZK9TuNQEIU/XydRZCVe6yayLFEYWSm2gzdYt1OteAJeASpKKOmAJ4HulkHiCeiosrhAitwkazdxEV0K4hCCIRKnuj8zZ+acGcdaC4DjONQQkQC4Bo6BOXBjjLlgA3Vei2bcxnGcJklCVVVBlmXnIvLLGHO6Hai2H0TksN/vp0mSYK2l0+kwGo1otVonq86+JwD+DgaDdZvWWpRS9Ho9gIPt4CYJz4vF4oNOgOVyCW9+7CS4m06nz57n7Xe7XVzXpSgKyrK8N8Y87pRgjPkP/JlMJi9lWTKbzciy7Ak4aijWbCLwOBwO95RSuK6L1vo3MN5pooikwDgMwyAIgrWJWmu01ofAv1WBzwQicul53jiKosD3feB9CgBaa8IwDIAHETlp6uAsiqJ6XFRVtf6oz77vE8dxD7hqlKBU01p8RLvd/tqDn2CTYF4Uxc6EVcx6oTYXKc3z/D7P80+j2sIcSOuLs7muP8ErN1mCs0l5TPIAAAAASUVORK5CYII=");
//inode.setAttribute("src", "images/loading2.gif");
document.activeElement.appendChild(inode);
document.activeElement.appendChild(node);
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
console.log(myarea);
          $('#load').show();
           // document.getElementById('report').innerHTML = "";
           // if (document.getElementById("submit").innerHTML == "Spellcheck") {
              var tamil;

                try { tamil = getwords(true); }
                catch (e) { $('#load').hide();return; }
//alert(tamil);return;
               var a =parseInt($("#wordmark").val());
              
              if(a==0)noformat();//clear the fomat only at starting
               $("#threadcount").val(parseInt($("#threadcount").val())+1);//add the threadcount 
                     if(tamil.length<=a){$("#load").hide();$("#cursormark").val(0); 
                                         $("#wordmark").val(0);$("#nodecursormark").val(0);
                                         $("#threadount").val(0);
                                         return}
                                    else{$("#load").show();}
                    // alert(tamil.slice(0,50));
       threadapi(tamil.slice(a,(a+tsize)).join('|'));
                      a+=tsize-1;
                     $("#wordmark").val(a);//to know word demark
                     //console.log(a);
               
        }
            
            function threadapi(tamilword)
  {console.log(tamilword);
                       jQuery.ajax({
                        method: "post",
                        url: "http://vaani.neechalkaran.com/v2/spellcheck",
                        data: {tamilwords: tamilword, sandhi: true, translated:true, apikey:"master8675" }, 
                        dataType: "json",
                        success: function (result) {design(result); },
                        error: function (xhr, status) { alert('Unknown error ' + status);}
                    });         
  }
    