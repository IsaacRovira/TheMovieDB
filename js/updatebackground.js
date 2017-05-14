//<![CDATA[

function updatebackgroundpics(){	
	postMessage(Math.floor((Math.random() * 40)));
	setTimeout("updatebackgroundpics()", 1500);
}

updatebackgroundpics();

//]]>