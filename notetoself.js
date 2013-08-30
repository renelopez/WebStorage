/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload=init;


function init(){
    var button=document.getElementById("add_button");
    button.onclick=createSticky;
    var button=document.getElementById("clear_button");
    button.onclick=clearStorage;
    var stickiesArray=getStickiesArray();
    
    for (var i=0;i<stickiesArray.length;i++){
        var key=stickiesArray[i];
        var value=localStorage.getItem(key);
        addStickyToDOM(key,value);
    }
}

function addStickyToDOM(key,value){
    var stickies=document.getElementById("stickies");
    var sticky=document.createElement("li");
    sticky.setAttribute("id",key);
    var span=document.createElement("span");
    span.setAttribute("class","sticky");
    span.innerHTML=value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    sticky.onclick=deleteSticky;
}

function createSticky(){
    var stickiesArray=getStickiesArray();
    var currentDate=new Date();
    var time=currentDate.getTime();
    var key="sticky_" + time;
    
    var value=document.getElementById("note_text").value;
    localStorage.setItem(key,value);
    
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
    addStickyToDOM(key,value);
}

function clearStorage(){
    var stickiesArray=getStickiesArray();
    if(stickiesArray){
        for(var key in stickiesArray){
            removeStickyFromDOM(stickiesArray[key]);
        }
        localStorage.clear();
        stickiesArray=[];
        localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
    }
}

function getStickiesArray(){
    var stickiesArray=localStorage.getItem("stickiesArray");
    if(!stickiesArray){
        stickiesArray=[];
        localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
    }
    else{
        stickiesArray=JSON.parse(stickiesArray);
    }    
    return stickiesArray
}

function deleteSticky(e){
    var key=e.target.id;
    if(e.target.tagName.toLowerCase()=="span"){
        key=e.target.parentNode.id;
    }
    localStorage.removeItem(key);
    var stickiesArray=getStickiesArray();
    if(stickiesArray){
        for(var i=0; i<stickiesArray.length;i++){
            if(key==stickiesArray[i]){
                stickiesArray.splice(i,1)
            }
        }
        localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
        removeStickyFromDOM(key);
    }
}

function removeStickyFromDOM(key){
    var sticky=document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}