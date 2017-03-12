// array for all tags in HTML
var tags = {
	DOCTYPE : ' <!DOCTYPE html> ',
	html : ' <html> </html> ',
	title : ' <title> </title> ',
	head : ' <head> </head> ',
	body : ' <body> </body> ',
	UTF8 : '<meta charset="UTF-8">',
	p : '<p> </p>',
	h1 : '<h1> </h1>',
	h2 : '<h2> </h2>',
	h3 : '<h3> </h3>',
	h4 : '<h4> </h4>',
	h5 : '<h5> </h5>',
	h6 : '<h6> </h6>',
	img : '<img src="image.extensionL" alt="description" width=""  height="" align="" />',
	a : '<a href="url"> </a>',
	mail : '<a href="mailto: text.com"> </a>',
	ul : '<ul style=""> </ul>',
	li : '<li> </li>',
	ol : '<ol type=""> </ol>',
	table : '<table border=""> </table>',
	caption : '<caption> </caption>',
	thead : '<thead> </thead>',
	tfoot : '<tfoot> </tfoot>',
	tbody : '<tbody> </tbody>',
	tr : '<tr> </tr>',
	td : '<td> </td>',
	form : ' <form method="" action=""> </form> ',
	text : ' <input type="text" name="" value="" size==""> ',
	password : ' <input type="password" name="" value="" size==""> ',
	button : ' <input type="button" name="" value="" size==""> ',
	checkbox : ' <input type="checbox" name="" value="" size==""> ',
	radio: ' <input type="radio" name="" value="" size==""> ',
	textarea : '<textarea name="" rows="" cols=""> </textarea> ',
	select : ' <select name=""> </select> ',
	option : ' <option> </option> '
};

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
	var data = ev.target.id;
	var tag = tags[data];
    ev.dataTransfer.setData("text",tag);
}

function insertTag(txtarea , data){
	//var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var cursor = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
        "firstPos" : (document.selection ? "currentPos" : false ) );
    if (cursor == "currentPos") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', txtarea.value.length);
        strPos = range.data.length;
    }
    else if (cursor == "firstPos") 
		strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0,strPos);  
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    txtarea.value=front+data+back;
    strPos = strPos + data.length;
    if (cursor == "currentPos") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
    }
    else if (cursor == "firstPos") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
	}
function drop(ev) {
    ev.preventDefault();
	var data = ev.dataTransfer.getData("text")+"\n";
	var txtarea = document.getElementById("div2");
	insertTag(txtarea , data);
}