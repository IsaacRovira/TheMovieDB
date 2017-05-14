//<![CDATA[

function updatebackgroundpics(){	
	postMessage(Math.floor((Math.random() * 40)));
	setTimeout("updatebackgroundpics()", 2500);
}

updatebackgroundpics();

//]]>