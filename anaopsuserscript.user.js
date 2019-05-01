// ==UserScript==
// @name         AoPS Commands
// @namespace    https://github.com/epiccakeking/anaopsuserscript
// @version      2.8.1
// @downloadURL  https://github.com/epiccakeking/anaopsuserscript/raw/master/anaopsuserscript.user.js
// @description  try to take over the world!
// @author       happycupcake/epiccakeking
// @match        https://artofproblemsolving.com/*
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var temp=null //Might as well just declare it here.
    function cthemeupdate(){
        localStorage.setItem("ctheme",encodeURI(document.getElementById("cthemepopup").value));
        updateTheme();
    }
    function updateTheme(){
        var head=document.getElementsByTagName('head')[0];
        var theme=localStorage.getItem("theme");
        var ctheme=localStorage.getItem("ctheme");
        if (theme!=null && theme!="none"){
            if (document.getElementById("theme")==null){
                var elmnttheme=document.createElement('link');
                elmnttheme.id="theme"
                elmnttheme.rel='stylesheet';
                elmnttheme.type='text/css';
                elmnttheme.media='all';
                head.appendChild(elmnttheme);
            }
            document.getElementById("theme").href='https://epiccakeking.github.io/anaopsuserscript/themes/'+theme+'.css';
        }
        if (ctheme!=null){
            if (document.getElementById("ctheme")==null){
                var elmntctheme=document.createElement('style');
                elmntctheme.id="ctheme"
                head.appendChild(elmntctheme);
            }
            document.getElementById("ctheme").innerHTML=decodeURI(ctheme);
        }
    }
    function updateToggles(){
        var styletogglesinner=""
        if (localStorage.getItem('expandannouncements')=="true"){
            styletogglesinner+=".cmty-topic-cell{height: 113px !important;}";
        }
        if (localStorage.getItem('advancedfeed')=="true"){
            styletogglesinner+='.feed-open #feed-topic-list, #feed-topic{border: 0px !important;width: auto !important;min-width: none !important;position: fixed;top: 30px !important;bottom: 0px !important;left: 0px !important;right: 0px !important;height: auto !important;box-shadow: none !important;background: white !important;}.feed-open #feed-topic{bottom: 20px !important;}/*Feed tabs*/.feed-open #feed-tabs{display: block;height: 30px;line-height: 30px !important;width: 100vw !important;position: fixed !important;top: 0px !important;left: 0px !important;bottom: auto !important;right: auto !important;z-index: 10000000000000000000 !important;padding: 0px !important;}.feed-open .feed-tab{height: 30px !important;padding: 0px !important;line-height: 30px !important;height: 30px !important;width: 25vw !important;border: none !important;display: inline-block !important;left: 0px; /*Fixes selected tabs shifting*/}.feed-open #feed-wrapper{top: 0px !important;bottom: 0px !important;left: 0px !important;overflow: hidden !important;width: 100vw !important;height: auto !important;display: block !important;}#feed-wrapper{display: block !important;z-index: 10000000000000000000 !important;}/*Watchers*/.feed-open .focus-topic .cmty-topic-watchers{display: block !important;position: fixed !important;z-index: 10 !important;top: auto !important;bottom: 0px !important;left: 0px !important;width: 100vw !important;height: 20px !important;padding-top: 2px !important;background-color: #666 !important;}.feed-open .focus-topic .cmty-topic-watchers:before{content: "Reading now: " !important;color: white !important;font-weight: bold !important;font-style: normal !important;}/*Full width*/.feed-open .cmty-postbox-inner-box{width: 100% !important;padding-right: 15px !important;}.feed-open .cmty-post-body{width: 100% !important;}/*Buttons*/.feed-open .feed-topic-top-right > *{display: inline;}.feed-open .feed-close, .cmty-full-screen{display: none;}.feed-subfeed-new-topic{display: block !important;}/*Big scroll buttons :D*/.feed-open .cmty-topic-jump{position: fixed;font-size: 24px;z-index: 100000;top: 68px !important;height: 24px !important;width: 24px !important;line-height: 24px !important;text-align: center !important;left: auto !important;right: 35px !important;color: white;}.feed-open .cmty-topic-jump-bottom{right: 5px !important;}.feed-open .cmty-subfeed{background: white;}.feed-open .aops-scroll-inner {width: 100% !important;left: 0px !important;}.feed-open .aops-scroll-bar{opacity: 0;pointer-events: none;}.feed-open .feed-open .aops-scroll-content{width: 100% !important;padding: 0px !important;}.feed-open .cmty-posting-button-row.cmty-phone{display: none !important;}.feed-open .aops-modal-frame{max-width: none !important;max-height: none !important;width: auto !important;height: auto !important;margin: 0px !important;top: 30px !important;left: 0px !important;right: 0px !important;bottom: 0px !important;display: block !important;}.feed-open .aops-close-x{top: 0px !important;right: 0px !important;}.feed-open .cmty-topic-posts-top{padding-right: 60px !important;}/*Fade fixing*/.feed-open .aops-scroll-fade-bottom, .aops-scroll-fade-top{width: 100% !important;left: 0px !important;}';
        }
        if (document.getElementById("mystyletoggles")==null){
            var styletoggles=document.createElement("style");
            styletoggles.id="mystyletoggles";
            styletoggles.innerHTML=styletogglesinner;
            document.getElementsByTagName('head')[0].appendChild(styletoggles);
        }else{
            document.getElementById("mystyletoggles").innerHTML=styletogglesinner;
        }
    }
    function KeyPress(e) {
        var evtobj = window.event? event : e
        if (evtobj.keyCode == 49 && evtobj.ctrlKey) commandprompter();
    }

    document.onkeydown = KeyPress;
    document.addEventListener('DOMContentLoaded', function() {
        updateTheme()
        updateToggles()
        var commbtn=document.createElement('button');
        commbtn.innerHTML="CMND";
        commbtn.id="commline";
        commbtn.style="position: fixed !important; bottom: 0px !important; left: 0px !important; !important; overflow: hidden !important; color: black !important; background-color: white !important; z-index: 100000000000000 !important; resize: none !important;"
        commbtn.onclick=commandprompter;
        document.body.appendChild(commbtn);
        setTimeout(function(){
            if ($("#header")[0].firstChild.attributes){
                try{
                    document.getElementById("theme").remove();
                }
                catch(err){};
                try{
                    document.getElementById("ctheme").remove();
                }
                catch(err){};
            }
        }, 1000);
    }, false);
    function commandprompter(){
        var comm="";
        comm=prompt("COMMAND");
        var cp=comm.split(" ");
        if (cp[0]=="theme"){
            cp.unshift("val");
        }
        if (cp[0]=="jump"){
            var x=window.location.href;
            x=x.split("_")[0];
            var n=Number(cp[1]);
            if (x.lastIndexOf("h")<10){
                alert("Not viewing a topic.");
            }else if (isNaN(n)){
                alert("Not a number");
            }else if (n<1){
                alert('Invalid value for jump.');
            }else{
                if (!(x.substring(x.lastIndexOf("p")-1,x.lastIndexOf("p")+2)=="fpr")){
                    x=x.substring(0,x.lastIndexOf("p"));
                }
                window.location.href=x+"n"+cp[1];
            }
        }else if (cp[0]=="val"){
            localStorage.setItem(cp[1], cp[2]);
            if (cp[1]=="theme" || cp[1]=="ctheme"){
                updateTheme();
            }
            updateToggles()
        }else if (cp[0]=="ctheme"){
            var cthemepopup=document.createElement('div');
            var cthemetextarea=document.createElement('textarea');
            cthemetextarea.id="cthemepopup";
            var cthemebutton=document.createElement('button');
            cthemebutton.type="button";
            cthemebutton.innerHTML="Update";
            cthemebutton.onclick=cthemeupdate
            cthemepopup.appendChild(cthemetextarea);
            cthemepopup.appendChild(cthemebutton);
            alert(cthemepopup)
        }else if (cp[0]=="delval"){
            localStorage.removeItem(cp[1]);
            updateToggles()
        }else if (cp[0]=="purge"){
            var purgenum=Number(cp[1]);
            if (isNaN(purgenum)){
                alert("Not a number");
            }else if (purgenum<1){
                alert('Invalid value for purge.');
            }else{
                if (confirm("Confirm purge?")==true){
                    for (let i = 0; i < purgenum; i++) {
                        setTimeout(function(){
                            var a = document.getElementsByClassName('cmty-post-delete');
                            a[a.length-1].click();
                            var b = document.getElementsByClassName("btn-primary")[0];
                            b.click();
                        }, i * 100);
                    }
                }else{
                    alert("Purge cancelled.");
                }
            }
        }else if (cp[0]="user"){
            if (cp[1].toLowerCase()=="rick" && cp[2].toLowerCase()=="astley"){
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be&t=43";
            }else{
                window.location.href = "https://artofproblemsolving.com/community/user/"+cp[1];
            }
        }else{
            alert(cp[0]+" is not a command");
        }
    }
})();
