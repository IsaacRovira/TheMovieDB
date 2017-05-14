//<![CDATA[

function updatebackgroundpics(){	
	postMessage(Math.floor((Math.random() * 40)));
	setTimeout("updatebackgroundpics()", 200);
}
updatebackgroundpics();
//]]>