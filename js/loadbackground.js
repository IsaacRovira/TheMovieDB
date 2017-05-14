//<![CDATA[

function updatebackgroundpics(){	
	postMessage(Math.floor((Math.random() * 20)));
	setTimeout("updatebackgroundpics()", 75);
}
updatebackgroundpics();
//]]>