$(function(){

	var gutterWidth  = $("#gutter-width").val(),
			colsNumber   = $("#cols-number").val(),
			mbBreakpoint = $("#mb-breakpoint").val();

	$("head").append("<style></style>");
	$('<div id="code-tab"><pre><code id="code-container" class="css"></code></div>').insertAfter($("#tabs ul"));
	$('<div id="preview-tab" class="row preview"></div>').insertAfter($("#tabs ul"));

	updateGenerator();


	$( "#tabs" ).tabs();

	$("#column-width").keyup(function(e){
		columnWidth = $(this).val();
		updateGenerator();
	});

	$("#gutter-width").keyup(function(e){
		gutterWidth = $(this).val();
		updateGenerator();
	});

	$("#cols-number").keyup(function(e){
		var num = $(this).val();
			colsNumber = num;
			updateGenerator();
	});

	$("#max-row-width").keyup(function(e){
		maxRowWidth = $(this).val();
		updateGenerator();
	});

	$("#mb-breakpoint").keyup(function(){
		mbBreakpoint = $(this).val();
		updateGenerator();

	});

	$("#code-link").click(function(e){
		$("#preview-link").removeClass("active");
		$(this).addClass("active");
		e.preventDefault();
	});

	$("#preview-link").click(function(e){
		$("#code-link").removeClass("active");
		$(this).addClass("active");
		e.preventDefault();
	});

	function generateGridCss(){
		var introComment = '/*\n * Simple CSS grid for quickly creating responsive layouts. \n * Intended to be used in combination with a CSS reset such as normalize.css\n *\n */\n',
				baseStyles = '\nhtml{\n\tbox-sizing: border-box;\n} \n*, *:before, *:after{\n\tbox-sizing: inherit;\n}',
				rowStyles = '\n.row{\n\twidth: 100%;\n}\n.row:before,.row:after{\n\tcontent: "";\n\tdisplay: table;\n\tclear: bloth;\n}',
				colStyles = '\n[class*="col-"]{\n\tfloat:left;\n\tmin-height: 1px;\n\tpadding: '+gutterWidth+'px;\n\twidth:100%; \n}\n[class*="col-"]:last-of-type{\n\tpadding-right: '+gutterWidth+'px;\n\tfloat:right;\n}' + generateGridColumns();

		return introComment + baseStyles + rowStyles + colStyles;
	}

	function generateGridColumns(){
		var i = 1, colClasses = "\n@media screen and (min-width:" +mbBreakpoint+"px){";
		for(; i <= colsNumber; i++){
			colClasses += "\n\t.col-"+i+"{width:" + 100 / (colsNumber/i) + "%;}"
		}
		colClasses += "\n}";
		return colClasses;
	}

	function generatePreview(){
		$(".preview").html(function(){
			var i = 0, previewRows = "";
			for(; i < colsNumber; i++){
				previewRows += '<div class="col-1"><div class="preview-content"></div></div>\n';
			}
			return previewRows;
		});
	}

	function updateGenerator(){
		$("style").text(generateGridCss());
		$("#code-container").html(generateGridCss());
		generatePreview();
		hljs.highlightBlock(document.getElementById("code-container"));
	}
});
