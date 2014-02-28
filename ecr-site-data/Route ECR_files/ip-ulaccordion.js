var persisteduls=new Object();
var ddtreemenu=new Object();
ddtreemenu.contractothers=function(treeid, ulelement){
var ultags=document.getElementById(treeid).getElementsByTagName("ul");
for (var i=0; i<ultags.length; i++){
var isChild=false;
if (ulelement==ultags[i]){
isChild=true;
}
else{
var ulChildren=ultags[i].getElementsByTagName("ul");
for (var j=0; j<ulChildren.length; j++){
if (ulelement==ulChildren[j]){
isChild=true;
break;
}
}
}
if (!isChild){
ultags[i].style.display="none";
ultags[i].setAttribute("rel", "closed");
ddtreemenu.setfolder(ultags[i].parentNode,false);
}
}
}
ddtreemenu.setfolder=function(ulelement, open){
var classname = ulelement.className.replace(/\bipf-sectionmenu-folder\S*/g,"");
if (open){
classname+=" ipf-sectionmenu-folderopen";
}
else{
classname+=" ipf-sectionmenu-folderclose";
}
ulelement.className = classname.replace("  "," ");
}
ddtreemenu.linkclicked=false;
ddtreemenu.setlinkclicked=function(treeid){
var anchortags = document.getElementById(treeid).getElementsByTagName("a");
var categorylink=document.location.href;
if (!categorylink.endsWith("#")) categorylink+="#";
for (var i=0; i<anchortags.length; i++){
if (anchortags[i].href !=categorylink){
anchortags[i].onclick=function(){ddtreemenu.linkclicked=true;}
}
else{
}
}
}
/***********************************************
* Simple Tree Menu-� Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/for full source code
***********************************************/
ddtreemenu.createTree=function(treeid, enablepersist, persistdays){
ddtreemenu.setlinkclicked(treeid);
var ultags=document.getElementById(treeid).getElementsByTagName("ul")
if (typeof persisteduls[treeid]=="undefined")
persisteduls[treeid]=(enablepersist==true && ddtreemenu.getCookie(treeid)!="")? ddtreemenu.getCookie(treeid).split(",") : ""
for (var i=0; i<ultags.length; i++)
ddtreemenu.buildSubTree(treeid, ultags[i], i)
if (enablepersist==true){
var durationdays=(typeof persistdays=="undefined")? 1 : parseInt(persistdays)
}
}
ddtreemenu.buildSubTree=function(treeid, ulelement, index){
ulelement.parentNode.className+=" submenu"
if (typeof persisteduls[treeid]=="object"){ //if cookie exists (persisteduls[treeid] is an array versus "" string)
if (ddtreemenu.searcharray(persisteduls[treeid], index)){
ulelement.setAttribute("rel", "open")
ulelement.style.display="block"
ddtreemenu.setfolder(ulelement.parentNode,true);
}
else
ulelement.setAttribute("rel", "closed")
}
else if (ulelement.getAttribute("rel")==null || ulelement.getAttribute("rel")==false) //if no cookie and UL has NO rel attribute explicted added by user
ulelement.setAttribute("rel", "closed")
else if (ulelement.getAttribute("rel")=="open") //else if no cookie and this UL has an explicit rel value of "open"
ddtreemenu.expandSubTree(treeid, ulelement)
ulelement.parentNode.onclick=function(e){
if (ddtreemenu.linkclicked) { //if a hyperlink has been clicked the page is changing so don't bother opening/closing the folder //MR
ddtreemenu.linkclicked=false;
return;
}
var submenu=this.getElementsByTagName("ul")[0]
if (submenu.getAttribute("rel")=="closed"){
submenu.style.display="block"
submenu.setAttribute("rel", "open")
ddtreemenu.setfolder(ulelement.parentNode,true)
ddtreemenu.contractothers(treeid, ulelement)
}
else if (submenu.getAttribute("rel")=="open"){
submenu.style.display="none"
submenu.setAttribute("rel", "closed")
ddtreemenu.setfolder(ulelement.parentNode,false)
}
ddtreemenu.preventpropagate(e)
}
ulelement.onclick=function(e){
ddtreemenu.preventpropagate(e)
}
}
ddtreemenu.expandSubTree=function(treeid, ulelement){
var rootnode=document.getElementById(treeid)
var currentnode=ulelement
currentnode.style.display="block"
ddtreemenu.setfolder(currentnode.parentNode,true)
while (currentnode!=rootnode){
if (currentnode.tagName=="UL"){ //if parent node is a UL, expand it too
currentnode.style.display="block"
currentnode.setAttribute("rel", "open") //indicate it's open //MR
ddtreemenu.setfolder(currentnode.parentNode,true)
}
currentnode=currentnode.parentNode
}
}
ddtreemenu.flatten=function(treeid, action){
var ultags=document.getElementById(treeid).getElementsByTagName("ul")
for (var i=0; i<ultags.length; i++){
ultags[i].style.display=(action=="expand")? "block" : "none"
var relvalue=(action=="expand")? "open" : "closed"
ultags[i].setAttribute("rel", relvalue)
ddtreemenu.setfolder(ultags[i].parentNode,(action=="expand")) //MR
}
}
ddtreemenu.rememberstate=function(treeid, durationdays){
var ultags=document.getElementById(treeid).getElementsByTagName("ul")
var openuls=new Array()
for (var i=0; i<ultags.length; i++){
if (ultags[i].getAttribute("rel")=="open")
openuls[openuls.length]=i
}
if (openuls.length==0)
openuls[0]="none open" //set array value to string to simply indicate all ULs should persist with state being closed
ddtreemenu.setCookie(treeid, openuls.join(","), durationdays) //populate cookie with value treeid=1,2,3 etc (where 1,2... are the indexes of the opened ULs)
}
ddtreemenu.getCookie=function(Name){
var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
if (document.cookie.match(re))
return document.cookie.match(re)[0].split("=")[1] //return its value
return ""
}
ddtreemenu.setCookie=function(name, value, days){
var expireDate=new Date()
var expstring=expireDate.setDate(expireDate.getDate()+parseInt(days))
document.cookie = name+"="+value+"; expires="+expireDate.toGMTString()+"; path=/";
}
ddtreemenu.searcharray=function(thearray, value){
var isfound=false
for (var i=0; i<thearray.length; i++){
if (thearray[i]==value){
isfound=true
thearray.shift()
break
}
}
return isfound
}
ddtreemenu.preventpropagate=function(e){
if (typeof e!="undefined")
e.stopPropagation()
else
event.cancelBubble=true
}
ddtreemenu.dotask=function(target, functionref, tasktype){
var tasktype=(window.addEventListener)? tasktype : "on"+tasktype
if (target.addEventListener)
target.addEventListener(tasktype, functionref, false)
else if (target.attachEvent)
target.attachEvent(tasktype, functionref)
}