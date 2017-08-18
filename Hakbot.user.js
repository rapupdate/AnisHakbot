//==UserScript==
//@name         RU Bot
//@namespace    http://tampermonkey.net/
//@version      1.4
//@description  Make RU great Again
//@updateURL    https://raw.githubusercontent.com/rapupdate/AnisHakbot/master/Hakbot.user.js
//@downloadURL  https://raw.githubusercontent.com/rapupdate/AnisHakbot/master/Hakbot.user.js
//@author       You
//@match        https://disqus.com/embed/comments/*
//@require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
//@grant        GM_getValue
//@grant        GM_setValue
//@grant        GM_listValues
//@grant        GM_deleteValue
//@grant        GM_addStyle
//@grant        GM_openInTab
//@grant        GM_xmlhttpRequest
//==/UserScript==

//=======================================================      
//Mainprogramm
//=======================================================      
(function() {
    'use strict';
   	GM_addStyle('.editBtn{font-weight: bold;padding:10px;background-color:#737f85;width:40px;height:38px;float:right;}');
	GM_addStyle('.editBtnBig{font-weight: bold;padding:10px;background-color:#737f85;width:80px;height:38px;float:right;}');
	GM_addStyle('.deleteImage{cursor:pointer;height:17px;float:right;}');
    GM_addStyle('.editImageMakro{cursor:pointer;height:17px;padding-right:20px;float:right;}');
	GM_addStyle('.deleteImageMakro{cursor:pointer;height:17px;float:right;}');
    GM_addStyle('.upImageMakro{cursor:pointer;height:17px;padding-right:20px;}');
    GM_addStyle('.upImageMakroLast{cursor:pointer;height:17px;margin-right:37px}');
    GM_addStyle('.downImageMakro{cursor:pointer;height:17px;}');
    GM_addStyle('.downImageMakroFirst{cursor:pointer;height:17px;margin-right:37px}');
	GM_addStyle('.confirmImageMakro{cursor:pointer;height:17px;padding-right:20px;float:right;}');
	GM_addStyle('.clickableText{cursor:pointer;}');
    GM_addStyle('.editBtn:hover{background-color:#5d6b73}');
	GM_deleteValue("error");
	var FakeLinkChecker = GM_getValue("checkLinks");
	if (typeof FakeLinkChecker=='undefined'){
		GM_setValue("checkLinks",confirm("Sollen Rapupdate-Links auf ihre Echtheit überprüft werden?\n\nWenn ihr OK drückt werden XMLHTTP Requests abgesetzt. Wenn das erste Request an eine Domain abgesetzt  wird, erscheint ein Popup von Tampermonkey welches fragt ob der Request zugelassen werden soll.\n\In diesem Popup überprüft die 'ANFRAGEZIEL-DOMAIN', wenn es sich um Rapupdate.de handelt, Klickt auf 'Diese Domain immer zulassen', ansonsten funktioniert der Bot nicht!\n\nDrückt ihr Abbrechen, dann funktioniert alles wie bisher und es werden keine XMLHTTP Requests verschickt!"));
	}
	var botRunning =  GM_getValue("running");
    var botSites = getGMArray("botSites");		
    //setGMArray("makros",[]);
    //=======================================================
    //Setting the Interface
    //=======================================================	
    setInterface(botRunning);
	setAdvancedEditor();
	setReplyOnclick();
    //=======================================================      
    //Wenn Bots angeschaltet startet er die folgenden Funktionen
    //hakBot - Gibt Hak und lädt die Kommentare nach
    //hideBot - Versteckt upvote Fenster
    //reloadBot - Lädt Diqus immer mal nach, damit wirkt wie ein echter User
    //=======================================================      
    var checkDisqus = setInterval(function(){
        if (document.getElementById("community-tab")){
            if (botRunning && botSites.indexOf(document.getElementsByClassName("community-name")[0].innerText)>-1){
                hakBot();    
                hideBot();
                reloadBot();
            }
            //=======================================================      
            //Folgende Bots sind immer an:
            //commentBot - Macht Links anklickbar, bindet Youtube und Bilder ein
            //statusBot - Ändert die Farbe des Namens, abhängig ob Bots an sind oder nicht.
            //=======================================================      
            commentBot();    
            statusBot(botRunning,botSites);
            repostBot();			
            clearInterval(checkDisqus);				
        }
    },100);
})();


//=======================================================      
//Functions
//=======================================================      
function setReplyOnclick(){
	var checkExistDisqus = setInterval(function() {
		var replies = document.getElementsByClassName("reply");
		for (var i=0; i<replies.length;i++){
			if(!replies[i].classList.contains("edited")&&replies[i].classList.length==1&& replies[i].tagName=="LI"){
				replies[i].classList.add("edited");
				replies[i].addEventListener('click', addAdvancedEditor);      				
			}
		}
	}, 100);
}

function addAdvancedEditor(){
	setAdvancedEditorReply(this);		
}

function setAdvancedEditor(){
	var checkExistDisqus = setInterval(function() {
		console.log(document.getElementsByClassName("btn post-action__button"));
        if (document.getElementsByClassName("btn post-action__button").length > 0 && !document.getElementsByClassName("temp-post")[0].classList.contains("advanced")) {
            console.log(document.getElementsByClassName("btn post-action__button"));
			var sndButton = document.getElementsByClassName("btn post-action__button")[0];			
			var boldButton = document.createElement ('div');				
			boldButton.innerHTML='<a style="color:white;"><b>b</b></a>';							
			boldButton.setAttribute ('class', 'editBtn editBold btn post-action__button');	
			// 			
			document.getElementsByClassName("temp-post")[0].appendChild(boldButton);			
			$(".editBold").click(function(e) {
				makeBold();
			});			
			var italicButton = document.createElement ('div');				
			italicButton.innerHTML='<a style="color:white;"><i>i</i></a>';									
			italicButton.setAttribute ('class', 'editBtn edititalic btn post-action__button');	
			// 			
			document.getElementsByClassName("temp-post")[0].appendChild(italicButton);			
			$(".edititalic").click(function(e) {
				makeItalic();
			});			
			var underButton = document.createElement ('div');				
			underButton.innerHTML='<a style="color:white;"><u>u</u></a>';						
			underButton.setAttribute ('class', 'editBtn editunder btn post-action__button');	
			// 			
			document.getElementsByClassName("temp-post")[0].appendChild(underButton);			
			$(".editunder").click(function(e) {
				makeUnder();
			});			
			var scribbleButton = document.createElement ('div');				
			scribbleButton.innerHTML='<a style="color:white;"><s>s</s></a>';						
			scribbleButton.setAttribute ('class', 'editBtn editscribble btn post-action__button');	
			// 			
			document.getElementsByClassName("temp-post")[0].appendChild(scribbleButton);			
			$(".editscribble").click(function(e) {
				makeScribble();8
			});			
			var quoteButton = document.createElement ('div');				
			quoteButton.innerHTML='<a style="color:white;"><blockquote>„"</blockquote></a>';						
			quoteButton.setAttribute ('class', 'editBtn editquote btn post-action__button');	
			// 			
			document.getElementsByClassName("temp-post")[0].appendChild(quoteButton);			
			$(".editquote").click(function(e) {
				makeQuote();
			});				
			var spoilerButton = document.createElement ('div');				
			spoilerButton.innerHTML='<a style="color:white;"><spoiler>Spoiler</spoiler></a>';						
			spoilerButton.setAttribute ('class', 'editBtnBig editspoiler btn post-action__button');	
			// 			
			document.getElementsByClassName("temp-post")[0].appendChild(spoilerButton);			
			$(".editspoiler").click(function(e) {
				makeSpoiler();
			});					
			
			
			var makroButton = document.createElement ('div');				
			makroButton.innerHTML='<a style="color:white;">Makro</a>';						
			makroButton.setAttribute ('class', 'editMain editBtnBig editMakro btn post-action__button');	
			// 			
			document.getElementsByClassName("temp-post")[0].appendChild(makroButton);			
			$(".editMakro").click(function(e) {
				openMakro(this);
			});						
			document.getElementsByClassName("temp-post")[0].classList.add("advanced");
            clearInterval(checkExistDisqus); 
		}		
	}, 1000);
}
function createMakroDiv(hidden,caller,sibling){
	var makros = getGMArray("makros");
	if(typeof makros == 'undefined' || makros.length<=0){
		setGMArray("makros",[]);
		makros = getGMArray("makros");
		console.log("Makros reset");
	}else{
		console.log("Makros: "+makros);
	}

	var makroDiv = document.createElement ('div');
	makroDiv.setAttribute ('id', 'MakroContainer');            
	makroDiv.innerHTML='<h3>Makros</h3><hr>';										
	for (var i = 0; i<makros.length; i++){                    					     
		var text=makros[i].replace(new RegExp("<p>", 'g'),"");
		text=text.replace(new RegExp("</p>", 'g'),"");
		text=text.replace(new RegExp("<br>", 'g'),"");
		text=text.replace(new RegExp("<br />", 'g'),"");
		text=text.substr(0,40);
		console.log(text);
        //makroDiv.innerHTML+= "<span id='"+i+"'>"+text+ "<img src='https://openclipart.org/download/226230/trash.svg' class='deleteImageMakro'><img src='http://img.freepik.com/freie-ikonen/schaltflache-bearbeiten_318-99688.jpg?size=338&ext=jpg' class='editImageMakro'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/U2713.svg/945px-U2713.svg.png' class='confirmImageMakro'></span><hr>";                                                          
        if (i==0){
            makroDiv.innerHTML+= "<span id='"+i+"'><img src='https://image.flaticon.com/icons/svg/25/25243.svg' class='downImageMakroFirst'>"+text+ "<img src='https://openclipart.org/download/226230/trash.svg' class='deleteImageMakro'><img src='http://img.freepik.com/freie-ikonen/schaltflache-bearbeiten_318-99688.jpg?size=338&ext=jpg' class='editImageMakro'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/U2713.svg/945px-U2713.svg.png' class='confirmImageMakro'></span><hr>";                                              
        }else if (i==makros.length-1){
            makroDiv.innerHTML+= "<span id='"+i+"'><img src='https://cdn3.iconfinder.com/data/icons/iconano-web-stuff/512/013-CaretUp-512.png' class='upImageMakroLast'>"+text+ "<img src='https://openclipart.org/download/226230/trash.svg' class='deleteImageMakro'><img src='http://img.freepik.com/freie-ikonen/schaltflache-bearbeiten_318-99688.jpg?size=338&ext=jpg' class='editImageMakro'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/U2713.svg/945px-U2713.svg.png' class='confirmImageMakro'></span><hr>";                                              
        }else{
            makroDiv.innerHTML+= "<span id='"+i+"'><img src='https://image.flaticon.com/icons/svg/25/25243.svg' class='downImageMakro'><img src='https://cdn3.iconfinder.com/data/icons/iconano-web-stuff/512/013-CaretUp-512.png' class='upImageMakro'>"+text+ "<img src='https://openclipart.org/download/226230/trash.svg' class='deleteImageMakro'><img src='http://img.freepik.com/freie-ikonen/schaltflache-bearbeiten_318-99688.jpg?size=338&ext=jpg' class='editImageMakro'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/U2713.svg/945px-U2713.svg.png' class='confirmImageMakro'></span><hr>";                                                          
        }		
	}                
	makroDiv.innerHTML+='<h3 id="saveAsMakro" class="clickableText">Text als Makro speichern</h3>';
	// 			
	if(sibling.classList.contains("nav-secondary")){
		sibling.after(makroDiv); 
	}else{
		sibling.before(makroDiv);
	}
	if(hidden){
		$("#MakroContainer").hide();     
	}

	$("#saveAsMakro").click(function(e) {		
		saveMakro(caller,sibling);
	});			
	$(".deleteImageMakro").click(function(e) {
		deleteMakro(this.parentNode,caller,sibling);
	});		
    $(".downImageMakro").click(function(e) {
		moveDownMakro(this.parentNode,caller,sibling);
	});		
    $(".downImageMakroFirst").click(function(e) {
		moveDownMakro(this.parentNode,caller,sibling);
	});		
    $(".upImageMakro").click(function(e) {
		moveUpMakro(this.parentNode,caller,sibling);
	});		
    $(".upImageMakroLast").click(function(e) {
		moveUpMakro(this.parentNode,caller,sibling);
	});		
	$(".confirmImageMakro").click(function(e) {
		useMakro(this.parentNode,caller);
	});			
    $(".editImageMakro").click(function(e) {
		editMakro(this.parentNode,caller,sibling);
	});		
}
function moveUpMakro (parent,caller,sibling){
    var makros = getGMArray("makros");
	//move(makros,)
    makros.move(parent.id,parent.id-1);
    console.log(makros);
    setGMArray("makros",makros);
    removeMakroDiv();
    openMakro(caller);
}
function moveDownMakro (parent,caller,sibling){
    var makros = getGMArray("makros");
    makros.move(parent.id,Number(parent.id)+1);
    console.log(makros);
    setGMArray("makros",makros);
    removeMakroDiv();
    openMakro(caller);
}
function editMakro (parent,caller,sibling){
    createEdit(parent,caller,sibling);
}

function createEdit(parent,caller,sibling){
    var makros = getGMArray("makros");
    var editDiv = document.createElement ('div');
    editDiv.setAttribute ('id', 'editContainer');            
    editDiv.innerHTML="<textarea id='editText' rows='4' cols='50'>"+makros[parent.id]+"</textarea>";
    editDiv.innerHTML+="<br><input type='button' value='speichern' id='saveEdit'><input type='button' value='abbrechen' id='cancelEdit'>"
    parent.append(editDiv);
    $("#cancelEdit").click(function(e) {
		removeEdit();
	});		
    $("#saveEdit").click(function(e) {
		saveEdit(parent,caller,sibling);
	});		
}

function saveEdit(parent,caller,sibling){
    var makros = getGMArray("makros");
    makros[parent.id] = document.getElementById("editText").value;
    console.log(document.getElementById("editText").value);
    setGMArray("makros",makros);
    removeEdit();
    removeMakroDiv();
    openMakro(caller);
}

function removeEdit(){
    console.log("remove");
    document.getElementById("editContainer").remove();
}
function removeMakroDiv(){
	console.log("MakroDiv wird gelöscht");
	var container = document.getElementById("MakroContainer");
	console.log(container);
	if (typeof container != "undefined" && container != null){
		document.getElementById("MakroContainer").remove();
	}
}
function openMakro(caller){	
	var container = document.getElementById("MakroContainer");
	console.log(container);
	if (typeof container == "undefined" || container == null){
		if(caller.classList.contains("editMain")){			
			createMakroDiv(false,caller,document.getElementsByClassName("nav-secondary")[0]);
		}else{
			createMakroDiv(false,caller,caller.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
		}
		console.log("Creating Makro Div");
		
	}else{		
		var isMain = container.parentNode.id == "conversation";
		if (caller.classList.contains("editMain")&&!isMain){
			removeMakroDiv();
			openMakro(caller);
		}else{
			removeMakroDiv();
		}
	}
}

function useMakro(parent,caller){
	var makros = getGMArray("makros");
	var textarea = $(caller).parent().parent().parent().parent().parent().find(".textarea").get(0);		
	textarea.innerHTML=makros[parent.id];
	console.log("Textarea:" + textarea.innerHTML);
	$(caller).parent().parent().parent().parent().parent().find(".btn.post-action__button").get(0).click();   	    
	removeMakroDiv();
}
function saveMakro(caller,sibling){
	var makros = getGMArray("makros");
	var textarea = $(caller).parent().parent().parent().parent().parent().find(".textarea").get(0);		
	if(textarea.innerText.length<2){
		alert("Makros müssen mindestens 2 Buchstaben lang sein!");
	}else{
		console.log(textarea.innerHTML);
		if(confirm("Soll der Text: "+textarea.innerText+" als Makro gespeichert werden")){					
			makros.push(textarea.innerHTML.replace(/(?:\r\n|\r|\n)/g, '<br />'));
			setGMArray("makros",makros);		
		}	
		removeMakroDiv();
		createMakroDiv(false,caller,sibling);
	}
}

function deleteMakro(parent,caller,sibling){
	console.log(parent.id);
	var makros=getGMArray("makros");
	if(makros.length>1){
		console.log("Removing Entry " + parent.id);
		makros.splice(parent.id,1);
	}else{
		console.log("Resetting Array");
		makros=[];
	}
	setGMArray("makros",makros);
	removeMakroDiv();
	createMakroDiv(false,caller,sibling);
}

function makeQuote(){
	var textArea = document.getElementsByClassName("btn post-action__button")[0].parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
	textArea.focus();	
	var selectedText = getSelectedText();
	console.log();
	if (selectedText.anchorOffset<selectedText.focusOffset){
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);		
		cacheText = cacheText.replace(selected,"<blockquote>"+selected+"</blockquote>");
		text=text+cacheText;
		textArea.innerText=text;
	}else{
		textArea.focus();	
		textArea.innerText=textArea.innerText+"<blockquote></blockquote>";
	}	
}

function makeSpoiler(){
	var textArea = document.getElementsByClassName("btn post-action__button")[0].parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
	textArea.focus();	
	var selectedText = getSelectedText();
	console.log();
	if (selectedText.anchorOffset<selectedText.focusOffset){
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);		
		cacheText = cacheText.replace(selected,"<spoiler>"+selected+"</spoiler>");
		text=text+cacheText;
		textArea.innerText=text;
	}else{
		textArea.focus();	
		textArea.innerText=textArea.innerText+"<spoiler></spoiler>";
	}	
}

function makeBold(){
	var textArea = document.getElementsByClassName("btn post-action__button")[0].parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
	textArea.focus();	
	var selectedText = getSelectedText();
	console.log();
	if (selectedText.anchorOffset<selectedText.focusOffset){
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);		
		cacheText = cacheText.replace(selected,"<b>"+selected+"</b>");
		text=text+cacheText;
		textArea.innerText=text;
	}else{
		textArea.focus();	
		textArea.innerText=textArea.innerText+"<b></b>";
	}	
}

function makeItalic(){
	var textArea = document.getElementsByClassName("btn post-action__button")[0].parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
	textArea.focus();	
	var selectedText = getSelectedText();
	console.log();
	if (selectedText.anchorOffset<selectedText.focusOffset){
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);		
		cacheText = cacheText.replace(selected,"<i>"+selected+"</i>");
		text=text+cacheText;
		textArea.innerText=text;
	}else{
		textArea.focus();	
		textArea.innerText=textArea.innerText+"<i></i>";
	}	
}

function makeUnder(){
	var textArea = document.getElementsByClassName("btn post-action__button")[0].parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
	textArea.focus();	
	var selectedText = getSelectedText();
	console.log();
	if (selectedText.anchorOffset<selectedText.focusOffset){
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);		
		cacheText = cacheText.replace(selected,"<u>"+selected+"</u>");
		text=text+cacheText;
		textArea.innerText=text;
	}else{
		textArea.focus();	
		textArea.innerText=textArea.innerText+"<u></u>";
	}	
}

function makeScribble(){
	var textArea = document.getElementsByClassName("btn post-action__button")[0].parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
	textArea.focus();	
	var selectedText = getSelectedText();
	console.log();
	if (selectedText.anchorOffset<selectedText.focusOffset){
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);		
		cacheText = cacheText.replace(selected,"<s>"+selected+"</s>");
		text=text+cacheText;
		textArea.innerText=text;
	}else{
		textArea.focus();	
		textArea.innerText=textArea.innerText+"<s></s>";
	}	
}


function setAdvancedEditorReply(link){	
	setTimeout(function(){		
		removeMakroDiv();
		var container = $(link).parent().parent().parent().parent();	
		console.log(container.get(0));
		var div = container.find(".temp-post");		
		console.log(div);
		div = div.get(0);
		console.log(typeof div);
		//var checkExist = setInterval(function() {
		console.log("Type: "+typeof div);
		if (typeof div == "object" && !div.classList.contains("advanced")) {
			console.log("War mal Object:" + div);
			var boldButton = document.createElement ('div');						
			boldButton.innerHTML='<a style="color:white;"><b>b</b></a>';			
			//BorderColor
			//border-style: solid;border-color:#68757d;
			boldButton.setAttribute ('class', 'editBtn editBoldReply btn post-action__button');	
			// 						
			var italicButton = document.createElement ('div');				
			italicButton.innerHTML='<a style="color:white;"><i>i</i></a>';			
			//BorderColor
			//border-style: solid;border-color:#68757d;
			italicButton.setAttribute ('class', 'editBtn edititalicReply btn post-action__button');	
			// 			
			var underButton = document.createElement ('div');				
			underButton.innerHTML='<a style="color:white;"><u>u</u></a>';			
			//BorderColor
			//border-style: solid;border-color:#68757d;
			underButton.setAttribute ('class', 'editBtn editunderReply btn post-action__button');	
			// 			
			var scribbleButton = document.createElement ('div');				
			scribbleButton.innerHTML='<a style="color:white;"><s>s</s></a>';			
			//BorderColor
			//border-style: solid;border-color:#68757d;
			scribbleButton.setAttribute ('class', 'editBtn editscribbleReply btn post-action__button');	
			// 
			console.log("Bold" + div);
			div.appendChild(boldButton);			
			
			var makroButton = document.createElement ('div');				
			makroButton.innerHTML='<a style="color:white;">Makro</a>';						
			makroButton.setAttribute ('class', 'editBtnBig editMakroReply btn post-action__button');	
			// 			
									
			$(".editBoldReply").click(function(e) {				
				makeBoldReply(this);
			});			
			console.log("Italic " + div);
			div.appendChild(italicButton);			
			$(".edititalicReply").click(function(e) {
				makeItalicReply(this);
			});			
			div.appendChild(underButton);			
			$(".editunderReply").click(function(e) {
				makeUnderReply(this);
			});			
			div.appendChild(scribbleButton);			
			$(".editscribbleReply").click(function(e) {
				makeScribbleReply(this);
			});						
			div.appendChild(makroButton);
			$(".editMakroReply").click(function(e) {
				openMakro(this);
			});						
			div.classList.add("advanced");
			//       clearInterval(checkExist);
		}            				
		//}, 100);
	},10);
}


function makeBoldReply(button){
	var textArea = button.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
	textArea.focus();	
	var selectedText = getSelectedText();
	console.log();
	if (selectedText.anchorOffset<selectedText.focusOffset){
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);		
		cacheText = cacheText.replace(selected,"<b>"+selected+"</b>");
		text=text+cacheText;
		textArea.innerText=text;
	}else{
		textArea.focus();	
		textArea.innerText=textArea.innerText+"<b></b>";
	}	
}

function makeItalicReply(button){
	var textArea = button.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
	textArea.focus();	
	var selectedText = getSelectedText();
	console.log();
	if (selectedText.anchorOffset<selectedText.focusOffset){
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);		
		cacheText = cacheText.replace(selected,"<i>"+selected+"</i>");
		text=text+cacheText;
		textArea.innerText=text;
	}else{
		textArea.focus();	
		textArea.innerText=textArea.innerText+"<i></i>";
	}	
}

function makeUnderReply(button){
	var textArea = button.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
	textArea.focus();	
	var selectedText = getSelectedText();
	console.log();
	if (selectedText.anchorOffset<selectedText.focusOffset){
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);		
		cacheText = cacheText.replace(selected,"<u>"+selected+"</u>");
		text=text+cacheText;
		textArea.innerText=text;
	}else{
		textArea.focus();	
		textArea.innerText=textArea.innerText+"<u></u>";
	}	
}

function makeScribbleReply(button){
	var textArea = button.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
	textArea.focus();	
	var selectedText = getSelectedText();
	console.log();
	if (selectedText.anchorOffset<selectedText.focusOffset){
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);		
		cacheText = cacheText.replace(selected,"<s>"+selected+"</s>");
		text=text+cacheText;
		textArea.innerText=text;
	}else{
		textArea.focus();	
		textArea.innerText=textArea.innerText+"<s></s>";
	}	
}



function getSelectedText() {
  var txt = '';

  if (window.getSelection) {
    txt = window.getSelection();
  }
  else if (document.getSelection) {
    txt = document.getSelection();
  }
  else if (document.selection) {
    txt = document.selection.createRange().text;
  }
  else return; 

  return txt;
}

function setInterface(botRunning){
	var blacklist = getGMArray("blacklist");
    if(typeof blacklist == 'undefined' || blacklist.length<=0) {
        setGMArray("blacklist",[]);
        blacklist = getGMArray("blacklist");
        console.log("Blacklist reset");
    }else{
        console.log("Blacklist: "+blacklist);
    }
	
    var blacklistClan = getGMArray("blacklistClan");
    if(typeof blacklistClan == 'undefined' || blacklistClan.length<=0){
        setGMArray("blacklistClan",[]);
        blacklistClan = getGMArray("blacklistClan");
        console.log("Blacklist Clan reset");
    }else{
        console.log("BlacklistClan: "+blacklistClan);
    }
    
    var botSites = getGMArray("botSites");
    if(typeof botSites == 'undefined' || botSites.length<=0) {
        setGMArray("botSites",[]);
        blacklist = getGMArray("botSites");
        console.log("botSites reset");
    }else{
        console.log("botSites: "+botSites);
    }
    
    var checkExistDisqus = setInterval(function() {
        if (document.getElementsByClassName("nav-tab--secondary").length) {
            //=======================================================
            //Sets Blacklist Div
            //=======================================================
            var blacklistDiv = document.createElement ('div');
            blacklistDiv.setAttribute ('id', 'BlacklistContainer');
            blacklistDiv.innerHTML = '<h3 title="User die hier drauf stehen können über das Dropdown im Kommentar hinzugefügt/entfernt werden">Blacklisted Disqus ID: </h3><hr>';
            blacklistDiv.innerHTML = blacklistDiv.innerHTML + '<ol>';
            for (var i = 0; i<blacklist.length; i++){
                blacklistDiv.innerHTML = blacklistDiv.innerHTML + "<li><a data-dsq-mention=\""+blacklist[i]+":disqus\" href=\"https://disqus.com/by/"+blacklist[i]+"/\" rel=\"nofollow noopener\" Data-action=\"profile\" data=\""+blacklist[i]+"\">@" + blacklist[i] + "</a><img src='https://openclipart.org/download/226230/trash.svg' class='deleteImage disqusId'></li><hr>";				
            }						
            blacklistDiv.innerHTML = blacklistDiv.innerHTML + '</ol>';
            blacklistDiv.innerHTML = blacklistDiv.innerHTML + '<br><h3 title="Per Click auf den Namen/Clan in dieser Liste können User entfernt werden. Hinzugefügt wird über das Formular unten!">Blacklisted Clans/Names: </h3><hr>';
            blacklistDiv.innerHTML = blacklistDiv.innerHTML + '<div id="blacklistClanList">';
            blacklistDiv.innerHTML = blacklistDiv.innerHTML + '</div><br>';                        
			                           
            setTimeout(function(){                                
                blacklistDiv.innerHTML = blacklistDiv.innerHTML + '<input type="text" placeholder="Namepattern einfügen" id="newBlockedClan"></input><input id="addToClanBlacklist" type="button" value="Auf Blacklist" style="margin:20px"></input><hr><br>';                            
                //blacklistDiv.setAttribute ('style', 'display:none');                        
                document.getElementsByClassName("nav nav-secondary")[0].after(blacklistDiv);                                       
                var addClanBlacklist = document.getElementById("addToClanBlacklist");
                addClanBlacklist.addEventListener('click', addToClanBlacklist);                  
                var blacklistClanLi=document.getElementById("blacklistClanList");                       
                for (var i = 0; i<blacklistClan.length; i++){
                    var blacklistClanLis = document.createElement ('li');                    
                    blacklistClanLis.innerHTML = blacklistClan[i] + "<img src='https://openclipart.org/download/226230/trash.svg' class='deleteImage'><hr>";      
                    blacklistClanLis.setAttribute ('style', 'cursor:pointer;');
                    blacklistClanLi.appendChild(blacklistClanLis);
                }                

                if (typeof blacklistClanLi!="undefined" || blacklistClanLi.length>-1){
                    blacklistClanLi.childNodes.forEach(function(li){
                        console.log(li);
                        li.addEventListener('click', removeFromClanListOnClick);                                
                    });
                }
				$(".deleteImage.disqusId").click(function(e){
					removeBlacklist(this);
				});     
                $("#BlacklistContainer").hide();     
            },1000);                                               
            //=======================================================
            //=======================================================
            //Sets Blacklist Button
            //=======================================================
            setTimeout(function(){
                addBlacklistButton();                
            },2000);
            clearInterval(checkExistDisqus); 
            //=======================================================
            //Sets Toggle Blacklist Button
            //=======================================================
            var blacklistButton = document.createElement ('li');                        
            blacklistButton.innerHTML = '<a class="dropdown-toggle" style="cursor: pointer;" title="Öffnet die Konfigurationsseite für die Blacklist"><span class="label">Blacklist Kofiguration</span></a>';
            blacklistButton.setAttribute ('id', 'blacklistToggle');
            blacklistButton.setAttribute ('class', 'nav-tab nav-tab--secondary dropdown sorting pull-right');
            blacklistButton.addEventListener('click', toggleBlacklistContainer);
            document.getElementsByClassName("nav-tab--secondary")[0].parentNode.appendChild(blacklistButton);               
            //=======================================================      
            //=======================================================
            //Reload Button wegen Zinkus
            //=======================================================
            var blacklistButton = document.createElement ('li');                                    
            blacklistButton.innerHTML = '<a class="dropdown-toggle" style="cursor: pointer;" title="reloaded Disqus, klick wenn Zinkus"><span class="label">Zinkus?</span></a>';
            blacklistButton.setAttribute ('id', 'reloadIconContainer');
            blacklistButton.setAttribute ('class', 'nav-tab nav-tab--secondary dropdown sorting pull-right');           
            blacklistButton.addEventListener('click', zinkus);
            document.getElementsByClassName("nav-tab--secondary")[0].parentNode.appendChild(blacklistButton);               
            //=======================================================
            //=======================================================
            //Sets AutoHak Button
            //=======================================================
            var botButton = document.createElement ('li');            
            var checked= "";
            if(botRunning && botSites.indexOf(document.getElementsByClassName("community-name")[0].innerText)>-1){
                checked = "checked";
            }
            botButton.innerHTML = '<a class="dropdown-toggle" style="cursor: pointer;" title="AutoHak Ein/Aus"><input type="checkbox" id="HakBot" '+checked+'><span class="label">Hak Bot</span></a>';
            botButton.setAttribute ('id', 'myContainer');
            botButton.setAttribute ('class', 'nav-tab nav-tab--secondary dropdown sorting pull-right');
            botButton.addEventListener('click', toggleBot);
            document.getElementsByClassName("nav-tab--secondary")[0].parentNode.appendChild(botButton);               
            //=======================================================
                        
        }    
    }, 100);
}

function removeBlacklist(image){
	var container=image.parentNode;
	console.log(container.firstChild.href);
    var link =  container.firstChild.href;  
	console.log(link);
    var blacklist = getGMArray("blacklist");
    console.log("Blacklist: "+ blacklist);
    var remove=false;
    for(var i=0; i<blacklist.length; i++){
        console.log(blacklist[i]);
        if(link.indexOf(blacklist[i])>-1){                                    
            console.log("Freigeschaltet: "+blacklist[i]);
            blacklist.splice(i, 1);            
            remove=true;                        
        }
    }   
    if(!remove){
        var disqusID= link.substr(0,link.lastIndexOf("/"));            
        disqusID= disqusID.substr(disqusID.lastIndexOf("/")+1);        
        blacklist.push(disqusID);        
        console.log("Gesperrt: "+blacklist[i]);        
    }
    console.log("Blacklist: "+ blacklist);
    setGMArray("blacklist",blacklist);       
    location.reload();
}

function zinkus(){
    location.reload();
}
//=======================================================      
//Adds Clan Names or Namepatterns to Blacklist
//=======================================================      
function addToClanBlacklist(){
    var blacklistClan = getGMArray("blacklistClan");
    if(blacklistClan.indexOf(document.getElementById("newBlockedClan").value)>-1){
        alert("Der Clan steht bereits auf der Blacklist");
    }else{
        var input = document.getElementById("newBlockedClan").value;
        if (input==null || input=="")
        {
            alert("Bitte einen Clan oder Namen eingeben!");
            return false;
        }
        blacklistClan.push(document.getElementById("newBlockedClan").value);                
        setGMArray("blacklistClan",blacklistClan);       
        location.reload();
    }
}
//=======================================================      
//=======================================================      
//Shows and Hides the Blacklist Container
//=======================================================      
function toggleBlacklistContainer(){    
    var container = $("#BlacklistContainer");
    container.slideToggle();

}
//=======================================================      
//=======================================================      
//Removes a Clan or a Namepattern from the Blacklist
//=======================================================      
function removeFromClanList(){
    var blacklistClan = getGMArray("blacklistClan");
    for(var i=0; i<blacklistClan.length; i++){        
        if(blacklistClan[i].indexOf(document.getElementById("newBlockedClan").value)>-1){                        
            blacklistClan.splice(i, 1);                        
            console.log("Freigeschaltet: "+blacklistClan[i]);            
        }
    }   
    setGMArray("blacklistClan",blacklistClan);       
    location.reload();
}
//=======================================================      
//=======================================================      
//Removes a Clan or a Namepattern from the Blacklist Onclick Event 
//=======================================================      
function removeFromClanListOnClick(evt){	
    var blacklistClan = getGMArray("blacklistClan");    
    for(var i=0; i<blacklistClan.length; i++){        
        if(blacklistClan[i].indexOf(this.innerText.substr(0,document.getElementById("blacklistClanList").childNodes[0].innerText.length-1))>-1){                        
            blacklistClan.splice(i, 1);                                    
        }
    }   
    if(confirm("Soll User/Clan \""+this.innerText.substr(0,document.getElementById("blacklistClanList").childNodes[0].innerText.length-1)+"\" von der Blacklist genommen werden?")){
        setGMArray("blacklistClan",blacklistClan);               
        location.reload();
    }
}

//=======================================================      
//=======================================================      
//Adds the Blacklist Button to the Dropdown Menu 
//=======================================================      
function addBlacklistButton(){
    var dropdowns=document.getElementsByClassName("dropdown-menu");
    var userDropdowns=[];
    var blacklist = getGMArray("blacklist");                            
    for (var i=1;i<dropdowns.length;i++){
        var blacklistUser = document.createElement ('li');
        if (dropdowns[i].classList.length==1){
            var comment = dropdowns[i].parentNode.parentNode.parentNode.parentNode;            
            var link=$(comment).find(".post-byline").find(".author.publisher-anchor-color").find("a").get(0);
            link=link.href;
            //console.log(link);
            if (blacklist.length>0){
                for(var j=0; j<blacklist.length; j++){                                    
                    if(link.indexOf(blacklist[j])>-1){                        
                        blacklistUser.innerHTML = '<a style="cursor: pointer;">Benutzer von Blacklist entfernen</a>';                                                            
                    }else{
                        blacklistUser.innerHTML = '<a style="cursor: pointer;">Benutzer auf Blacklist</a>';                                                            
                    }
                }                       
            }else{
                blacklistUser.innerHTML = '<a style="cursor: pointer;">Benutzer auf Blacklist</a>';                                                            
            }
            blacklistUser.addEventListener('click', toggleBlacklist);        
            dropdowns[i].append(blacklistUser);
            dropdowns[i].classList.add("done");                           
            //console.log("Erledigt");

        }
    }
}

//=======================================================      
//=======================================================      
//Adds/removes UserID's from the Blacklist
//=======================================================      
function toggleBlacklist(evt){    
    var container=this.parentNode.parentNode.parentNode.parentNode.parentNode;
    var header= container.getElementsByTagName("header")[0];
    var link =  header.getElementsByTagName("a")[0].href;        
    var blacklist = getGMArray("blacklist");
    console.log("Blacklist: "+ blacklist);
    var remove=false;
    for(var i=0; i<blacklist.length; i++){
        console.log(blacklist[i]);
        if(link.indexOf(blacklist[i])>-1){                                    
            console.log("Freigeschaltet: "+blacklist[i]);
            blacklist.splice(i, 1);            
            remove=true;                        
        }
    }   
    if(!remove){
        var disqusID= link.substr(0,link.lastIndexOf("/"));            
        disqusID= disqusID.substr(disqusID.lastIndexOf("/")+1);        
        blacklist.push(disqusID);        
        console.log("Gesperrt: "+blacklist[i]);        
    }
    console.log("Blacklist: "+ blacklist);
    setGMArray("blacklist",blacklist);       
    location.reload();
}

//=======================================================      
//=======================================================      
//Sets/Unsets the HakBot 
//=======================================================      
function toggleBot(){
    var botRunning = GM_getValue("running");
    if(botRunning){
        GM_setValue("running", false);
        var botSites = getGMArray("botSites");
        for(var i=0; i<botSites.length; i++){
            console.log(botSites[i]);
            if(document.getElementsByClassName("community-name")[0].innerText.indexOf(botSites[i])>-1){                                                  
                botSites.splice(i, 1);            
                remove=true;                        
            }
        }   
        setGMArray("botSites",botSites);
        location.reload();  
    }else{
        GM_setValue("running", true);
        var botSites = getGMArray("botSites");
        botSites.push(document.getElementsByClassName("community-name")[0].innerText);
        setGMArray("botSites",botSites);
        location.reload();  
    }
}

//======================================================
//======================================================
//Hakbot
//======================================================
function hakBot(){        
    console.log("Injected");        
    initialHak();
    //quaffleBot();
    newCommentHak();
    newSubcommentHak();
}

//=======================================================      
//=======================================================      
//Changes the Color of the Name to Symbolize if the Bot is running or not
//=======================================================      
function statusBot(running,botSites) {
    var checkExistStatus = setInterval(function() {
        if (document.getElementsByClassName("community-name").length) {
            if(running && botSites.indexOf(document.getElementsByClassName("community-name")[0].innerText)>-1){
                document.getElementsByClassName("community-name")[0].style.color = "#228b22";
            }else{
                document.getElementsByClassName("community-name")[0].style.color = "#ee3b3b";
            }
            clearInterval(checkExistStatus);
        }    
    }, 100); // check every 100ms

}

//=======================================================      
//=======================================================      
//Loop Function I copied, to make the Linkclicking better
//=======================================================      
function myLoop (upvoteLinks,i) {           //  create a loop function
    var duration = Math.random();
    duration = duration * 1500;
    if (duration < 950){
        duration = duration + 1000;
    }    
    setTimeout(function () {    //  call a 3s setTimeout when the loop is called
        if (upvoteLinks[i].classList.contains('upvoted') || (upvoteLinks[i].classList.contains('vote-up') && blacklistedUser(upvoteLinks[i]))) {
            //console.log("Bereits geliked:" + upvoteLinks[i] + "");            
        }else{
            clickLink(upvoteLinks[i],i);
        }
        i++;                     //  increment the counter
        if (i < upvoteLinks.length) {            //  if the counter < 10, call the loop function
            myLoop(upvoteLinks,i);             //  ..  again which will trigger another 
        }                        //  ..  setTimeout()
    }, duration);
}

//=======================================================      
//=======================================================      
//Checks if a User or a Namepattern is Blacklisted
//Returns True if it is and false if not
//=======================================================
function blacklistedUser(upvoteLink){   
    var blacklist = getGMArray("blacklist");
    var blacklistClan = getGMArray("blacklistClan");
    for(var i=0; i<blacklist.length; i++){
        var link=upvoteLink.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[0].childNodes[0].childNodes[1].childNodes[0].href;                
        if(link.indexOf(blacklist[i])>-1){
            console.log("Blacklisted User: "+ blacklist[i]);
            return true;
        }
    }
    for(var i=0; i<blacklistClan.length; i++){
        var name=upvoteLink.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText;        
        console.log(name);
        if(name.indexOf(blacklistClan[i])>-1){
            console.log("Blacklisted User: "+ name);
            return true;
        }
    }    
    return false;
}

//=======================================================      
//=======================================================      
//Clicks the Link
//=======================================================
function clickLink(upvoteLink,number){    
    var link=upvoteLink;
    setTimeout(function(){ 
        //console.log(link);
        if(document.getElementsByClassName("open").length){        
            setTimeout(function(){ 
                clickLink(upvoteLink,number);
            }, 1000);
        }else{
            link.click();
        }
    }, 100);              
}

//=======================================================      
//=======================================================      
//checks if Disqus is loaded and is giving Hak
//=======================================================
function initialHak(){
    var checkExist = setInterval(function() {
        if (document.getElementsByClassName("textarea").length) {
            console.log("Exists!");
            //document.getElementsByClassName("textarea")[0].innerHTML="Absinth ist ein Hurensohn aber ein begnadeter Liebhaber";
            //document.getElementsByClassName("btn post-action__button")[0].click();
            setTimeout(function(){ 
                var upvoteLinks = document.getElementsByClassName("vote-up");
                //console.log(upvoteLinks.length);
                var i = 0;                     //  set your counter to 1                
                myLoop(upvoteLinks,i);                      //  start the loop                            
            }, 3000);          
            clearInterval(checkExist);
        }
        //console.log(document.getElementsByClassName("textarea").length);
    }, 100); // check every 100ms
}

//=======================================================      
//=======================================================      
//checks if there is a new Comment and is giving Hak
//=======================================================
function newCommentHak(){
    var checkExist2 = setInterval(function() {
        if (document.getElementsByClassName("alert--realtime").length && document.getElementsByClassName("alert--realtime").length>0 && document.getElementsByClassName("alert--realtime")[0].style.display != "none") {            
            //console.log(document.getElementsByClassName("alert--realtime").length);            
            document.getElementsByClassName("alert--realtime")[0].click();
            var upvoteLinks = document.getElementsByClassName("vote-up");
            //console.log(upvoteLinks.length);
            var i = 0;                     //  set your counter to 1                
            myLoop(upvoteLinks,i);                      //  start the loop                                                
        }
        addBlacklistButton();
        //console.log(document.getElementsByClassName("textarea").length);
    }, 2000); // check every 1000ms
}

//=======================================================      
//=======================================================      
//checks if there is a new Subcomment and is giving Hak
//=======================================================
function newSubcommentHak(){
    var checkExist3 = setInterval(function() {
        if (document.getElementsByClassName("realtime-button reveal").length && document.getElementsByClassName("realtime-button reveal").length>0) {            
            var neueKommentare = document.getElementsByClassName("realtime-button reveal");            
            //console.log(upvoteLinks.length);
            var i = 0;                     //  set your counter to 1                
            myLoop(neueKommentare,i);     //  start the loop                                                
            newCommentHak();
        }
        addBlacklistButton();
        //console.log(document.getElementsByClassName("textarea").length);
    }, 1500); // check every 1000ms

}

//=======================================================      
//=======================================================      
//Hides UpvoteList
//=======================================================
function hideBot(){
    var duration = Math.random();
    duration = duration *150;
    if (duration < 20){
        duration = 20;
    }
    var checkExist4 = setInterval(function() {
        if (document.getElementsByClassName("tooltip upvoters").length) {
            var annoyingShit = document.getElementsByClassName("tooltip-outer upvoters-outer");
            for (var i = 0; i<annoyingShit.length;i++){
                if (annoyingShit[i].style.display != "none"){
                    annoyingShit[i].style.display = "none";
                }
            }
        }
        //console.log(document.getElementsByClassName("textarea").length);
    }, duration); // check every 1000ms

}

//=======================================================      
//=======================================================      
//Reloads Disqus randomly
//=======================================================
function reloadBot(){
    var duration = Math.random();
    duration = duration * 120000;
    if (duration < 30000){
        duration = 30000;
    }
    duration= 300000 + duration;
    setTimeout(function(){
        location.reload();  
    },duration);
}

//=======================================================      
//=======================================================      
//Changes the Comments
//Embeds Youtube Links and Images
//Makes Links Clickable
//=======================================================
function commentBot(){
    setInterval(function(){
		var FakeLinkChecker = GM_getValue("checkLinks");
        var comments = document.getElementsByClassName("post-message");
        for (var i = 0;i<comments.length;i++){
            //console.log(comments[i].classList.contains("embed"));
            //console.log(comments[i].innerText.indexOf(".youtube.") > -1);
            //---------------------------------------------------------------------
            //Youtube Embed
            //---------------------------------------------------------------------
            if(comments[i].innerText.toLowerCase().indexOf(".youtube.com/watch?v=") > -1 && !comments[i].classList.contains("embed")){                                                         
                var start = comments[i].innerText.indexOf("watch?v=")+8;
                var end = start+11;
                var id = comments[i].innerText.substr(start,11);                
                comments[i].innerHTML=comments[i].innerHTML + "<br><br>";
                comments[i].innerHTML=comments[i].innerHTML + "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/"+id+"\" frameborder=\"0\" allowfullscreen></iframe>";
                comments[i].classList.add("embed");
            }
            else if(comments[i].innerText.toLowerCase().indexOf("youtu.be/") > -1 && !comments[i].classList.contains("embed")){                                                         
                var start = comments[i].innerText.toLowerCase().indexOf(".be/")+4;
                var end = start+11;
                var id = comments[i].innerText.substr(start,11);                
                comments[i].innerHTML=comments[i].innerHTML + "<br><br>";
                comments[i].innerHTML=comments[i].innerHTML + "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/"+id+"\" frameborder=\"0\" allowfullscreen></iframe>";
                comments[i].classList.add("embed");
            }            

            //---------------------------------------------------------------------
            //Links anklickbar
            //---------------------------------------------------------------------            
            if(comments[i].innerText.toLowerCase().indexOf("http://") > -1 && !comments[i].classList.contains("linked")){                         
                var comment=comments[i].innerText.toLowerCase();
                var commentHtml=comments[i].innerHTML.toLowerCase();
                var backup=comment.slice(comment.indexOf("http://"));
                var backupHtml=commentHtml.slice(commentHtml.indexOf("http://"));                
                var lengthSpace=backup.indexOf(" ");
                var lengthBreak=backupHtml.indexOf("</p");
                if(lengthSpace>lengthBreak || lengthSpace==-1){
                    var link=backup.substr(0,lengthBreak);
                    //console.log("Mit Break: " + link +"aus Text:"+backupHtml);
                }else{
                    var link=backup.substr(0,lengthSpace);
                    //console.log("Mit Space: " +link +"aus Text:"+backup+"Länge: "+length);
                }
                var linkNormal = comments[i].innerHTML;                
                linkNormal=linkNormal.slice(linkNormal.indexOf("http://"));
                //console.log("Nach Slice: " +linkNormal);
                var linkLengthSpace=linkNormal.indexOf(" ");
                var linkLengthBreak=linkNormal.indexOf("</p");  
                var linkLengthBreak2=linkNormal.indexOf("<br");                  
                if (linkLengthBreak2>-1&&linkLengthBreak>linkLengthBreak2){
                    linkLengthBreak=linkLengthBreak2;
                }
                if(linkLengthSpace>linkLengthBreak || linkLengthSpace==-1){
                    var linkNormal=linkNormal.substr(0,linkLengthBreak);
                    //console.log("Der Link mit Break ist "+linkLengthBreak+" Zeichen lang");
                }else{
                    var linkNormal=linkNormal.substr(0,linkLengthSpace);
                    //console.log("Der Link mit Space ist "+linkLengthSpace+" Zeichen lang");
                }
                if(link.indexOf(".png")>-1||link.indexOf(".jpg")>-1||link.indexOf(".gif")>-1){                        
                    //console.log("Der Link zum bild lautet: "+linkNormal);
                    var img=true;
                }       
				console.log("Linknormal:" + linkNormal);
				if(linkNormal.toLowerCase().indexOf("rapupdate.de")>-1 && linkNormal.toLowerCase().indexOf("disq.us")==-1 && FakeLinkChecker){
					fakeLink(comments[i],linkNormal,commentHtml);                          
				}else{
					linkClickable = '<a href="'+linkNormal+'">'+linkNormal+'</a>';
					if(commentHtml.indexOf('href="'+linkNormal)==-1){                    
						commentHtml=commentHtml.replace(link,linkClickable);
					}
					//console.log(commentHtml);
					comments[i].innerHTML=commentHtml;
					if(img){                        
						comments[i].innerHTML=comments[i].innerHTML + "<br><br>";
						comments[i].innerHTML=comments[i].innerHTML + "<img src='"+linkNormal+"' style='width:90%'></img>";
					}
				}                
                comments[i].classList.add("linked");
            }else if(comments[i].innerText.toLowerCase().indexOf("https://") > -1 && !comments[i].classList.contains("linked")){
                if(comments[i].classList.contains("embed")){                    
                    var comment=comments[i].innerText;
                    var commentHtml=comments[i].innerHTML;                    
                    var backup=comment.slice(comment.toLowerCase().indexOf("https://"));
                    var backupHtml=commentHtml.slice(commentHtml.toLowerCase().indexOf("https://"));
                    //console.log(backup.indexOf(" "));
                    var lengthSpace=backup.indexOf(" ");
                    var lengthBreak=backupHtml.indexOf("</p");
                    //console.log(lengthBreak);
                    if(lengthSpace>lengthBreak || lengthSpace==-1){
                        var link=backupHtml.substr(0,lengthBreak);
                        //console.log("Mit Break: " + link +" aus Text: "+backupHtml + " IndexOf End: "+lengthBreak);
                    }else{
                        var link=backup.substr(0,lengthSpace);
                        //console.log("Mit Space: " +link +"aus Text:"+backup+"Länge: "+length);
                    }
                    var linkNormal = comments[i].innerHTML;
                    linkNormal=linkNormal.slice(linkNormal.indexOf("https://"));
                    //console.log("Nach Slice: " +linkNormal);
                    var linkLengthSpace=linkNormal.indexOf(" ");
                    var linkLengthBreak=linkNormal.indexOf("</p");  
                    var linkLengthBreak2=linkNormal.indexOf("<br");                      
                    if (linkLengthBreak2>-1&&linkLengthBreak>linkLengthBreak2){
                        linkLengthBreak=linkLengthBreak2;
                    }                       
                    if(linkLengthSpace>linkLengthBreak || linkLengthSpace==-1){
                        var linkNormal=linkNormal.substr(0,linkLengthBreak);
                        //console.log("Der Link mit Break ist "+linkLengthBreak+" Zeichen lang");
                    }else{
                        var linkNormal=linkNormal.substr(0,linkLengthSpace);
                        //console.log("Der Link mit Space ist "+linkLengthSpace+" Zeichen lang");
                    }
                    if(link.indexOf(".png")>-1||link.indexOf(".jpg")>-1||link.indexOf(".gif")>-1){                        
                        //console.log("Der Link zum bild lautet: "+linkNormal);
                        var img=true;
                    }                  
					console.log("Linknormal:" + linkNormal);
					if(linkNormal.toLowerCase().indexOf("rapupdate.de")>-1 && linkNormal.toLowerCase().indexOf("disq.us")==-1 && FakeLinkChecker){
						fakeLink(comments[i],linkNormal,commentHtml);                        
					}else{
						linkClickable = '<a href="'+linkNormal+'">'+linkNormal+'</a>';
						if(commentHtml.indexOf('href="'+linkNormal)<0){
							commentHtml=commentHtml.replace(link,linkClickable);
							var indexEmbed=commentHtml.indexOf("<iframe");
							var commentHtmlEmbed=commentHtml.slice(indexEmbed);
							commentHtmlEmbed=commentHtmlEmbed.replace(linkClickable,link);
							commentHtml=commentHtml.substr(0,indexEmbed) + commentHtmlEmbed;
							comments[i].innerHTML=commentHtml;
							if(img){
								comments[i].innerHTML=comments[i].innerHTML + "<br><br>";
								comments[i].innerHTML=comments[i].innerHTML + "<img src='"+linkNormal+"' style='width:90%;'></img>";
							}
						}
					}
                                        
                    comments[i].classList.add("linked");
                }else{
                    var comment=comments[i].innerText.toLowerCase();
                    var commentHtml=comments[i].innerHTML.toLowerCase();
                    var backup=comment.slice(comment.indexOf("https://"));
                    var backupHtml=commentHtml.slice(commentHtml.indexOf("https://"));
                    //console.log(backup.indexOf(" "));
                    var lengthSpace=backup.indexOf(" ");
                    var lengthBreak=backupHtml.indexOf("</p");
                    if(lengthSpace>lengthBreak || lengthSpace==-1){
                        var link=backup.substr(0,lengthBreak);
                        //console.log("Mit Break: " + link +"aus Text:"+backupHtml);
                    }else{
                        var link=backup.substr(0,lengthSpace);
                        //console.log("Mit Space: " +link +"aus Text:"+backup+"Länge: "+length);
                    }
                    var linkNormal = comments[i].innerHTML;
                    linkNormal=linkNormal.slice(linkNormal.indexOf("https://"));
                    //console.log("Nach Slice: " +linkNormal);
                    var linkLengthSpace=linkNormal.indexOf(" ");
                    var linkLengthBreak=linkNormal.indexOf("</p");  
                    var linkLengthBreak2=linkNormal.indexOf("<br");  
                    console.log("p: "+linkLengthBreak+"   br:"+linkLengthBreak2+"   Link: "+linkNormal);
                    if (linkLengthBreak2>-1&&linkLengthBreak>linkLengthBreak2){
                        linkLengthBreak=linkLengthBreak2;
                    }                        
                    if(linkLengthSpace>linkLengthBreak || linkLengthSpace==-1){
                        var linkNormal=linkNormal.substr(0,linkLengthBreak);
                        //console.log("Der Link mit Break ist "+linkLengthBreak+" Zeichen lang");
                    }else{
                        var linkNormal=linkNormal.substr(0,linkLengthSpace);
                        //console.log("Der Link mit Space ist "+linkLengthSpace+" Zeichen lang");
                    }
                    if(link.indexOf(".png")>-1||link.indexOf(".jpg")>-1||link.indexOf(".gif")>-1){                                                
                        var img=true;
                    }                    
					console.log("Linknormal (Else):" + linkNormal);
                    if(commentHtml.indexOf('href="'+linkNormal)==-1){                    
						if(linkNormal.toLowerCase().indexOf("rapupdate.de")>-1 && linkNormal.toLowerCase().indexOf("disq.us")==-1 && FakeLinkChecker){
							fakeLink(comments[i],linkNormal,commentHtml);                 
						}else{
							linkClickable = '<a href="'+linkNormal+'">'+linkNormal+'</a>';
							commentHtml=commentHtml.replace(link,linkClickable);                    
							comments[i].innerHTML=commentHtml;
							if(img){
								comments[i].innerHTML=comments[i].innerHTML + "<br><br>";
								comments[i].innerHTML=comments[i].innerHTML + "<img src='"+linkNormal+"' style='width:90%'></img>";
							}
						}
					}
                    
                    comments[i].classList.add("linked");
                }
            }
        }
    },5000);    
}

function fakeLink(comment,linkNormal,commentHtml){	
	//console.log(comment);
	GM_xmlhttpRequest({
		method: "GET",
		url: linkNormal,
		onload: function(response) {
			var linkClickable;
			console.log(comment);
			if(response.responseText.substr(response.responseText.indexOf("<title>"),response.responseText.indexOf("</title>")-response.responseText.indexOf("<title>")).indexOf("Seite nicht gefunden")>-1){				
				linkClickable = '<a href="'+linkNormal+'">'+linkNormal+' (FAKE!)</a>';
			}else{
				linkClickable = '<a href="'+linkNormal+'">'+linkNormal+'</a>';
			}
			console.log(linkNormal);
			console.log(linkClickable);			
			console.log(commentHtml);			
			commentHtml=commentHtml.replace(new RegExp(linkNormal.toLowerCase(), 'g'),linkClickable);     
			console.log(commentHtml);			
			comment.innerHTML=commentHtml;			
			console.log(comment.innerHTML);			
		},
		onerror: function(response){
			var fakeLinkError = GM_getValue("error");
			linkClickable = '<a href="'+linkNormal+'">'+linkNormal+'</a>';			
			commentHtml=commentHtml.replace(new RegExp(linkNormal.toLowerCase(), 'g'),linkClickable);     			
			comment.innerHTML=commentHtml;						
			if(typeof fakeLinkError=='undefined'){
				if (confirm("Die Domain wurde nicht zum Zugriff zugelassen. Eine Anleitung wie dies zu ändern ist findest du in den FAQ auf:\n'https://github.com/rapupdate/AnisHakbot/blob/master/README.md\nWillst du die Readme in neuem Tab öffnen?")){
					GM_openInTab("https://github.com/rapupdate/AnisHakbot/blob/master/README.md#faq",{active:true});
				}
				GM_setValue("error",true);
			}						
		}
	});	   
}

//=======================================================      
//=======================================================      
//Function i copied which makes GM able to save Arrays
//=======================================================
function setGMArray(key,array){    
    for (i=0; i<array.length; i++){
        GM_setValue(key+i , array[i]);
    }    
    while(countGMArray(key)>i){
        var count=i;        
        GM_deleteValue(key+count);                
    }    
}

//=======================================================      
//=======================================================      
//Function i copied, basically length for saved Arrays
//=======================================================
function countGMArray(key) // utility function
{
    var dummy; 
    var j=0; 
    dummy=GM_getValue(key+j);        
    while(typeof dummy!='undefined'){
        j++;
        dummy=GM_getValue(key+j);            
    }        
    return j;
}		
//=======================================================      
//=======================================================      
//Function i copied which gets Arrays saved with setGMArray()
//=======================================================
function getGMArray(key)
{
    var extracted = [];
    var k=0;
    var count = countGMArray(key);    
    for(k;k<count;k++){
        extracted[k] = GM_getValue(key+k);
    }
    return extracted;
}

function findClass(element, className) {
	var foundElement = null, found;
	function recurse(element, className, found) {
		for (var i = 0; i < element.childNodes.length && !found; i++) {
			var el = element.childNodes[i];
			var classes = el.className != undefined? el.className.split(" ") : [];
			for (var j = 0, jl = classes.length; j < jl; j++) {
				if (classes[j] == className) {
					found = true;
					foundElement = element.childNodes[i];
					break;
				}
			}
			if(found)
				break;
			recurse(element.childNodes[i], className, found);
		}
	}
	recurse(element, className, false);
	return foundElement;
}

//=======================================================      
//=======================================================      
//Gets Around Repost Alert
//=======================================================
function repostBot(){
    var checkExist3 = setInterval(function() {
        if (document.getElementsByClassName("alert error").length && document.getElementsByClassName("alert error").length>0) {    
			var container = $(document.getElementsByClassName("alert error")[0]).parent().parent();
			var textArea = container.find(".textarea").get(0);
			console.log(textArea);
            textArea.innerHTML=textArea.innerHTML.replace("</p>",""); 
            textArea.innerHTML=textArea.innerHTML+".</p>"; 
            textArea.innerHTML=textArea.innerHTML.replace("<br>",""); 
            //console.log(document.getElementsByClassName("textarea")[0].innerHTML);
			console.log(container);
            container.find(".btn.post-action__button").get(0).click();
        }
    }, 1500);     
}

Array.prototype.move = function (old_index, new_index) {    
    var helper = this[new_index];
	this[new_index]=this[old_index];
	this[old_index]=helper;
    return this; // for testing purposes
};

//=======================================================      
//=======================================================      
//Backupstuff - Not used in the code!
//=======================================================
function backupKram(){
    var checkExist = setInterval(function() {
        if (document.getElementsByClassName("textarea").length) {
            console.log("Exists!");
            //document.getElementsByClassName("textarea")[0].innerHTML="Absinth ist ein Hurensohn aber ein begnadeter Liebhaber";
            //document.getElementsByClassName("btn post-action__button")[0].click();
            setTimeout(function(){ 
                var upvoteLinks = document.getElementsByClassName("vote-up");
                //console.log(upvoteLinks.length);
                var i = 0;                     //  set your counter to 1                
                myLoop(upvoteLinks,i);                      //  start the loop                            
            }, 3000);          
            clearInterval(checkExist);
        }
        //console.log(document.getElementsByClassName("textarea").length);
    }, 100); // check every 100ms
}

//=======================================================      
//=======================================================      
//Future Hurensohn Kommentarschreiber, wird nicht verwendet
//=======================================================
function futureHurensohnBot(){
    var duration = Math.random();
    duration = duration *18000;
    if (duration < 20){
        duration = 20;
    }
    var checkExist = setInterval(function() {
        if (document.getElementsByClassName("textarea").length) {
            console.log("Exists!");
            document.getElementsByClassName("textarea")[0].innerHTML="Future ist ein Hurensohn " + duration;
            document.getElementsByClassName("btn post-action__button")[0].click();            
            //console.log(document.getElementsByClassName("textarea").length);
            clearInterval(checkExist);
        }
    }, duration); // check every 100ms
    //();
}

//=======================================================      
//=======================================================      
//Changes Darth Qullis Profilepic to the Old one
//=======================================================
function quaffleBot(){
    setInterval(function(){
        console.log("Search Quaffles");
        setTimeout(function(){
            var user=document.getElementsByClassName("user");
            for (var i =0; i<user.length;i++){
                //console.log(user[i].href);
                if(user[i].href=="https://disqus.com/by/DarthWaffle/"){
                    console.log("Quaffles Found");
                    console.log(user[i].childNodes[0]);
                    user[i].childNodes[0].src="https://i.imgur.com/Q8twCGV.jpg";
                }
            }
        },200);
    },500);
}

//=======================================================      
//=======================================================      
//Should Load Disqus Username, but it doesn't because i dont have an api Key
//=======================================================
function loadDisqusName() {
}
