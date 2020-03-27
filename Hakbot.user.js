//==UserScript==
//@name         RU Bot
//@namespace    http://tampermonkey.net/
//@version      3.1.5
//@description  Make RU great Again
//@updateURL    https://raw.githubusercontent.com/rapupdate/AnisHakbot/master/Hakbot.user.js
//@downloadURL  https://raw.githubusercontent.com/rapupdate/AnisHakbot/master/Hakbot.user.js
//@author       You
//@match        https://disqus.com/embed/comments/*
//@require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
//@require      http://benpickles.github.io/peity/jquery.peity.js
//@run-at       document-start
//@grant        GM_getValue
//@grant        GM_setValue
//@grant        GM_listValues
//@grant        GM_deleteValue
//@grant        GM_addStyle
//@grant        GM_openInTab
//@grant        GM_xmlhttpRequest
//@grant        GM_notification
//@grant        window.close
//==/UserScript==

//=======================================================
//Mainprogramm
//=======================================================
(function() {
	'use strict';
	//=======================================================
	//Wenn Bots angeschaltet startet er die folgenden Funktionen
	//Hakbot - Gibt Hak und lädt die Kommentare nach
	//hideBot - Versteckt upvote Fenster
	//reloadBot - Lädt Diqus immer mal nach, damit wirkt wie ein echter User
	//Verrückte Scheiße dieser Bot ist riesig und geht jetzt in Verrsion 2.0, krasse sache
	//=======================================================
    console.log("RU-Bot injeziert");
	var checkDisqus = setInterval(function(){
		if (document.getElementById("community-tab") && document.getElementsByClassName("nav-secondary").length>0 && document.getElementsByClassName("username").length>0){
			GM_addStyle('.editBtn{font-weight: bold;padding:10px;background-color:#737f85;width:40px;height:38px;float:right;}');
			GM_addStyle('.editBtnBig{font-weight: bold;padding:10px;background-color:#737f85;width:60px;height:38px;float:right;}');
			GM_addStyle('.deleteImage{cursor:pointer;height:17px;float:right;}');
			GM_addStyle('.editImageMakro{cursor:pointer;height:17px;padding-right:20px;float:right;}');
			GM_addStyle('.insertImageMakro{cursor:pointer;height:17px;padding-right:20px;float:right;}');
			GM_addStyle('.deleteImageMakro{cursor:pointer;height:17px;float:right;}');
			GM_addStyle('.upImageMakro{cursor:pointer;height:17px;padding-right:20px;}');
			GM_addStyle('.upImageMakroLast{cursor:pointer;height:17px;margin-right:37px}');
			GM_addStyle('.downImageMakro{cursor:pointer;height:17px;}');
			GM_addStyle('.downImageMakroFirst{cursor:pointer;height:17px;margin-right:37px}');
			GM_addStyle('.confirmImageMakro{cursor:pointer;height:17px;padding-right:20px;float:right;}');
			GM_addStyle('.clickableText{cursor:pointer;}');
			GM_addStyle('.editBtn:hover{background-color:#5d6b73}');
			GM_addStyle('.editBtn:active{background-color:#2e9fff}');
			GM_addStyle('.helper{cursor:help;}');
			GM_addStyle('.articleWarning{background: linear-gradient(to bottom, rgba(202,0,0,1) 0%,rgba(154,10,0,1) 100%);background-image: linear-gradient(rgb(202, 0, 0) 0%, rgb(154, 10, 0) 100%);background-position-x: initial;background-position-y: initial;background-size: initial;background-repeat-x: initial;background-repeat-y: initial;background-attachment: initial;background-origin: initial;background-clip: initial;background-color: initial;text-align:center;color:white;width:97%;padding:10px;margin-left:30px;margin:10px;border-radius:5px 5px 5px 5px;cursor:pointer}');
            GM_addStyle('.smiley{font-size: 150%;padding:10px;display: inline-block;cursor:pointer;}');
			GM_addStyle('.downed{color:#f05f70;font-family: inherit;line-height: .85;font-weight: 500;display: inline-block;}');
			GM_addStyle('.quoteDiv{margin-bottom:12px;text-align:center;}');
			GM_addStyle('.quoteLable{font-size:13px;color:#656c7a!important;font-weight:700}');
			GM_addStyle('span.settingLable{font-weight: 300;display: inline-block;margin-right:10px}');
			GM_addStyle('summary{font-size:16px;font-weight: 600;cursor:pointer}');
			GM_addStyle('summary::-webkit-details-marker {display: none;}');
			GM_addStyle('summary:before {content: "►";}');
			GM_addStyle('details.open summary:before {content: "▼";}');
			GM_addStyle('summary:before, summary:after {font-size:.8em;margin-right:6px;}');
			GM_addStyle('@keyframes down {from {color: #f05f70;}to {color: #656c7a;}}');
			GM_addStyle('.quoteDown {animation-name: down;animation-duration: 2s;}');
			GM_addStyle('@keyframes up {from {color: #7CFC00;}to {color: #656c7a;}}');
			GM_addStyle('.quoteUp {animation-name: up;animation-duration: 2s;}');
			GM_addStyle('@keyframes stable {from {color: #2e9fff;}to {color: #656c7a;}}');
			GM_addStyle('.quoteStable {animation-name: stable;animation-duration: 2s;}');
			GM_addStyle('.graphContainer {cursor:pointer}');
			//GM_addStyle('.textarea-wrapper--top-level .textarea-wrapper {margin-left: 120px !important;}.avatar img{width: 100px !important;height: 100px !important;}.textarea-wrapper--top-level .postbox {height: 150px !important;}');
			GM_deleteValue("error");
			GM_setValue("onceNotified",false);
			GM_setValue("loading",false);
			var FakeLinkChecker = GM_getValue("checkLinks");
			if (typeof FakeLinkChecker=='undefined'){
				GM_setValue("checkLinks",confirm("Sollen Rapupdate-Links auf ihre Echtheit überprüft werden?\n\nWenn ihr OK drückt werden XMLHTTP Requests abgesetzt. Wenn das erste Request an eine Domain abgesetzt  wird, erscheint ein Popup von Tampermonkey welches fragt ob der Request zugelassen werden soll.\n\In diesem Popup überprüft die 'ANFRAGEZIEL-DOMAIN', wenn es sich um Rapupdate.de handelt, Klickt auf 'Diese Domain immer zulassen', ansonsten funktioniert der Bot nicht!\n\nDrückt ihr Abbrechen, dann funktioniert alles wie bisher und es werden keine XMLHTTP Requests verschickt!"));
			}

			var hideRecommend = GM_getValue("hideRecommend");
			if (typeof hideRecommend=='undefined'){
				GM_setValue("hideRecommend",true);
				hideRecommend = GM_getValue("hideRecommend");
			}
            var hideSocial = GM_getValue("hideSocial");
			if (typeof hideSocial=='undefined'){
				GM_setValue("hideSocial",true);
				hideSocial = GM_getValue("hideSocial");
			}
            var embedYoutube = GM_getValue("embedYoutube");
			if (typeof embedYoutube=='undefined'){
				GM_setValue("embedYoutube",true);
				embedYoutube = GM_getValue("embedYoutube");
			}
            var advanced = GM_getValue("advanced");
			if (typeof advanced=='undefined'){
				GM_setValue("advanced",false);
				advanced = GM_getValue("advanced");
			}
            var comment = GM_getValue("comment");
			if (typeof comment=='undefined'){
				GM_setValue("comment",true);
				comment = GM_getValue("comment");
			}

			var showQuote = GM_getValue("showQuote");
			if (typeof showQuote =='undefined'){
				GM_setValue("showQuote",true);
			}

			var askDisqus = GM_getValue("askDisqus");
			if (typeof askDisqus =='undefined'){
				GM_setValue("askDisqus",false);
			}

			var mode = GM_getValue("hakMode");
			if (typeof mode =='undefined'){
				GM_setValue("hakMode","blacklist");
			}

			var answerHak = GM_getValue("answerHak");
			if (typeof answerHak=='undefined'){
				GM_setValue("answerHak",true);
			}
			GM_setValue("dontHide",false);
			var showDownvotes = GM_getValue("showDownvotes");
			if (typeof showDownvotes=='undefined'){
				GM_setValue("showDownvotes",true);
				showDownvotes = GM_getValue("showDownvotes");
			}

			var fastSendStatus = GM_getValue("fastSend");
			if (typeof fastSendStatus=='undefined'){
				GM_setValue("fastSend",false);
			}

			var embedImages = GM_getValue("embedImages");
			if (typeof embedImages=='undefined'){
				GM_setValue("embedImages",true);
			}

			if (typeof FakeLinkChecker=='undefined'){
				GM_setValue("checkLinks",confirm("Sollen Rapupdate-Links auf ihre Echtheit überprüft werden?\n\nWenn ihr OK drückt werden XMLHTTP Requests abgesetzt. Wenn das erste Request an eine Domain abgesetzt  wird, erscheint ein Popup von Tampermonkey welches fragt ob der Request zugelassen werden soll.\n\In diesem Popup überprüft die 'ANFRAGEZIEL-DOMAIN', wenn es sich um Rapupdate.de handelt, Klickt auf 'Diese Domain immer zulassen', ansonsten funktioniert der Bot nicht!\n\nDrückt ihr Abbrechen, dann funktioniert alles wie bisher und es werden keine XMLHTTP Requests verschickt!"));
			}
			var switchArticle = GM_getValue("switchArticle");
			if (typeof switchArticle=='undefined'){
				GM_setValue("switchArticle",false);
			}

			var quaffles = GM_getValue("quaffles");
			if (typeof quaffles=='undefined'){
				GM_setValue("quaffles",false);
			}

			var checkArticle = GM_getValue("checkArticle");
			if (typeof checkArticle=='undefined'){
				GM_setValue("checkArticle",confirm("Soll nach neuen Artikeln gesucht werden?\n\nWenn ihr OK drückt werden XMLHTTP Requests abgesetzt. Wenn das erste Request an eine Domain abgesetzt  wird, erscheint ein Popup von Tampermonkey welches fragt ob der Request zugelassen werden soll.\n\In diesem Popup überprüft die 'ANFRAGEZIEL-DOMAIN', wenn es sich um Rapupdate.de handelt, Klickt auf 'Diese Domain immer zulassen', ansonsten funktioniert der Bot nicht!\nWenn ihr den Fakelinkchecker aktiviert habt und dieser funktioniert, dann sollte kein Popup kommen.\n\nDrückt ihr Abbrechen, dann funktioniert alles wie bisher und es werden keine XMLHTTP Requests verschickt!"));
			}

			var articleNotification = GM_getValue("articleNotification");
			if (typeof articleNotification=='undefined'){
				GM_setValue("articleNotification",true);
			}

			var clearUrl = GM_getValue("clearUrl");
			if (typeof clearUrl=='undefined'){
				GM_setValue("clearUrl",true);
			}

			var loadComments = GM_getValue("loadComments");
			if (typeof loadComments=='undefined'){
				GM_setValue("loadComments",true);
			}

			var reloadTime = GM_getValue("reloadTime");
			if (typeof reloadTime=='undefined'){
				GM_setValue("reloadTime",300000);
			}
			var natural = GM_getValue("natural");
			if (typeof natural=='undefined'){
				GM_setValue("natural",true);
			}
			var reload = GM_getValue("reload");
			if (typeof reload=='undefined'){
				GM_setValue("reload",true);
			}
			var loadSubComments = GM_getValue("loadSubcomments");
			if (typeof loadSubComments=='undefined'){
				GM_setValue("loadSubcomments",true);
			}
			var botRunning =  GM_getValue("running");
			var botSites = getGMArray("botSites");
			//setGMArray("makros",[]);
			//=======================================================
			//Setting the Interface
			//=======================================================
			setInterface(botRunning);
            setAdvancedEditor(advanced);
            hidePrivacyBot();
			setReplyOnclick();
            if (botRunning && botSites.indexOf(document.getElementsByClassName("community-name")[0].innerText)>-1){
                hakBot();
                hideBot();
                console.log(reload);
            }
            //=======================================================
            //Folgende Bots sind immer an:
            //commentBot - Macht Links anklickbar, bindet Youtube und Bilder ein
            //statusBot - Ändert die Farbe des Namens, abhängig ob Bots an sind oder nicht.
            //newCommentBot - Lädt automatisch die neuen Kommentare nach
            //newSubcommentBot - Lädt automatisch die neuen Kommentarantworten nach
            //=======================================================
            if(loadComments)newCommentBot(natural);
            if(loadSubComments)newSubcommentBot(natural);
            if(clearUrl)urlBot();
            if(fastSendStatus)fastSend();
			if(checkArticle&&location.href.indexOf("rapupdate")>-1)newArticleBot(switchArticle);
			if(reload)reloadBot(reloadTime);
			if(hideRecommend)hideRecommendBot();
			if (comment) commentBot();
            repostBot();
            plugBot();
			if (showQuote)quoteBot();
			statusBot(botRunning,botSites);
			if (showDownvotes) showDownvotesBot();
			clearInterval(checkDisqus);
			if (quaffles)quaffleBot();
			if(inIframe()){
				if(askDisqus&&confirm("Zu DisqusThread wechseln?")){
					GM_openInTab(location.href,{active:true});
					window.close();
				}
			}
            if (hideSocial) hideSocialBot()
			//console.log($(".nav-tab.nav-tab--secondary.dropdown.sorting.pull-right"));
			$(".nav-tab.nav-tab--secondary.dropdown.sorting.pull-right").find("li").click(function(){loading();});
            //var progress = document.createElement ('div');
            //progress.innerHTML = "<progress id='timeToReload'></progress>";
            //$(".nav.nav-primary").children("ul").get(0).after(progress);
        }
    },100);
})();


//=======================================================
//Functions
//=======================================================

function loading(){
	//alert("test");
	var waitAMoment = setInterval(function(){
		var posts = $("#post-list").children();
		//console.log(posts.length);
		if(posts.length <= 1 || typeof $(".post-list.loading").get(0)!="undefined"){
		   GM_setValue("loading",true);
		}else{           
	       clearInterval(waitAMoment);
			setTimeout(function(){
				GM_setValue("loading",false);
			},5000)

		}
	},100);

}

function hideRecommendBot(){
	var recommend = setInterval(function(){
		var recommendButton=document.getElementById("recommend-button");
		if(typeof recommendButton !="undefined"){
			recommendButton.setAttribute("style", "display:none");
			clearInterval(recommend);
		}
	},100);
}

function hideSocialBot(){
	var social = setInterval(function(){
		var social=$(".thread-share-bar-buttons");
		if(social.length > 0){
			$(".thread-share-bar-buttons").hide();
			clearInterval(social);
		}
	},100);
}

function quoteBot() {
	var quoteDiv = document.createElement("div");
	quoteDiv.innerHTML = "<a class='quoteLable'>Hakquote: Gesamt: <span id='full'></span><span id='fullIndicator'></span> <span class='graphContainer'><span id='allGraph' class='line all'></span></span> Kommentare: <span id='comments'></span><span id='commentsIndicator'></span> <span class='graphContainer'><span id='commentGraph' class='line comment'></span></span> Antworten: <span id='answers'></span> <span id='answersIndicator'></span> <span class='graphContainer'><span id='answerGraph' class='line answers'></span></span></a>";
	quoteDiv.setAttribute("id","quote");
	quoteDiv.setAttribute("class","quoteDiv");
	$("#posts").get(0).before(quoteDiv);
	$(".graphContainer").click(function(){
		bigGraph($(this).find(".line"),true);
	});
	var checkPosts = setInterval(function(){
		if(document.getElementsByClassName("post").length>1){
			clearInterval(checkPosts);
			fillQuoteDiv(true);
			setInterval(function(){
				fillQuoteDiv(false);
			},5000);
		}
	},100);
}

function fillQuoteDiv(first){
	//downvote counter ausschließen!
	var oldAll = GM_getValue("oldHak");
	var oldComment=GM_getValue("oldCommentHak");
	var oldAnswer=GM_getValue("oldAnswerHak");
	var allHak = $(".vote-up").children(".updatable.count").get();
	var allHakCount=0;
	var answerHak= $(".children").find(".vote-up").find(".updatable.count").get();
	var answerHakCount=0;
	var commentHak = [];
	var commentHakCount=0;
	var graphResults = GM_getValue("graphResults");
	var graphResultsCounter = GM_getValue("graphResultsCounter");

	var graphResultsComments = GM_getValue("graphResultsComments");
	var graphResultsCounterComments = GM_getValue("graphResultsCounterComments");
	var graphResultsAnswers = GM_getValue("graphResultsAnswers");
	var graphResultsCounterAnswers = GM_getValue("graphResultsCounterAnswers");

	if (typeof graphResults == "undefined"){
		var graphResultsArray=[];
		var graphResultsArrayComments=[];
		var graphResultsArrayAnswers=[];
		for(var l = 0; l<120;l++){
			graphResultsArray.push("0");
			graphResultsArrayComments.push("0");
			graphResultsArrayAnswers.push("0");
		}
		GM_setValue("graphResults",graphResultsArray.toString());
		GM_setValue("graphResultsComments",graphResultsArrayComments.toString());
		GM_setValue("graphResultsAnswers",graphResultsArrayAnswers.toString());
		graphResults = GM_getValue("graphResults");
		graphResultsCounter = 0;
		graphResultsCounterComments = 0;
		graphResultsCounterAnswers = 0;
	}else{
		var graphResultsArray=graphResults.split(",");
		var graphResultsArrayComments=graphResultsComments.split(",");
		var graphResultsArrayAnswers=graphResultsAnswers.split(",");
	}

	for(var i=0; i<allHak.length;i++){
		if(! $(allHak[i]).closest(".children").length ) {
			commentHak.push(allHak[i]);
		}
		var help=allHak[i].innerHTML;
		allHakCount+=parseInt(help);
	}
	for(var j=0; j< answerHak.length; j++){
		var help=answerHak[j].innerHTML;
		answerHakCount+=parseInt(help);
	}
	for(var k=0; k< commentHak.length; k++){
		var help=commentHak[k].innerHTML;
		commentHakCount+=parseInt(help);
	}
	var allHakQuote=Math.round(allHakCount/allHak.length*100)/100;
	var answerHakQuote=Math.round(answerHakCount/answerHak.length*100)/100;
	var commentHakQuote=Math.round(commentHakCount/commentHak.length*100)/100;

	if(graphResultsCounter<120){
		graphResultsArray[graphResultsCounter]=allHakQuote;
		graphResultsArrayComments[graphResultsCounterComments]=commentHakQuote;
		graphResultsArrayAnswers[graphResultsCounterAnswers]=answerHakQuote;
		graphResultsCounterComments+=1;
		graphResultsCounterAnswers+=1;
		graphResultsCounter+=1;
	}else{
		graphResultsArray.splice(0, 1);
		graphResultsArray.push(allHakQuote);
		graphResultsArrayAnswers.splice(0, 1);
		graphResultsArrayAnswers.push(answerHakQuote);
		graphResultsArrayComments.splice(0, 1);
		graphResultsArrayComments.push(commentHakQuote);
	}
	$("#allGraph").html(graphResultsArray.toString());
	$("#commentGraph").html(graphResultsArrayComments.toString());
	$("#answerGraph").html(graphResultsArrayAnswers.toString());

	//Math.max.apply(Math,_array); // 3
	//console.log("Minimum: "+ Math.min.apply(Math,graphResultsArray)+" Aus: "+ graphResultsArray);
	$(".line.all").peity("line", { min: Math.min.apply(Math,graphResultsArray)-1,max: Math.max.apply(Math,graphResultsArray)});
	$(".line.comment").peity("line", { min: Math.min.apply(Math,graphResultsArrayComments)-1,max: Math.max.apply(Math,graphResultsArrayComments)});
	$(".line.answers").peity("line", { min: Math.min.apply(Math,graphResultsArrayAnswers)-1,max: Math.max.apply(Math,graphResultsArrayAnswers)});

	GM_setValue("graphResultsCounter",graphResultsCounter);
	GM_setValue("graphResults",graphResultsArray.toString());
	GM_setValue("graphResultsCounterComments",graphResultsCounterComments);
	GM_setValue("graphResultsComments",graphResultsArrayComments.toString());
	GM_setValue("graphResultsCounterAnswers",graphResultsCounterAnswers);
	GM_setValue("graphResultsAnswers",graphResultsArrayAnswers.toString());

	$("#full").html(allHakQuote);
	$("#comments").html(commentHakQuote);
	$("#answers").html(answerHakQuote);
	//console.log(oldAll);
	$("#fullIndicator").removeClass("quoteUp quoteDown quoteStable");
	$("#commentsIndicator").removeClass("quoteUp quoteDown quoteStable");
	$("#answersIndicator").removeClass("quoteUp quoteDown quoteStable");
	//console.log(GM_getValue("oldAnswerHak"));
	GM_setValue("oldHak",allHakQuote);
	GM_setValue("oldCommentHak",commentHakQuote);
	GM_setValue("oldAnswerHak",answerHakQuote);
	if(oldAll>allHakQuote){
		$("#fullIndicator").html("⬇");
		$("#fullIndicator").addClass("quoteDown");
	}else if(oldAll<allHakQuote){
		$("#fullIndicator").html("⬆");
		$("#fullIndicator").addClass("quoteUp");
	}else{
		$("#fullIndicator").html("⇨");
		$("#fullIndicator").addClass("quoteStable");
	}
	if(oldComment>commentHakQuote){
		$("#commentsIndicator").html("⬇");
		$("#commentsIndicator").addClass("quoteDown");
	}else if(oldComment<commentHakQuote){
		$("#commentsIndicator").html("⬆");
		$("#commentsIndicator").addClass("quoteUp");
	}else{
		$("#commentsIndicator").html("⇨");
		$("#commentsIndicator").addClass("quoteStable");
	}

	if(oldAnswer>answerHakQuote){
		$("#answersIndicator").html("⬇");
		$("#answersIndicator").addClass("quoteDown");
	}else if(oldAnswer<answerHakQuote){
		$("#answersIndicator").html("⬆");
		$("#answersIndicator").addClass("quoteUp");
	}else{
		$("#answersIndicator").html("⇨");
		$("#answersIndicator").addClass("quoteStable");
	}
	if($("#bigGraph").length){
		bigGraph($("#"+$("#bigGraph").attr("value")),false);
	}
}

function bigGraph(span,click){

	var renew=true;
	if($("#bigGraph").length){
		if($("#bigGraph").attr("value")==span.attr("id")&&click){
			renew=false;
		}
		$("#bigGraph").remove();
	}
	if(renew){
		$("#quote").after("<div id='bigGraph' value='"+span.attr("id")+"'><span id='bigGraphValues' class='line bigGraph'></span></div>");
		var bigGraphArray = span.html().split(",");
		$("#bigGraphValues").html(span.html());
		$(".line.bigGraph").peity("line", { min: Math.min.apply(Math,bigGraphArray)-1,max: Math.max.apply(Math,bigGraphArray),width: $("#bigGraph").width(), height: 50});
	}

}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function showDownvotesBot(){
	setInterval(function(){
		var downVotes=document.getElementsByClassName("vote-down");
		for (var i=0; i<downVotes.length; i++){
			if (!downVotes[i].classList.contains("revealed")){
				downVotes[i].classList.add("revealed")
				var classAdd = "";
				if (downVotes[i].classList.contains("downvoted")){
					var downVoteClass = downVotes[i].classList.item(2);
					classAdd = "downed";
				}else var downVoteClass = downVotes[i].classList.item(1);
				var downVotesCount = downVoteClass.substr(6);
				$(downVotes[i]).append($("<span class='updatable count "+classAdd+"'>"+downVotesCount+"</span>"));
				//console.log("Downvotes: "+downVotesCount);
			}
		}
	},1000)
}
function fastSend(){
	var checkExistTextArea = setInterval(function() {
		$(".textarea").not(".fastSend").unbind("keydown").keydown(function(e){
			if (e.keyCode == 13 && e.shiftKey) {
				console.log("Shift Enter");
				var content = this.value;
				var caret = getCaret(this);
				this.value = content.substring(0,caret)+"\n"+content.substring(carent,content.length-1);
				this.focus();
				e.stopPropagation();
			}else if(e.keyCode == 13){
				var container = $(this).parent().parent();
				container.find(".btn.post-action__button").get(0).click();
				this.focus();
				e.stopPropagation();
			}
			$(".textarea").addClass("fastSend");
		});
	}, 1000);
}

function plugBot(){
    var plugs = [["->Hero Boiz<-","https://plug.dj/rapupdate-cafe/"],["Knarv","https://plug.dj/marios-treue-diener/"],["Shksbr","https://plug.Dj/rapupdatede"]];
    var plugDropDown = document.createElement("li");
    plugDropDown.innerHTML = "<a class='publisher-nav-color'>Plugs: <select id='plugSelect'><option disabled selected value> Auswählen </option>";
    plugDropDown.setAttribute("class","nav-tab nav-tab--primary tab-general");
    console.log($(".community-name"))
    $(".community-name").closest("li").after(plugDropDown);
    for (var i = 0; i<plugs.length;i++){
        var option = document.createElement("option");
        option.innerHTML = plugs[i][0];
        option.setAttribute("value",plugs[i][1]);
        $("#plugSelect").get(0).append(option);
    }
    $("#plugSelect").change(function(){
        openPlug(this);
    })
}

function openPlug(select){
    link = $( "#plugSelect option:selected" ).attr("value");
    GM_openInTab(link,false);
}
function cacheBreaker() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 55; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function hidePrivacyBot(){
    $(".privacy-policy-short").closest('li').remove();
    console.log($(".privacy-policy-short").closest('li'));
}

function newArticleBot(switchArticle){
	console.log("New Article Bot startet");
	var articleNotification = GM_getValue("articleNotification");
	var noNew;
    var rndmUrl="http://www.rapupdate.de/"+cacheBreaker()+"/";
	setTimeout(function(){
		//console.log(rndmUrl);
		GM_xmlhttpRequest({
			method: "GET",
			url: rndmUrl,
			onload: function(response) {
				var ruApi = response.responseText;
				//console.log(ruApi);
				if (typeof ruApi != 'undefined'){
					var tempDiv = document.createElement('div');
					console.log(ruApi);
					tempDiv.innerHTML = ruApi.replace(/<script(.|\s)*?\/script>/g, '');
					var li = $(tempDiv).find("#miniloops-2").find("li").get(0);
					var link = $(li).find("a").attr("href");
					//console.log(link);
					var url = encodeURI(link);
					var para = getParameterByName("t_u", location.href)
					//console.log(document.getElementsByClassName("articleWarning").length);
					if(link!=para && document.getElementsByClassName("articleWarning").length <=0){
						var newArticle = document.createElement ('div');
						newArticle.setAttribute("class","articleWarning");
						newArticle.setAttribute("id","articleWarning");
						newArticle.innerHTML = "Neuer Artikel";
						$("#posts").before(newArticle);
						$("#articleWarning").click(function(e){
							GM_openInTab(link,false);
							//console.log("Click");
						});
						if(articleNotification&&!GM_getValue("onceNotified")){
							GM_setValue("onceNotified",true);
							GM_notification("Neuer Artikel!","Rapupdate","https://lh3.googleusercontent.com/KRLdUry4tVh571_SDJRU9R6KfaOdnmdWcSIqhmG21KsmA9EdBeL9P7dlJB_HQw6Kqw=w300",function(){GM_openInTab(link,false);});
						}
						if(switchArticle)GM_openInTab(link,false);
					}
				}else{
					//console.log("Fehler beim überprüfen auf neue Artikel\n"+rndmUrl);
				}
			},
			onerror: function(response){
				//console.log("Fehler beim überprüfen auf neue Artikel");
			}
		});
	},300);
    setInterval(function(){
        var rndmUrl="http://www.rapupdate.de/"+cacheBreaker()+"/";
        setTimeout(function(){
			//console.log(rndmUrl);
			GM_xmlhttpRequest({
				method: "GET",
				url: rndmUrl,
				onload: function(response) {
					var ruApi = response.responseText;
					//console.log(ruApi);
					if (typeof ruApi != 'undefined'){
						var tempDiv = document.createElement('div');
						//console.log(ruApi);
						tempDiv.innerHTML = ruApi.replace(/<script(.|\s)*?\/script>/g, '');
						var li = $(tempDiv).find("#miniloops-2").find("li").get(0);
						var link = $(li).find("a").attr("href");
						//console.log(link);
						var url = encodeURI(link);
						var para = getParameterByName("t_u", location.href)
						//console.log(document.getElementsByClassName("articleWarning").length);
						if(link!=para && document.getElementsByClassName("articleWarning").length <=0){
							var newArticle = document.createElement ('div');
							newArticle.setAttribute("class","articleWarning");
							newArticle.setAttribute("id","articleWarning");
							newArticle.innerHTML = "Neuer Artikel";
							$("#posts").before(newArticle);
							$("#articleWarning").click(function(e){
								GM_openInTab(link,false);
								//console.log("Click");
							});
							if(articleNotification&&!GM_getValue("onceNotified")){
								GM_setValue("onceNotified",true);
								GM_notification("Neuer Artikel!","Rapupdate","https://lh3.googleusercontent.com/KRLdUry4tVh571_SDJRU9R6KfaOdnmdWcSIqhmG21KsmA9EdBeL9P7dlJB_HQw6Kqw=w300",function(){GM_openInTab(link,false);});
							}
							if(switchArticle)GM_openInTab(link,false);
						}
					}else{
						//console.log("Fehler beim überprüfen auf neue Artikel\n"+rndmUrl);
					}
				},
				onerror: function(response){
					//console.log("Fehler beim überprüfen auf neue Artikel");
				}
			});
		},300);
    },500);
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function urlBot(){
    var checkExistTextArea = setInterval(function() {
		$(".textarea").not(".cleared").unbind("keyup").keyup(function(e){
            clearUrl(this);
			clearWords(this);
            $(".textarea").addClass("cleared");
        });
	}, 1000);
}

function clearUrl(textArea){
    var expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    var regex = new RegExp(expression);
    if(textArea.innerHTML.match(regex)){
        var selectedText = getSelectedText();
        var savedSelection = saveSelection(textArea,0);
        textArea.innerHTML=textArea.innerHTML.replace(".net",".Net");
	textArea.innerHTML=textArea.innerHTML.replace(".ch",".Ch");
        textArea.innerHTML=textArea.innerHTML.replace(".com",".Com");
        textArea.innerHTML=textArea.innerHTML.replace(".de",".De");
        textArea.innerHTML=textArea.innerHTML.replace(".ru",".Ru");
        textArea.innerHTML=textArea.innerHTML.replace(".org",".Org");
        textArea.innerHTML=textArea.innerHTML.replace(".fr",".Fr");
        textArea.innerHTML=textArea.innerHTML.replace(".to",".To");
        textArea.innerHTML=textArea.innerHTML.replace(".js",".Js");
        restoreSelection(textArea, savedSelection);
        console.log("Link!");
    }
}

function clearWords(textArea){
    var expression = /(Mario|Nigga|mario|nigga|Nigger|nigger|Bimbo|bimbo|Harms|harms|Down|down|Rapdeutschland|rapdeutschland|#generischeFrontGenerator)/g;
    var regex = new RegExp(expression);
    if(textArea.innerHTML.match(regex)){
        var selectedText = getSelectedText();
        var savedSelection = saveSelection(textArea,0);
        textArea.innerHTML=textArea.innerHTML.replace("Mario","Mаrio");
        textArea.innerHTML=textArea.innerHTML.replace("Nigga","Niggа");
	textArea.innerHTML=textArea.innerHTML.replace("Nigger","Niggа");
	textArea.innerHTML=textArea.innerHTML.replace("nigger","Niggа");
	textArea.innerHTML=textArea.innerHTML.replace("mario","Mаrio");
        textArea.innerHTML=textArea.innerHTML.replace("nigga","Niggа");
	textArea.innerHTML=textArea.innerHTML.replace("bimbo","Вimbo");
	textArea.innerHTML=textArea.innerHTML.replace("Bimbo","Вimbo");
	textArea.innerHTML=textArea.innerHTML.replace("Harms","Hаrms");
	textArea.innerHTML=textArea.innerHTML.replace("harms","Hаrms");
	textArea.innerHTML=textArea.innerHTML.replace("Down","Dоwn");
	textArea.innerHTML=textArea.innerHTML.replace("down","dоwn");
	    textArea.innerHTML=textArea.innerHTML.replace("rapdeutschland","Rаpdeutschland");
	    textArea.innerHTML=textArea.innerHTML.replace("Rapdeutschland","Rаpdeutschland");
	if (document.getElementsByName("User Menu")[0].innerText.indexOf("RUCnntn") > -1 || document.getElementsByName("User Menu")[0].innerText.indexOf("RTC") > -1){
        	textArea.innerText=textArea.innerText.replace("#generischeFrontGenerator",generateFront(textArea));
	}
        restoreSelection(textArea, savedSelection);
        console.log("Mario/nignog");
    }
}

function setReplyOnclick(){
	var checkExistDisqus = setInterval(function() {
		var replies = document.getElementsByClassName("reply");
		for (var z = 0; z < replies.length; z++){
			if(!replies[z].classList.contains("edited")&&replies[z].classList.length==1&& replies[z].tagName=="LI"){
				replies[z].classList.add("edited");
				replies[z].addEventListener('click', addAdvancedEditor);
			}
		}
	}, 100);
}

function addAdvancedEditor(){
    var advanced = GM_getValue("advanced");
    if(advanced){
        setAdvancedEditorReply(this,advanced);
    }
}

function readComment(comment){
	var msg = new SpeechSynthesisUtterance(comment);
	window.speechSynthesis.speak(msg);
}

function setAdvancedEditor(advanced){
	var checkExistDisqus = setInterval(function() {
		console.log(document.getElementsByClassName("btn post-action__button"));
        if (document.getElementsByClassName("btn post-action__button").length > 0 && !document.getElementsByClassName("temp-post")[0].classList.contains("advanced") && document.getElementsByClassName("username").length>0) {
            console.log(document.getElementsByClassName("btn post-action__button"));
            if (advanced){
                    var sndButton = document.getElementsByClassName("btn post-action__button")[0];
                    var boldButton = document.createElement ('div');
                    boldButton.innerHTML='<a style="color:white;"><b>b</b></a>';
                    boldButton.setAttribute ('class', 'editBtn editBold btn post-action__button');
                    //
                    var textArea=document.getElementsByClassName("btn post-action__button")[0].parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0];
                    document.getElementsByClassName("temp-post")[0].appendChild(boldButton);
                    $(".editBold").click(function(e) {
                        createTag(textArea,"<b>","</b>");
                    });
                    var italicButton = document.createElement ('div');
                    italicButton.innerHTML='<a style="color:white;"><i>i</i></a>';
                    italicButton.setAttribute ('class', 'editBtn edititalic btn post-action__button');
                    //
                    document.getElementsByClassName("temp-post")[0].appendChild(italicButton);
                    $(".edititalic").click(function(e) {
                        createTag(textArea,"<i>","</i>");
                    });
                    var underButton = document.createElement ('div');
                    underButton.innerHTML='<a style="color:white;"><u>u</u></a>';
                    underButton.setAttribute ('class', 'editBtn editunder btn post-action__button');
                    //
                    document.getElementsByClassName("temp-post")[0].appendChild(underButton);
                    $(".editunder").click(function(e) {
                        createTag(textArea,"<u>","</u>");
                    });
                    var scribbleButton = document.createElement ('div');
                    scribbleButton.innerHTML='<a style="color:white;"><s>s</s></a>';
                    scribbleButton.setAttribute ('class', 'editBtn editscribble btn post-action__button');
                    //
                    document.getElementsByClassName("temp-post")[0].appendChild(scribbleButton);
                    $(".editscribble").click(function(e) {
                        createTag(textArea,"<s>","</s>");
                    });
                    var quoteButton = document.createElement ('div');
                    quoteButton.innerHTML='<a style="color:white;"><blockquote>„"</blockquote></a>';
                    quoteButton.setAttribute ('class', 'editBtn editquote btn post-action__button');
                    //
                    document.getElementsByClassName("temp-post")[0].appendChild(quoteButton);
                    $(".editquote").click(function(e) {
                        createTag(textArea,"<blockquote>","</blockquote>");
                    });
                    var spoilerButton = document.createElement ('div');
                    spoilerButton.innerHTML='<a style="color:white;"><spoiler>Spoiler</spoiler></a>';
                    spoilerButton.setAttribute ('class', 'editBtnBig editspoiler btn post-action__button');
                    //
                    document.getElementsByClassName("temp-post")[0].appendChild(spoilerButton);
                    $(".editspoiler").click(function(e) {
                        createTag(textArea,"<spoiler>","</spoiler>");
                    });
            }
			var smileyButton = document.createElement ('div');
			smileyButton.innerHTML='<a style="color:white;">&#128512;</a>';
			smileyButton.setAttribute ('class', 'editBtn editSmiley btn post-action__button');
			//
			document.getElementsByClassName("temp-post")[0].appendChild(smileyButton);
			$(".editSmiley").click(function(e) {
				openSmiley(this);
			});

			var makroButton = document.createElement ('div');
			makroButton.innerHTML='<a style="color:white;">Mkr</a>';
			makroButton.setAttribute ('class', 'editMain editBtn editMakro btn post-action__button');
			//
			document.getElementsByClassName("temp-post")[0].appendChild(makroButton);
			$(".editMakro").click(function(e) {
				openMakro(this);
			});

            $("button.post-action__button").unbind("click").click(function(){
				console.log("clicked");
				if ($(".MakroContainer").length){
					//console.log("Makro");
					$(".MakroContainer").remove();
				}
				if ($("#smileyContainer").length){
					//console.log("Smiley");
					$("#smileyContainer").remove()
				};
			});

			document.getElementsByClassName("temp-post")[0].classList.add("advanced");
            clearInterval(checkExistDisqus);
		}
	}, 1000);
}

function createSmileyDiv(hidden,caller,sibling){
    var smileyDiv = document.createElement ('div');
    smileyDiv.setAttribute ('id', 'smileyContainer');
    for (var i=0; i<=79;i++){
        var id=i+12;
        if (i%14==0 && i>0){
            smileyDiv.innerHTML += "<br>";
        }
        smileyDiv.innerHTML += "<span id='1285"+id+"' class='smiley'>&#1285"+id+";<span>";
    }
    if(sibling.classList.contains("nav-secondary")){
		sibling.after(smileyDiv);
	}else{
		sibling.before(smileyDiv);
	}
    $(".smiley").click(function(e) {
		insertSmiley(this.parentNode,caller,this);
	});
}

function removeSmileyDiv(){
	console.log("SmileyDiv wird gelöscht");
	var container = document.getElementById("smileyContainer");
	console.log(container);
	if (typeof container != "undefined" && container != null){
		document.getElementById("smileyContainer").remove();
	}
}

function insertSmiley(parent,caller,smiley){
    var textArea = $(caller).parent().parent().parent().parent().parent().find(".textarea").get(0);
	textArea.focus();
	var selectedText = getSelectedText();
    var aOffset=selectedText.anchorOffset;
    var fOffset=selectedText.focusOffset;
	if (selectedText.anchorOffset<selectedText.focusOffset && textArea.innerText.length>0){
        console.log("if");
        var savedSelection = saveSelection(textArea,9);
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);
		cacheText = cacheText.replace(selected,"&#"+smiley.id+";"+selected+"&#"+smiley.id+";");
		text=text+cacheText;
		textArea.innerText=text;
        restoreSelection(textArea, savedSelection);
        console.log(aOffset);
    }else if(textArea.innerText.length>0){
        console.log("if");
        var savedSelection = saveSelection(textArea,9);
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);
		cacheText = cacheText.replace(selected,selected+"&#"+smiley.id+";");
		text=text+cacheText;
		textArea.innerText=text;
        restoreSelection(textArea, savedSelection);
        console.log(aOffset);
	}else{
        console.log("Else");
        var selectedText = getSelectedText();
        var savedSelection = saveSelection(textArea,9);
		textArea.focus();
		textArea.innerText="&#"+smiley.id+";";
        restoreSelection(textArea, savedSelection);
	}
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
	var smileyContainer = document.getElementById("smileyContainer");
	if (typeof smileyContainer == "undefined" || smileyContainer == null){

	}else{
		removeSmileyDiv();
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
            makroDiv.innerHTML+= "<span id='"+i+"' class='snglMakroContainer'><img src='https://image.flaticon.com/icons/svg/25/25243.svg' class='downImageMakroFirst'>"+text+ "<img src='https://openclipart.org/download/226230/trash.svg' class='deleteImageMakro'><img src='http://img.freepik.com/freie-ikonen/schaltflache-bearbeiten_318-99688.jpg?size=338&ext=jpg' class='editImageMakro'><img src='http://download.seaicons.com/icons/icons8/windows-8/512/Editing-Paste-icon.png' class='insertImageMakro'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/U2713.svg/945px-U2713.svg.png' class='confirmImageMakro'></span><hr>";
        }else if (i==makros.length-1){
            makroDiv.innerHTML+= "<span id='"+i+"' class='snglMakroContainer'><img src='https://cdn3.iconfinder.com/data/icons/iconano-web-stuff/512/013-CaretUp-512.png' class='upImageMakroLast'>"+text+ "<img src='https://openclipart.org/download/226230/trash.svg' class='deleteImageMakro'><img src='http://img.freepik.com/freie-ikonen/schaltflache-bearbeiten_318-99688.jpg?size=338&ext=jpg' class='editImageMakro'><img src='http://download.seaicons.com/icons/icons8/windows-8/512/Editing-Paste-icon.png' class='insertImageMakro'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/U2713.svg/945px-U2713.svg.png' class='confirmImageMakro'></span><hr>";
        }else{
            makroDiv.innerHTML+= "<span id='"+i+"' class='snglMakroContainer'><img src='https://image.flaticon.com/icons/svg/25/25243.svg' class='downImageMakro'><img src='https://cdn3.iconfinder.com/data/icons/iconano-web-stuff/512/013-CaretUp-512.png' class='upImageMakro'>"+text+ "<img src='https://openclipart.org/download/226230/trash.svg' class='deleteImageMakro'><img src='http://img.freepik.com/freie-ikonen/schaltflache-bearbeiten_318-99688.jpg?size=338&ext=jpg' class='editImageMakro'><img src='http://download.seaicons.com/icons/icons8/windows-8/512/Editing-Paste-icon.png' class='insertImageMakro'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/U2713.svg/945px-U2713.svg.png' class='confirmImageMakro'></span><hr>";
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
    $(".insertImageMakro").click(function(e) {
		insertMakro(this.parentNode,caller,sibling);
	});
    $("button.post-action__button").unbind("click").click(function(){
				console.log("clicked");
				if ($(".MakroContainer").length){
					//console.log("Makro");
					$(".MakroContainer").remove();
				}
				if ($("#smileyContainer").length){
					//console.log("Smiley");
					$("#smileyContainer").remove()
				};
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

function openSmiley(caller){
	var container = document.getElementById("smileyContainer");
	var makroContainer = document.getElementById("MakroContainer");
	console.log(container);
	if (typeof container == "undefined" || container == null){
		if(caller.classList.contains("editMain")){
			createSmileyDiv(false,caller,document.getElementsByClassName("nav-secondary")[0]);
		}else{
			createSmileyDiv(false,caller,caller.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
		}
		console.log("Creating Smiley Div");

	}else{
		var isMain = container.parentNode.id == "conversation";
		if (caller.classList.contains("editMain")&&!isMain){
			removeSmileyDiv();
			openSmiley(caller);
		}else{
			removeSmileyDiv();
		}
	}
	if (typeof makroContainer == "undefined" || makroContainer == null){

	}else{
		removeMakroDiv();
	}
}

function createEdit(parent,caller,sibling){
    var makros = getGMArray("makros");
    var editDiv = document.createElement ('div');
    editDiv.setAttribute ('id', 'editContainer');
    editDiv.innerHTML="<textarea id='editText' rows='4' cols='50'>"+makros[$(parent).closest(".snglMakroContainer").get(0).id]+"</textarea>";
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
	textarea.innerHTML=makros[$(parent).closest(".snglMakroContainer").get(0).id];
	console.log("Textarea:" + textarea.innerHTML);
	$(caller).parent().parent().parent().parent().parent().find(".btn.post-action__button").get(0).click();
	//removeMakroDiv();
}

function insertMakro(parent,caller){
	var makros = getGMArray("makros");
	var textarea = $(caller).parent().parent().parent().parent().parent().find(".textarea").get(0);
	console.log($(parent).get(0));
	textarea.innerText =makros[$(parent).closest(".snglMakroContainer").get(0).id].replace(/(?:<br \/>)/g,'\n' );
	console.log("Textarea:" + textarea.innerText);
    textarea.focus();
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

function createTag(element,tag,endTag){
    var textArea = element;
	textArea.focus();
	var selectedText = getSelectedText();
	console.log(selectedText.anchorOffset+11);
    var aOffset=selectedText.anchorOffset;
    var fOffset=selectedText.focusOffset;
	if (selectedText.anchorOffset<selectedText.focusOffset || textArea.innerText.length>0){
        var savedSelection = saveSelection(textArea,tag.length);
		var selected = textArea.innerText.substr(selectedText.anchorOffset,selectedText.focusOffset-selectedText.anchorOffset);
		console.log(selected);
		var text = textArea.innerText;
		var cacheText = text.slice(selectedText.anchorOffset);
		text = text.slice(0,selectedText.anchorOffset);
		cacheText = cacheText.replace(selected,tag+selected+endTag);
		text=text+cacheText;
		textArea.innerText=text;
        restoreSelection(textArea, savedSelection);
        console.log(aOffset);
	}else{
        var selectedText = getSelectedText();
        var savedSelection = saveSelection(textArea,tag.length);
		textArea.focus();
		textArea.innerText=tag+endTag;
        restoreSelection(textArea, savedSelection);
	}
}



function setAdvancedEditorReply(link,advanced){
	setTimeout(function(){
		removeMakroDiv();
        removeSmileyDiv();
		var container = $(link).parent().parent().parent().parent();
		console.log(container.get(0));
		var div = container.find(".temp-post");
		console.log(div);
		div = div.get(0);
		console.log(typeof div);
		//var checkExist = setInterval(function() {
		console.log("Type: "+typeof div);
		if (typeof div == "object" && !div.classList.contains("advanced")) {
            if(advanced){
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
                $(".editBoldReply").click(function(e) {
				createTag(this.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0],"<b>","</b>");
                });
                console.log("Italic " + div);
                div.appendChild(italicButton);
                $(".edititalicReply").click(function(e) {
                    createTag(this.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0],"<i>","</i>");
                });
                div.appendChild(underButton);
                $(".editunderReply").click(function(e) {
                    createTag(this.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0],"<u>","</u>");
                });
                div.appendChild(scribbleButton);
                $(".editscribbleReply").click(function(e) {
                    createTag(this.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByClassName("textarea")[0],"<s>","</s>");
                });
            }
            var smileyButton = document.createElement ('div');
			smileyButton.innerHTML='<a style="color:white;">&#128512;</a>';
			smileyButton.setAttribute ('class', 'editBtn editSmileyReply btn post-action__button');
			//

			var makroButton = document.createElement ('div');
			makroButton.innerHTML='<a style="color:white;">Mkr</a>';
			makroButton.setAttribute ('class', 'editBtn editMakroReply btn post-action__button');			
            div.appendChild(smileyButton);
            $(".editSmileyReply").click(function(e) {
				openSmiley(this);
			});
			div.appendChild(makroButton);
			$(".editMakroReply").click(function(e) {
				openMakro(this);
			});
			$("button.post-action__button").unbind("click").click(function(){
				console.log("clicked");
				if ($(".MakroContainer").length){
					//console.log("Makro");
					$(".MakroContainer").remove();
				}
				if ($("#smileyContainer").length){
					//console.log("Smiley");
					$("#smileyContainer").remove()
				};
			});
			div.classList.add("advanced");
			//       clearInterval(checkExist);
		}
		//}, 100);
	},10);
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
	var blacklistClan = getGMArray("blacklistClan");
	var whitelist = getGMArray("whitelist");
	var whitelistClan = getGMArray("whitelistClan");
	var mode = GM_getValue("hakMode");
	console.log("Mode:"+mode)
	if(typeof blacklist == 'undefined' || blacklist.length<=0) {
		setGMArray("blacklist",[]);
		blacklist = getGMArray("blacklist");
		console.log("Blacklist reset");
	}else{
		console.log("Blacklist: "+blacklist);
	}
	if(typeof whitelist == 'undefined' || whitelist.length<=0) {
		setGMArray("whitelist",[]);
		blacklist = getGMArray("whitelist");
		console.log("Whitelist reset");
	}else{
		console.log("Whitelist: "+whitelist);
	}

    if(typeof blacklistClan == 'undefined' || blacklistClan.length<=0){
        setGMArray("blacklistClan",[]);
        blacklistClan = getGMArray("blacklistClan");
        console.log("Blacklist Clan reset");
    }else{
        console.log("BlacklistClan: "+blacklistClan);
    }

	if(typeof whitelistClan == 'undefined' || whitelistClan.length<=0){
        setGMArray("whitelistClan",[]);
        blacklistClan = getGMArray("whitelistClan");
        console.log("Whitelist Clan reset");
    }else{
        console.log("WhitelistClan: "+whitelistClan);
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
			var blacklist = getGMArray("blacklist");
			var blacklistClan = getGMArray("blacklistClan");
			var whitelist = getGMArray("whitelist");
			var whitelistClan = getGMArray("whitelistClan");
            var blacklistDiv = document.createElement ('div');

            blacklistDiv.setAttribute ('id', 'BlacklistContainer');
			blacklistDiv.innerHTML = blacklistDiv.innerHTML + '<details id="settings"><summary>Bot Einstellungen</summary></details>';
            setTimeout(function(){
				//blacklistDiv.setAttribute ('style', 'display:none');
				console.log("Mode timeout:"+mode)
				if(mode=="blacklist"){
					blacklistDiv.innerHTML += '<hr><br><details id="blacklistSettings"><summary>Blacklist Einstellungen</summary></details>';
				}else{
					blacklistDiv.innerHTML += '<hr><br><details id="whitelistSettings"><summary>Whitelist Einstellungen</summary></details>';

				}

                document.getElementsByClassName("nav nav-secondary")[0].after(blacklistDiv);
				if (mode=="blacklist"){
					var settings=document.getElementById("blacklistSettings");
					settings.innerHTML = settings.innerHTML + '<br><h4 title="User die hier drauf stehen können über das Dropdown im Kommentar hinzugefügt/entfernt werden">Blacklisted Disqus ID: </h4>'
					settings.innerHTML = settings.innerHTML + '<ol>';
					for (var i = 0; i<blacklist.length; i++){
						settings.innerHTML = settings.innerHTML + "<li><a data-dsq-mention=\""+blacklist[i]+":disqus\" href=\"https://disqus.com/by/"+blacklist[i]+"/\" rel=\"nofollow noopener\" Data-action=\"profile\" data=\""+blacklist[i]+"\">@" + blacklist[i] + "</a><img src='https://openclipart.org/download/226230/trash.svg' class='deleteImage disqusId'></li><hr>";
					}
					settings.innerHTML = settings.innerHTML + '</ol>';
					settings.innerHTML = settings.innerHTML + '<br><h4 title="Per Click auf den Namen/Clan in dieser Liste können User entfernt werden. Hinzugefügt wird über das Formular unten!">Blacklisted Clans/Names: </h4><hr>';
					settings.innerHTML = settings.innerHTML + '<div id="blacklistClanList">';
					settings.innerHTML = settings.innerHTML + '</div><br>';
					settings.innerHTML = settings.innerHTML + '<input type="text" placeholder="Namepattern einfügen" id="newBlockedClan"></input><input id="addToClanBlacklist" type="button" value="Auf Blacklist" style="margin:20px"></input>';

					var blacklistClanLi=document.getElementById("blacklistClanList");
					for (var i = 0; i<blacklistClan.length; i++){
						var blacklistClanLis = document.createElement ('li');
						blacklistClanLis.innerHTML = blacklistClan[i] + "<img src='https://openclipart.org/download/226230/trash.svg' class='deleteImage'><hr>";
						blacklistClanLis.setAttribute ('style', 'cursor:pointer;');
						blacklistClanLi.appendChild(blacklistClanLis);
					}




				}else{
					var settings=document.getElementById("whitelistSettings");
					settings.innerHTML = settings.innerHTML + '<br><h4 title="User die hier drauf stehen können über das Dropdown im Kommentar hinzugefügt/entfernt werden">Whitelisted Disqus ID: </h4><ol>';
					for (var i = 0; i<whitelist.length; i++){
						settings.innerHTML = settings.innerHTML + "<li><a data-dsq-mention=\""+whitelist[i]+":disqus\" href=\"https://disqus.com/by/"+whitelist[i]+"/\" rel=\"nofollow noopener\" Data-action=\"profile\" data=\""+whitelist[i]+"\">@" + whitelist[i] + "</a><img src='https://openclipart.org/download/226230/trash.svg' class='deleteImage disqusId'></li><hr>";
					}
					settings.innerHTML = settings.innerHTML + '</ol>';
					settings.innerHTML = settings.innerHTML + '<br><h4 title="Per Click auf den Namen/Clan in dieser Liste können User entfernt werden. Hinzugefügt wird über das Formular unten!">Whitelisted Clans/Names: </h4><hr>';
					settings.innerHTML = settings.innerHTML + '<div id="whitelistClanList">';
					settings.innerHTML = settings.innerHTML + '</div><br>';

					settings.innerHTML = settings.innerHTML + '<input type="text" placeholder="Namepattern einfügen" id="newWhitelistedClan"></input><input id="addToClanWhitelist" type="button" value="Auf Whitelist" style="margin:20px"></input>';
					var blacklistClanLi=document.getElementById("whitelistClanList");
					for (var i = 0; i<whitelistClan.length; i++){
						var blacklistClanLis = document.createElement ('li');
						blacklistClanLis.innerHTML = whitelistClan[i] + "<img src='https://openclipart.org/download/226230/trash.svg' class='deleteImage'><hr>";
						blacklistClanLis.setAttribute ('style', 'cursor:pointer;');
						blacklistClanLi.appendChild(blacklistClanLis);
					}




				}
				var fakeLinks = GM_getValue("checkLinks");
				var answerHak = GM_getValue("answerHak");
                var loadComments = GM_getValue("loadComments");
                var loadSubcomments = GM_getValue("loadSubcomments");
                var natural = GM_getValue("natural");
                var reload = GM_getValue("reload");
                var clearUrl = GM_getValue("clearUrl");
                var reloadTime = GM_getValue("reloadTime");
				var checkArticle = GM_getValue("checkArticle");
				var articleNotification = GM_getValue("articleNotification");
				var switchArticle = GM_getValue("switchArticle");
				var fastSend = GM_getValue("fastSend");
				var quaffles = GM_getValue("quaffles");
				var showDownvotes = GM_getValue("showDownvotes");
				var embedImages = GM_getValue("embedImages");
				var askDisqus = GM_getValue("askDisqus");
				var showQuote = GM_getValue("showQuote");
				var hideRecommend = GM_getValue("hideRecommend");
                var embedYoutube = GM_getValue("embedYoutube");
                var comment = GM_getValue("comment");
                var advanced = GM_getValue("advanced");
                var hideSocial = GM_getValue("hideSocial");

                reloadTime=reloadTime/60/1000;
                console.log("!!!Hide Social "+hideSocial);
                if(hideSocial){
					var boxStatusHideSocial = "checked";
				}else{
					var boxStatusHideSocial = "";
				}
                if(advanced){
					var boxStatusAdvanced = "checked";
				}else{
					var boxStatusAdvanced = "";
				}
                if(embedYoutube){
					var boxStatusYoutube = "checked";
				}else{
					var boxStatusYoutube = "";
				}
				if(hideRecommend){
					var boxStatusRecommend = "checked";
				}else{
					var boxStatusRecommend = "";
				}
				if(askDisqus){
					var boxStatusDisqus = "checked";
				}else{
					var boxStatusDisqus = "";
				}


				if(showQuote){
					var boxStatusQuote = "checked";
				}else{
					var boxStatusQuote = "";
				}

				if(switchArticle){
					var boxStatusSwitch = "checked";
				}else{
					var boxStatusSwitch = "";
				}

				if (showDownvotes){
					var boxStatusDownvotes = "checked";
				}else{
					var boxStatusDownvotes = "";
				}

				if(quaffles){
					var boxStatusQuaffles = "checked";
				}else{
					var boxStatusQuaffles = "";
				}


				if(answerHak){
					var boxStatusAnswer = "checked";
				}else{
					var boxStatusAnswer = "";
				}
				if(embedImages){
					var boxStatusEmbed = "checked";
				}else{
					var boxStatusEmbed = "";
				}

				if(fastSend){
					var boxStatusFastSend = "checked";
				}else{
					var boxStatusFastSend = "";
				}

                if(loadComments){
					var boxStatusComments = "checked";
				}else{
					var boxStatusComments = "";
				}
				if(articleNotification){
					var boxStatusNotify = "checked";
				}else{
					var boxStatusNotify = "";
				}
				if(checkArticle){
					var boxStatusArticle = "checked";
				}else{
					var boxStatusArticle = "";
					boxStatusNotify+=" disabled";
					boxStatusSwitch+=" disabled";
				}
                if(comment){
					var boxStatusComment = "checked";
				}else{
					var boxStatusComment = "";
                    boxStatusEmbed += " disabled";
                    boxStatusYoutube += " disabled";
				}
                if(clearUrl){
					var boxStatusUrl = "checked";
				}else{
					var boxStatusUrl = "";
				}
                if(loadSubcomments){
					var boxStatusSubComments = "checked";
				}else{
					var boxStatusSubComments = "";
				}
                if(natural){
					var boxStatusNatural = "checked";
				}else{
					var boxStatusNatural = "";
				}
                if(reload){
					var boxStatusReload = "checked";
				}else{
					var boxStatusReload = "";
				}
				if(fakeLinks){
					var boxStatus = "checked";
				}else{
					var boxStatus = "";
				}
				document.getElementById("settings").innerHTML += '<br><a class="dropdown-toggle"  title="Wenn natürlicher Modus an ist, werden bis zu 2 Minuten auf diesen Wert raufgerechnet"><span class="label helper">HakBot Modus: </span><select id="hakMode"><option value="blacklist">Blacklist Modus</option><option value="whitelist">Whitelist Modus</option></select></a><br><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Was interessiert mich Rap, ich will Grinden"><input type="checkbox" id="askDisqus" '+boxStatusDisqus+'><span class="label helper">Fullgrind - Disqusthread Only anfragen</span></a><br>';
                document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="RU auf Speed - Kommentare nachladen"><input type="checkbox" id="loadComments" '+boxStatusComments+'><span class="label helper">Kommentare automatisch laden</span></a><br>';
                document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="RU auf Meth - Kommentarantworten nachladen"><input type="checkbox" id="loadSubcomments" '+boxStatusSubComments+'><span class="label helper">Kommentarantworten automatisch laden</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Ich hasse Diskussionen, ich hasse Antworten, das ist kein Upvote Wert!"><input type="checkbox" id="answerHak" '+boxStatusAnswer+'><span class="label helper">Hak an Kommentarantworten verteilen oder nicht</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Ufff, warum ist mein Topkommi unten, zeig mal jetzt Downvotes du Hurensohn!"><input type="checkbox" id="showDownvotes" '+boxStatusDownvotes+'><span class="label helper">Downvote Zähler anzeigen (Beta)</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Digger Spam mal nicht Empfehlen Button!"><input type="checkbox" id="hideRecommend" '+boxStatusRecommend+'><span class="label helper">Empfehlen ausblenden</span></a><br>';
                document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Digger ich teile den Scheiß nicht!"><input type="checkbox" id="hideSocial" '+boxStatusHideSocial+'><span class="label helper">Social Media ausblenden</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Fast Send - Schneller Spammen, einfach Enter Drücken"><input type="checkbox" id="fastSend" '+boxStatusFastSend+'><span class="label helper">Fast Send - Enter zum Abschicken von Comments, Shift Enter für neue Zeile</span></a><br>';
                document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Sneaky Peaky - Zufallszeiten bei Clicks um Menschlich zu wirken"><input type="checkbox" id="natural" '+boxStatusNatural+'><span class="label helper">Natürlicher Modus - zufällige Klickzeiten</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Nie wieder auf Fake RU-Links reinfallen!"><input type="checkbox" id="fakeBot" '+boxStatus+'><span class="label helper">FakeLinks hervorheben (Benötigt XMLHTTP-Requests)</span></a><br>';
                document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Lass mal jetzt die comments in Ruhe!"><input type="checkbox" id="comment" '+boxStatusComment+'><span class="label helper">Sollen die Kommentare geparst werden? (Benötigt für: Youtube und Bilder einbettung und Links Clickbar machen)</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Bunte Bilder im Feed sind schon schön <3"><input type="checkbox" id="embedImages" '+boxStatusEmbed+'><span class="label helper">Bilder automatisch einbetten</span></a><br>';
                document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Dance zu Musik und Videos ausm Grind"><input type="checkbox" id="embedYoutube" '+boxStatusYoutube+'><span class="label helper">Youtube automatisch einbetten</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Poste nur wenn Quote gut ist!"><input type="checkbox" id="showQuote" '+boxStatusQuote+'><span class="label helper">Hakquote anzeigen</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Persönlicher Fetisch"><input type="checkbox" id="quafflesBot" '+boxStatusQuaffles+'><span class="label helper">Darth Qualli Waffles Profilbild auf altes Tony D Bild ändern</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Nie wieder zu spät zur Party!"><input type="checkbox" id="checkArticle" '+boxStatusArticle+'><span class="label helper">Auf neue Artikel checken (Benötigt XMLHTTP-Requests)</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Weck mich auf wenn neuer Artikel du hont!"><input type="checkbox" id="notifyArticle" '+boxStatusNotify+'><span class="label helper">Benachrichtigung wenn ein neuer Artikel vorhanden ist (Benötigt Auf neue Artikel checken!)</span></a><br>';
				document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Zack und rüber mit mir!"><input type="checkbox" id="switchArticle" '+boxStatusSwitch+'><span class="label helper">Automatisch auf neuen Artikel wechseln (Benötigt Auf neue Artikel checken!)</span></a><br>';
                document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Verlinkungen endlich wieder einfach nur eintippen... Puh wie geil ist das denn?"><input type="checkbox" id="clearUrl" '+boxStatusUrl+'><span class="label helper">URLs in Postfähige Form verwandeln</span></a><br>';
                document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Erweitere Editor Einblenden, sollte nach letztem Disqus Update nicht mehr nötig sein"><input type="checkbox" id="advanced" '+boxStatusAdvanced+'><span class="label helper">Advanced Editor einblenden</span></a><br>';
                document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Es nervt manchmal, aber glaubt mir es ist zu eurem Besten"><input type="checkbox" id="reloadBot" '+boxStatusReload+'><span class="label helper">Reload Bot - Lädt Disqus automatisch neu (Empfohlen!)</span></a><br>';
                document.getElementById("settings").innerHTML += '<a class="dropdown-toggle"  title="Wenn natürlicher Modus an ist, werden bis zu 2 Minuten auf diesen Wert raufgerechnet"><span class="label helper">Reload Interval (In Minuten): </span><input type="Number" id="reloadTime" value="'+reloadTime+'" min="1" max="60"></input><input id="setReloadTime" type="button" value="Speichern" style="margin:20px"></input></a><br>';


				blacklistDiv.innerHTML += '<hr><br><h3>Über den Hakbot</h3>';
				blacklistDiv.innerHTML += '<i>Version: '+GM_info["script"]["version"]+'</i><br>';
				blacklistDiv.innerHTML += '<i>Autor: <a href="https://disqus.com/by/HotLove666/">Anis Fencheltee</a></i><br>';
				blacklistDiv.innerHTML += '<i>Readme: <a href="https://github.com/rapupdate/AnisHakbot/blob/master/README.md">Klick hier</i><br>';
				blacklistDiv.innerHTML += '<i>Probleme oder Wünsche? <a href="https://github.com/rapupdate/AnisHakbot/issues">Klick hier</i><br><br>';
				$('#hakMode').val(mode).change();
                $("#comment").click(function(e){
					toggleSetting(this,"comment");
				});

				$("#hakMode").change(function(e){
					GM_setValue("hakMode",this.value);
					location.reload();
				});
                $("#hideSocial").change(function(e){
                    toggleSetting(this,"hideSocial");
				});

                $("#advanced").change(function(e){
                    toggleSetting(this,"advanced");
				});
                $("#embedYoutube").click(function(e){
					toggleSetting(this,"embedYoutube");
				});

				$("#switchArticle").click(function(e){
					toggleSetting(this,"switchArticle");
				});

				$("#hideRecommend").click(function(e){
					toggleSetting(this,"hideRecommend");
				});

				$("#showQuote").click(function(e){
					toggleSetting(this,"showQuote");
				});
				$("#askDisqus").click(function(e){
					toggleSetting(this,"askDisqus");
				});

				$("#embedImages").click(function(e){
					toggleSetting(this,"embedImages");
				});

				$("#showDownvotes").click(function(e){
					toggleSetting(this,"showDownvotes");
				});

				$("#answerHak").click(function(e){
					toggleSetting(this,"answerHak");
				});

				$("#notifyArticle").click(function(e){
					toggleSetting(this,"articleNotification");
				});
				$("#fakeBot").click(function(e){
					toggleSetting(this,"checkLinks");
				});
				$("#quafflesBot").click(function(e){
					toggleSetting(this,"quaffles");
				});

				$("#fastSend").click(function(e){
					toggleSetting(this,"fastSend");
				});

                $("#reloadBot").click(function(e){
					toggleReloadBot(this);
				});
                $("#clearUrl").click(function(e){
					toggleSetting(this,"clearUrl");
				});
				$("#checkArticle").click(function(e){
					toggleSetting(this,"checkArticle");
				});
                $("#setReloadTime").click(function(e){
					setReloadTime(document.getElementById("reloadTime").value);
				});
                $("#loadComments").click(function(e){
					toggleSetting(this,"loadComments");
				});
                $("#loadSubcomments").click(function(e){
					toggleSetting(this,"loadSubcomments");
				});
                $("#natural").click(function(e){
					toggleSetting(this,"natural");
				});
				if(mode=="blacklist"){
					$(".deleteImage.disqusId").click(function(e){
						removeBlacklist(this);
					});
				}else{
				   $(".deleteImage.disqusId").click(function(e){
					removeWhitelist(this);
			       });
				}
                $("#BlacklistContainer").hide();
				$('details summary').each(function(){
					$(this).nextAll().wrapAll('<div id="wrap"></div>');
				});
				$('details').attr('open','').find('#wrap').css('display','none');
				$('details summary').click(function(e) {
					e.preventDefault();
					$(this).siblings('div#wrap').slideToggle(function(){
						$(this).parent('details').toggleClass('open');
					});
				});
				console.log("")
				if (mode=="blacklist"){
					var addClanBlacklist = document.getElementById("addToClanBlacklist");
					var blacklistClanLi=document.getElementById("blacklistClanList");
					console.log(addClanBlacklist);
					addClanBlacklist.addEventListener('click', addToClanBlacklist);
					if (typeof blacklistClanLi!="undefined" || blacklistClanLi.length>-1){
						blacklistClanLi.childNodes.forEach(function(li){
							console.log(li);
							li.addEventListener('click', removeFromClanListOnClick);
						});
					}
				}else{
					var addClanBlacklist = document.getElementById("addToClanWhitelist");
					var blacklistClanLi=document.getElementById("whitelistClanList");
					console.log("Whitelist:" + blacklistClanLi);
					addClanBlacklist.addEventListener('click', addToClanWhitelist);
					if (typeof blacklistClanLi!="undefined" || blacklistClanLi.length>-1){
						blacklistClanLi.childNodes.forEach(function(li){
							console.log(li);
							li.addEventListener('click', removeFromWhitelistClanListOnClick);
						});
					}
				}

            },1000);

            //=======================================================
            //=======================================================
            //Sets Blacklist Button
            //=======================================================
            setTimeout(function(){
				console.log("mode Button:"+mode);
				if(mode=="blacklist"){
					addBlacklistButton();
					//addTTSButton();
				}else{
					console.log("AddWhitelistButton");
					addWhitelistButton();
					//addTTSButton();
				}
            },2000);
            clearInterval(checkExistDisqus);
            //=======================================================
            //Sets Toggle Einstellungs Button
            //=======================================================
            var blacklistButton = document.createElement ('li');
            blacklistButton.innerHTML = '<a class="dropdown-toggle" style="cursor: pointer;" title="Öffnet die Konfigurationsseite für die RU-Toolbox"><span class="label">►Einstellungen</span></a>';
            blacklistButton.setAttribute ('id', 'blacklistToggle');
            blacklistButton.setAttribute ('class', 'nav-tab nav-tab--secondary dropdown sorting pull-right');
            blacklistButton.addEventListener('click', function(){toggleBlacklistContainer(this)});
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

function setReloadTime(time){
    if (time > 60){
        alert("Die Maximalzeit ist 60 Minuten, der Wert wird angepasst");
        time = 60;
    }
    time=time*1000*60;
	GM_setValue('reloadTime',time);
	location.reload();
}

function toggleSetting(box,setting){
	GM_setValue(setting,box.checked);
	location.reload();
}

function toggleReloadBot(box){
    var reload = GM_getValue("reload");
    if(reload){
        if(confirm("Sind Sie sicher das der Bot ausgeschaltet werden soll, dies wird nicht empfohlen!")){
            GM_setValue('reload',box.checked);
            location.reload();
        }
    }else{
        GM_setValue('reload',box.checked);
        location.reload();
    }
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

function removeWhitelist(image){
	var container=image.parentNode;
	console.log(container.firstChild.href);
    var link =  container.firstChild.href;
	console.log(link);
    var blacklist = getGMArray("whitelist");
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
    setGMArray("whitelist",blacklist);
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

function addToClanWhitelist(){
    var blacklistClan = getGMArray("whitelistClan");
    if(blacklistClan.indexOf(document.getElementById("newWhitelistedClan").value)>-1){
        alert("Der Clan steht bereits auf der Blacklist");
    }else{
        var input = document.getElementById("newWhitelistedClan").value;
        if (input==null || input=="")
        {
            alert("Bitte einen Clan oder Namen eingeben!");
            return false;
        }
        blacklistClan.push(document.getElementById("newWhitelistedClan").value);
        setGMArray("whitelistClan",blacklistClan);
        location.reload();
    }
}
//=======================================================
//=======================================================
//Shows and Hides the Blacklist Container
//=======================================================
function toggleBlacklistContainer(caller){
	console.log($(caller).find("span").get(0).innerHTML.indexOf("►"));
	if ($(caller).find("span").get(0).innerHTML.indexOf("►")>-1) setTimeout(function(){$(caller).find("span").get(0).innerHTML = $(caller).find("span").get(0).innerHTML.replace("►","▼");},400);
	else $(caller).find("span").get(0).innerHTML = $(caller).find("span").get(0).innerHTML.replace("▼","►");
    var container = $("#BlacklistContainer");
    container.slideToggle();

}
//=======================================================
//=======================================================
//Removes a Clan or a Namepattern from the Whitelist/Blacklist
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

function removeFromWhitelistClanList(){
    var blacklistClan = getGMArray("whitelistClan");
    for(var i=0; i<blacklistClan.length; i++){
        if(blacklistClan[i].indexOf(document.getElementById("newBlockedClan").value)>-1){
            blacklistClan.splice(i, 1);
            console.log("Freigeschaltet: "+whitelistClanClan[i]);
        }
    }
    setGMArray("whitelistClan",blacklistClan);
    location.reload();
}
//=======================================================
//=======================================================
//Removes a Clan or a Namepattern from the Whitelist/Blacklist Onclick Event
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

function removeFromWhitelistClanListOnClick(evt){
    var blacklistClan = getGMArray("whitelistClan");
    for(var i=0; i<blacklistClan.length; i++){
        if(blacklistClan[i].indexOf(this.innerText.substr(0,document.getElementById("whitelistClanList").childNodes[0].innerText.length-1))>-1){
            blacklistClan.splice(i, 1);
        }
    }
    if(confirm("Soll User/Clan \""+this.innerText.substr(0,document.getElementById("whitelistClanList").childNodes[0].innerText.length-1)+"\" von der Whitelist genommen werden?")){
        setGMArray("whitelistClan",blacklistClan);
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
	console.log("BlacklistButtonAdding")
    for (var i=1;i<dropdowns.length;i++){
        var blacklistUser = document.createElement ('li');
        if (dropdowns[i].classList.length==1){
            var comment = dropdowns[i].parentNode.parentNode.parentNode.parentNode;
            var link=$(comment).find(".post-byline").find(".author.publisher-anchor-color").find("a").get(0);
            if(typeof link != "undefined"){
                link=link.href;
                //console.log(link);
                if (blacklist.length>0){
                    for(var j=0; j<blacklist.length; j++){
                        if(link.indexOf(blacklist[j])>-1){
                            blacklistUser.innerHTML = '<a style="cursor: pointer;">Benutzer von Blacklist entfernen</a>';
                            break;
                        }else{
                            blacklistUser.innerHTML = '<a style="cursor: pointer;">Benutzer auf Blacklist</a>';
                        }
                    }
                }else{
                    blacklistUser.innerHTML = '<a style="cursor: pointer;">Benutzer auf Blacklist</a>';
                }
                blacklistUser.addEventListener('click', toggleBlacklist);
                dropdowns[i].append(blacklistUser);
                addTTSButton(dropdowns[i]);
                dropdowns[i].classList.add("done");
                //console.log("Erledigt");
            }
        }
    }
}

function addWhitelistButton(){
    var dropdowns=document.getElementsByClassName("dropdown-menu");
    var userDropdowns=[];
    var whitelist = getGMArray("whitelist");
	console.log("WhitelistButtonAdding")
	console.log(dropdowns)
    for (var i=1;i<dropdowns.length;i++){
        var blacklistUser = document.createElement ('li');
        if (dropdowns[i].classList.length==1){
            var comment = dropdowns[i].parentNode.parentNode.parentNode.parentNode;
            var link=$(comment).find(".post-byline").find(".author.publisher-anchor-color").find("a").get(0);
            if(typeof link != "undefined"){
                link=link.href;
                console.log(link);
                console.log(whitelist);
                if (whitelist.length>0){
                    for(var j=0; j<whitelist.length; j++){
                        if(link.indexOf(whitelist[j])>-1){
                            blacklistUser.innerHTML = '<a style="cursor: pointer;">Benutzer von Whitelist entfernen</a>';
                            break;
                        }else{
                            blacklistUser.innerHTML = '<a style="cursor: pointer;">Benutzer auf Whitelist</a>';
                        }
                    }
                }else{
                    blacklistUser.innerHTML = '<a style="cursor: pointer;">Benutzer auf Whitelist</a>';
                }
                blacklistUser.addEventListener('click', toggleWhitelist);
                console.log(blacklistUser);
                dropdowns[i].append(blacklistUser);
                addTTSButton(dropdowns[i]);
                dropdowns[i].classList.add("done");
                //console.log("Erledigt");
            }
        }
    }
}

function addTTSButton(container){
	var ttsButton = document.createElement ('li');
	//console.log(link);
	ttsButton.innerHTML = '<a style="cursor: pointer;">Kommentar vorlesen</a>';
	ttsButton.addEventListener('click', startTTS);
	container.append(ttsButton);
	//dropdowns[i].classList.add("ttsAdded");
	//console.log("Erledigt");



}

function startTTS(){
	var comment = $(this).parents(".post-content").find(".post-message").text();
	window.speechSynthesis.cancel()
	console.log(comment);
	var voice = new SpeechSynthesisUtterance(comment);
	speechUtteranceChunker(voice, {
    chunkLength: 120
	}, function () {
		//some code to execute when done
		console.log('done');
	});
}

//Helper Function TTS
var speechUtteranceChunker = function (utt, settings, callback) {
    settings = settings || {};
    var newUtt;
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
        newUtt = utt;
        newUtt.text = txt;
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
            }
            if (callback !== undefined) {
                callback();
            }
        });
    }
    else {
        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);

        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        newUtt = new SpeechSynthesisUtterance(chunk);
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        });
    }

    if (settings.modifier) {
        settings.modifier(newUtt);
    }
    console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    setTimeout(function () {
        speechSynthesis.speak(newUtt);
    }, 0);
};

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

function toggleWhitelist(evt){
    var container=this.parentNode.parentNode.parentNode.parentNode.parentNode;
    var header= container.getElementsByTagName("header")[0];
    var link =  header.getElementsByTagName("a")[0].href;
    var whitelist = getGMArray("whitelist");
    console.log("Whitelist: "+ whitelist);
    var remove=false;
    for(var i=0; i<whitelist.length; i++){
        console.log(whitelist[i]);
        if(link.indexOf(whitelist[i])>-1){
            console.log("Freigeschaltet: "+whitelist[i]);
            whitelist.splice(i, 1);
            remove=true;
        }
    }
    if(!remove){
        var disqusID= link.substr(0,link.lastIndexOf("/"));
        disqusID= disqusID.substr(disqusID.lastIndexOf("/")+1);
        whitelist.push(disqusID);
        console.log("Gesperrt: "+whitelist[i]);
    }
    console.log("Whitelist: "+ whitelist);
    setGMArray("whitelist",whitelist);
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
    giveHak();
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
function myLoop (upvoteLinks,i) {
    //  create a loop function
    var natural = GM_getValue("natural");
	var mode = GM_getValue("hakMode");
	var loading = GM_getValue("loading");
    var duration = Math.random();
    duration = duration * 1000;
    if (duration < 650){
        duration = duration + 600;
    }
    if(!natural)duration = 1000;
	//console.log(loading);
	if(!loading){
	   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
		   if(upvoteLinks.length > 0){
			if (upvoteLinks[i].classList.contains('upvoted') || (upvoteLinks[i].classList.contains('vote-up') && mode=="blacklist" && blacklistedUser(upvoteLinks[i]))|| (upvoteLinks[i].classList.contains('vote-up') && mode=="whitelist" && !whitelistedUser(upvoteLinks[i]))) {
				//console.log("Bereits geliked:" + upvoteLinks[i] + "");
			}else{
				clickLink(upvoteLinks[i],i);
			}
			i++;                     //  increment the counter
			if (i < upvoteLinks.length) {            //  if the counter < 10, call the loop function
				myLoop(upvoteLinks,i);             //  ..  again which will trigger another
			}                        //  ..  setTimeout()
		}
	   }, duration);
   }else{
	   //console.log(loading);
	   return;
   };
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
            //console.log("Blacklisted User: "+ blacklist[i]);
            return true;
        }
    }
    for(var i=0; i<blacklistClan.length; i++){
        var name=upvoteLink.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText;
        //console.log(name);
        if(name.indexOf(blacklistClan[i])>-1){
            //console.log("Blacklisted User: "+ name);
            return true;
        }
    }
    return false;
}
function whitelistedUser(upvoteLink){
    var whitelist = getGMArray("whitelist");
    var whitelistClan = getGMArray("whitelistClan");
    for(var i=0; i<whitelist.length; i++){
        var link=upvoteLink.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[0].childNodes[0].childNodes[1].childNodes[0].href;
        if(link.indexOf(whitelist[i])>-1){
            //console.log("Blacklisted User: "+ blacklist[i]);
            return true;
        }
    }
    for(var i=0; i<whitelistClan.length; i++){
        var name=upvoteLink.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText;
        //console.log(name);
        if(name.indexOf(whitelistClan[i])>-1){
            //console.log("Blacklisted User: "+ name);
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
    var natural = GM_getValue("natural");
    var duration = Math.random();
    duration = duration * 1000;
    if(!natural)duration = 100;
    var link=upvoteLink;
	var answerHak = GM_getValue("answerHak");
	//setTimeout(function(){
	//console.log(typeof $(upvoteLink).closest("li").closest(".post").attr('id'));
	//console.log($(upvoteLink).closest("li").closest(".post").attr('id'));
	//.parent("li.post").id
	//console.log(link);
	var downvotes = upvoteLink.nextSibling;
	var reply=false;
	//console.log(downvotes);
	if(typeof downvotes != "undefined" && downvotes != null) downvotes=downvotes.nextSibling;
	else reply = true;
	var downVoted = false;
	//console.log(downvotes);
	if (!reply){
		if(typeof downvotes != 'undefined' && downvotes.classList.contains("downvoted")){
			downVoted = true;
		}
	}
	//console.log(downVoted);
	var loading = GM_getValue("loading");
	if(document.getElementsByClassName("open").length || typeof $(upvoteLink).closest("li").closest(".post").attr('id') == "undefined" || typeof $(".post-list.loading").get(0)!="undefined" || ($(upvoteLink).parents("ul.children").length>0 && !answerHak) || downVoted || loading){
		//console.log(upvoteLink);
		//console.log(downvotes);
		return;
	}else{
		//console.log($(link).closest(".post").attr("id"));
		link.click();

		//console.log(link);
	}
	//}, duration);
}

//=======================================================
//=======================================================
//checks if Disqus is loaded and is giving Hak
//=======================================================
function initialHak(){
    var checkExist = setInterval(function() {
        if (document.getElementsByClassName("textarea").length) {
            console.log("Kommentarfeld Vorhanden - Erster Hak wird verteilt!");
            //document.getElementsByClassName("textarea")[0].innerHTML="Absinth ist ein Hurensohn aber ein begnadeter Liebhaber";
            //document.getElementsByClassName("btn post-action__button")[0].click();
            setTimeout(function(){
                var upvoteLinks = document.getElementsByClassName("vote-up");
                //console.log(upvoteLinks.length);
                var i = 0;                     //  set your counter to 1
                myLoop(upvoteLinks,i);                      //  start the loop
            }, 3000);
            clearInterval(checkExist);
            checkExist = false;
        }
        //console.log(document.getElementsByClassName("textarea").length);
    }, 100); // check every 100ms
}

function giveHak(){
    var hakGiver = setInterval(function() {
		var loading = GM_getValue("loading");
		if(typeof $(".post-list.loading").get(0)=="undefined"&&!loading){
			var upvoteLinks = $(".vote-up").not(".upvoted").get();
			//console.log(upvoteLinks.length);
			var i = 0;                     //  set your counter to 1
			myLoop(upvoteLinks,i);                      //  start the loop
			//console.log(document.getElementsByClassName("textarea").length);
		}else{
			//console.log(typeof $(".post-list.loading").get(0));
		}
    }, 100); // check every 100ms
}
//=======================================================
//=======================================================
//checks if there is a new Comment and is giving Hak
//=======================================================
function newCommentBot(giveHak,natural){
    var checkExist2 = setInterval(function() {
        if (document.getElementsByClassName("alert--realtime").length && document.getElementsByClassName("alert--realtime").length>0 && document.getElementsByClassName("alert--realtime")[0].style.display != "none") {
            //console.log(document.getElementsByClassName("alert--realtime").length);
            var duration = Math.random();
            duration = duration * 1000;
            if(!natural)duration = 100;
            setTimeout(function(){
                document.getElementsByClassName("alert--realtime")[0].click();
            },duration);
        }
		var mode = GM_getValue("hakMode");
        if(mode=="blacklist"){
					addBlacklistButton();
					//addTTSButton();
				}else{
					console.log("AddWhitelistButton");
					addWhitelistButton();
					//addTTSButton();
				}
        //console.log(document.getElementsByClassName("textarea").length);
    }, 2000); // check every 1000ms
}

//=======================================================
//=======================================================
//checks if there is a new Subcomment and is giving Hak
//=======================================================
function newSubcommentBot(giveHak){
    var checkExist3 = setInterval(function() {
        if (document.getElementsByClassName("realtime-button reveal").length && document.getElementsByClassName("realtime-button reveal").length>0) {
            var neueKommentare = document.getElementsByClassName("realtime-button reveal");
            //console.log(upvoteLinks.length);
            var i = 0;                     //  set your counter to 1
            myLoop(neueKommentare,i);     //  start the loop

        }
		var mode = GM_getValue("hakMode");
        if(mode=="blacklist"){
					addBlacklistButton();
					//addTTSButton();
				}else{
					console.log("AddWhitelistButton");
					addWhitelistButton();
					//addTTSButton();
				}
        //console.log(document.getElementsByClassName("textarea").length);
    }, 1500); // check every 1000ms

}

//=======================================================
//=======================================================
//Hides UpvoteList
//=======================================================
function hideBot(){
    var natural = GM_getValue("natural");
    var duration = Math.random();
    duration = duration *150;
    if (duration < 20){
        duration = 20;
    }
    if(!natural)duration=10;
	var checkExist4 = setInterval(function() {
		$(".vote-up").not(".hover").hover(
			function(){
				GM_setValue("dontHide",true);
			},function(){
				GM_setValue("dontHide",false);
			}
		);
		$(".voting").addClass("hover");
        if (document.getElementsByClassName("tooltip upvoters").length && !GM_getValue("dontHide")) {
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
function reloadBot(time){
    var natural = GM_getValue("natural");
    var duration = Math.random();
    duration = duration * 120000;
    if (duration < 30000){
        duration = 30000;
    }
    duration= time + duration;
    if(!natural)duration=time;
    //console.log(duration);
    setTimeout(function(){
		if(!$(".textarea").is(":focus")){
			location.reload();
		}else{
			console.log("Reload Denied");
			reloadBot(0);
		}
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
		var embedImages = GM_getValue("embedImages");
        var embedYoutube = GM_getValue("embedYoutube");
        var comments = document.getElementsByClassName("post-message");
        for (var i = 0;i<comments.length;i++){
            //console.log(comments[i].classList.contains("embed"));
            //console.log(comments[i].innerText.indexOf(".youtube.") > -1);
            //---------------------------------------------------------------------
            //Youtube Embed
            //---------------------------------------------------------------------
            if(comments[i].innerText.toLowerCase().indexOf(".youtube.com/watch?v=") > -1 && !comments[i].classList.contains("embed") && embedYoutube){
                var start = comments[i].innerText.indexOf("watch?v=")+8;
                var end = start+11;
                var id = comments[i].innerText.substr(start,11);
                comments[i].innerHTML=comments[i].innerHTML + "<br><br>";
                comments[i].innerHTML=comments[i].innerHTML + "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/"+id+"\" frameborder=\"0\" allowfullscreen></iframe>";
                comments[i].classList.add("embed");
            }
            else if(comments[i].innerText.toLowerCase().indexOf("youtu.be/") > -1 && !comments[i].classList.contains("embed") && embedYoutube){
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
                if((link.indexOf(".png")>-1||link.indexOf(".jpg")>-1||link.indexOf(".gif")>-1) && embedImages){
                    //console.log("Der Link zum bild lautet: "+linkNormal);
                    var img=true;
                }
				//console.log("Linknormal:" + linkNormal);
				if(linkNormal.toLowerCase().indexOf("rapupdate.de")>-1 && linkNormal.toLowerCase().indexOf("disq.us")==-1 && FakeLinkChecker){
					fakeLink(comments[i],linkNormal,commentHtml);
				}else{
					linkClickable = '<a target="_blank" href="'+linkNormal+'">'+linkNormal+'</a>';
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
                    if((link.indexOf(".png")>-1||link.indexOf(".jpg")>-1||link.indexOf(".gif")>-1) && embedImages){
                        //console.log("Der Link zum bild lautet: "+linkNormal);
                        var img=true;
                    }
					//console.log("Linknormal:" + linkNormal);
					if(linkNormal.toLowerCase().indexOf("rapupdate.de")>-1 && linkNormal.toLowerCase().indexOf("disq.us")==-1 && FakeLinkChecker){
						fakeLink(comments[i],linkNormal,commentHtml);
					}else{
						linkClickable = '<a target="_blank" href="'+linkNormal+'">'+linkNormal+'</a>';
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
                    //console.log("p: "+linkLengthBreak+"   br:"+linkLengthBreak2+"   Link: "+linkNormal);
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
                    if((link.indexOf(".png")>-1||link.indexOf(".jpg")>-1||link.indexOf(".gif")>-1)&&embedImages){
                        var img=true;
                    }
					//console.log("Linknormal (Else):" + linkNormal);
                    if(commentHtml.indexOf('href="'+linkNormal)==-1){
						if(linkNormal.toLowerCase().indexOf("rapupdate.de")>-1 && linkNormal.toLowerCase().indexOf("disq.us")==-1 && FakeLinkChecker){
							fakeLink(comments[i],linkNormal,commentHtml);
						}else{
							linkClickable = '<a target="_blank" href="'+linkNormal+'">'+linkNormal+'</a>';
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
			//console.log(linkNormal);
			//console.log(linkClickable);
			//console.log(commentHtml);
			commentHtml=commentHtml.replace(new RegExp(linkNormal.toLowerCase(), 'g'),linkClickable);
			//console.log(commentHtml);
			comment.innerHTML=commentHtml;
			//console.log(comment.innerHTML);
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
        if (document.getElementsByClassName("alert error").length && document.getElementsByClassName("alert error").length>0 && $(document.getElementsByClassName("alert error")).find("span").text().indexOf("already made") > -1) {
			var container = $(document.getElementsByClassName("alert error")[0]).parent().parent();
			var textArea = container.find(".textarea").get(0);
			//console.log(textArea);
            textArea.innerHTML=textArea.innerHTML.replace("</p>","");
            textArea.innerHTML=textArea.innerHTML+".</p>";
            textArea.innerHTML=textArea.innerHTML.replace("<br>","");
            //console.log(document.getElementsByClassName("textarea")[0].innerHTML);
			//console.log(container);
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




if (window.getSelection && document.createRange) {
    var saveSelection = function(containerEl,offset) {
        var range = window.getSelection().getRangeAt(0);
        var preSelectionRange = range.cloneRange();
        range.startOffset=11;
        preSelectionRange.selectNodeContents(containerEl);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        //console.log("preSelcection: "+preSelectionRange.toString().length);
        var start = preSelectionRange.toString().length+offset;

        return {
            start: start,
            end: start + range.toString().length
        }
    };

    var restoreSelection = function(containerEl, savedSel) {
        var charIndex = 0, range = document.createRange();
        range.setStart(containerEl, 0);
        range.collapse(true);
        var nodeStack = [containerEl], node, foundStart = false, stop = false;

        while (!stop && (node = nodeStack.pop())) {
            if (node.nodeType == 3) {
                var nextCharIndex = charIndex + node.length;
                if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                    range.setStart(node, savedSel.start - charIndex);
                    foundStart = true;
                }
                if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                    range.setEnd(node, savedSel.end - charIndex);
                    stop = true;
                }
                charIndex = nextCharIndex;
            } else {
                var i = node.childNodes.length;
                while (i--) {
                    nodeStack.push(node.childNodes[i]);
                }
            }
        }

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
} else if (document.selection && document.body.createTextRange) {
    saveSelection = function(containerEl) {
        var selectedTextRange = document.selection.createRange();
        var preSelectionTextRange = document.body.createTextRange();
        preSelectionTextRange.moveToElementText(containerEl);
        preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
        var start = preSelectionTextRange.text.length;

        return {
            start: start,
            end: start + selectedTextRange.text.length
        }
    };

    restoreSelection = function(containerEl, savedSel) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(containerEl);
        textRange.collapse(true);
        textRange.moveEnd("character", savedSel.end);
        textRange.moveStart("character", savedSel.start);
        textRange.select();
    };
}




//=======================================================
//=======================================================
//Backupstuff - Not used in the code!
//=======================================================
function backupKram(){
    var checkExist = setInterval(function() {
        if (document.getElementsByClassName("textarea").length) {
            //console.log("Exists!");
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
            //console.log("Exists!");
            document.getElementsByClassName("textarea")[0].innerHTML="Future ist ein Hurensohn " + duration;
            document.getElementsByClassName("btn post-action__button")[0].click();
            //console.log(document.getElementsByClassName("textarea").length);
            clearInterval(checkExist);
        }
    }, duration); // check every 100ms
    //();
}

function generateFront(textArea){
    if (textArea.innerHTML.indexOf("#generischeFrontGenerator") > -1){
		var attackFamilie = Math.random() >= 0.5;
        var tat=["Verbrenne","Haue mit Kettensäge","Esse","Grabe aus","Zerhacke","Bekehre","Schicke in die Hölle","Vergewaltige","Ficke","Hole raus","Breakdance auf tote Körper","Zerkaue","Töte","Attakiere","Stelle mir in Excel Tabellen vor","Spieße auf","Zertrete Kopf mit meinen Kampfstiefeln","Esse zum Frühstück mit Helal Speck","Gebe hinterm Edekaparkplatz Anal","Pisse mit meinem Druckmittelstrahl ein Auge aus"]
        var wort=["Trapez","Parallelogramm","Franzosen","Omnikron","Matrix","Vektor","Alpha","Omega","Minecraft","Fortnite","Computer","Zyklon","","Bonus","Nationalmannschaft","Atom","Metronom","Astronaut","Hyper","Mitryl","Platin","Outlookspamverdachtordnervoll","Atomuboot","Großmembran"]
        var familie = ["Mutter","Eltern","Oma","Schwester","Familie","Ahnen","Uroma","geweitete Anus","Cousine"]
        var mittel=["mit meinem Kriegsbeil","mit seinem abgehackten Penis","mit meinem Penis","mit Flammenwerfer","mit Barbecue Soße","und benutze ihren Anus zum Cocktailmixen","und esse seine Ehre zum Frühstück","und verkaufe sie für 1g Koks","zum Barbecue","und verzehre sie","und rieche an sein Omas Tanga","mit Teleskop","mit Schaufel","mit Messer","mit Katana","mit Bratpfanne voller Fett","und esse ihre Eingeweide","und schiebe meinen Penis in zersplitterte Brustkorb","während ich Alexa Despacito spielen lasse","ausserdem lasse ich seine Schwester meinen Schwanz liebkosen","und ich esse dabei lecker Kaviarbrot","während dieser autistische Nuttensohn MACHT MAL LÄÄÄRM BEEEERLIIIIIN ruft","danach schneide ich ihm die Fingerkuppen ab","dann werde ich sein Minecraftserver griefen","und hänge sie fotze voran an einer Ampel auf dann mach ich an ihr klimmzüge bis sie komplett aufgespiesst ist","während sein Vater mir die Stiefel putzt","während sein Onkel mir den Ring küsst","während ich deinen Rassehund für 3€ an Bushido verkaufe"]
        var aktion = ["komm ran [befreundeter RapupdateUser] und guck zu","während [befreundeter RapupdateUser] sich heimlich vor Fenster einen drauf wichst","währenddessen klaut [befreundeter RapupdateUser] heimlich die Süßigkeiten aus Schrank","während [befreundeter RapupdateUser] auf seiner E-Gitarre den Soundtrack dazu in Stereo spielt",", [befreundeter RapupdateUser] komm ran und nimm einen Bissen HAMHAM","-",", [befreundeter RapupdateUser] nimm einen Schluck von Blut von seiner Familie GLUGLUG","während [befreundeter RapupdateUser] dazu beatboxt","und [befreundeter RapupdateUser] pöbelt wild herum","währenddessen rempelt [befreundeter RapupdateUser] ihn an Bruder","bevor [befreundeter RapupdateUser] Auge deiner Uroma aus Puddingglas Löffelt","währenddessen ruft [befreundeter RapupdateUser] ITS JUST A PRANK BRO","während [befreundeter RapupdateUser] Big Pack Malboro kaufen geht"]
        var ende = ["Wallahi","Bruder","HAHAHAHAHAHAHAAAAAAA","Nuttensohn","HABUB","Habibi Masallaaah","Ahahahahahahaaaaa",""]
        var front=""
        var ruUser = window.prompt("Wen willst du fronten?","");
        var ruUserFriend = window.prompt("Wer ist auf deiner Seite?","");
        var tatTmp = tat[Math.floor(Math.random()*tat.length)].split(" ")
        console.log(tatTmp.length)
        var tat1 = tatTmp[0];
        var tat2 = ""
        if(tatTmp.length > 1){
            if(tatTmp[0] == "Breakdance" || tatTmp[0] == "Stelle"){
                tat1 = tat1 + " " + tatTmp[1];
                tatTmp.shift()
            }
            tatTmp.shift()
            console.log(tatTmp)
            tat2 = tatTmp.join()
            tat2 = tat2.replaceAll(","," ");

        }
		if (attackFamilie){
			if (tat2 !=""){
				front = tat1 + " [RapupdateUser] seine " + wort[Math.floor(Math.random()*wort.length)] + "hurensohn " + familie[Math.floor(Math.random()*familie.length)] + " " +tat2 + " " + mittel[Math.floor(Math.random()*mittel.length)] + " " + aktion[Math.floor(Math.random()*aktion.length)] + " " + ende[Math.floor(Math.random()*ende.length)] +""
			}else{
				front = tat1 + " [RapupdateUser] seine " + wort[Math.floor(Math.random()*wort.length)] + "hurensohn " + familie[Math.floor(Math.random()*familie.length)] + " " + mittel[Math.floor(Math.random()*mittel.length)] + " " + aktion[Math.floor(Math.random()*aktion.length)] + " " + ende[Math.floor(Math.random()*ende.length)] +""
			}
			console.log(ruUser)
			console.log(ruUserFriend)
		}else{
			if (tat2 !=""){
				front = tat1 + " diesen " + wort[Math.floor(Math.random()*wort.length)] + "hurensohn [RapupdateUser] " +tat2 + " " + mittel[Math.floor(Math.random()*mittel.length)] + " " + aktion[Math.floor(Math.random()*aktion.length)] + " " + ende[Math.floor(Math.random()*ende.length)] +""
			}else{
				front = tat1 + " diesen " + wort[Math.floor(Math.random()*wort.length)] + "hurensohn [RapupdateUser] " + mittel[Math.floor(Math.random()*mittel.length)] + " " + aktion[Math.floor(Math.random()*aktion.length)] + " " + ende[Math.floor(Math.random()*ende.length)] +""
			}
		}
		var generic = true;
        if (ruUser != null && ruUser != "") {
            front = front.replace("[RapupdateUser]",ruUser);
			generic = false
        }else{
			generic = true
		}
        if (ruUserFriend != null && ruUserFriend != "") {
            front = front.replace("[befreundeter RapupdateUser]",ruUserFriend);
			generic = false
        }else{
			generic = true
		}
        if (generic){
			front = front + "<br><b>#generischeFronts</b>"
		}
        return front;
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
//=======================================================
//=======================================================
//Changes Darth Qullis Profilepic to the Old one
//=======================================================
function quaffleBot(){
	console.log("Quaffle Bot Aktiviert");
    setInterval(function(){
        setTimeout(function(){
            var user=document.getElementsByClassName("user");
            for (var i =0; i<user.length;i++){
                //console.log(user[i].href);
                if(user[i].href=="https://disqus.com/by/DarthWaffle/"||user[i].href=="https://disqus.com/by/pipi_vagina/"){
                    //console.log("Quaffles Found");
                    //console.log(user[i].childNodes[0]);
                    user[i].childNodes[0].src="https://img.webme.com/pic/a/aggro-berlin-info/tony.jpg";
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
