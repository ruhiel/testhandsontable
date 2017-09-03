var grid = document.getElementById('grid');

function strip_tags(input, allowed) {
   var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
     commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

   // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
   allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');

   return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
     return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
   });
 }

 function safeHtmlRenderer(instance, td, row, col, prop, value, cellProperties) {
   var escaped = Handsontable.helper.stringify(value);
   escaped = strip_tags(escaped, '<div>'); //be sure you only allow certain HTML tags to avoid XSS threats (you should also remove unwanted HTML attributes)
   td.innerHTML = escaped;

   return td;
 }
 
var spread = new Handsontable(grid, {
    columns: [
        {
            editor: 'select',
            selectOptions: ['<div class="a1">hoge</div>', '<div class="a2">fuga</div>', '<div class="a3">bar</div>'],
            renderer: safeHtmlRenderer
        }
    ]
});
	
$(document).ready(function(){
	$('#b1').click(function(){
			alert(spread.getDataAtCell(0, 0));
	});
});
