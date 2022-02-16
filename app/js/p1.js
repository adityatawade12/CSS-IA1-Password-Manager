window.$ = window.jQuery = require('jquery');

const { ipcRenderer, clipboard } = require('electron')

ipcRenderer.send('getData')

var obj = {}

$("#show").on("click", function () {
	if ($("#password").attr("type") == "text") {
		$("#password").attr("type", "password")
	} else {
		$("#password").attr("type", "text")
	}
})

$("#categories").on("change", function () {
	$("#accounts").attr("disabled", false)
	console.log($("#categories").val())

    $('#accounts').children("option:not(:first)").remove();
	$("#accounts ").val("0");

    obj[$("#categories").val()].forEach(acc => {
		$('#accounts').append(new Option(acc, acc));
	})

    $("#password").val("")
})

$("#accounts").on("change", function () {
	$("#password").val("")
	$("#getPass").attr("disabled", false)
})

ipcRenderer.on('catData', (e, object) => {
	// console.log(object)
	obj = object
	$('#categories').children("option:not(:first)").remove();
	$('#categories1').children("option:not(:first)").remove();
	$('#Existing').children("option:not(:first)").remove();
	
	Object.keys(object).forEach((keys) => {
		$('#categories').append(new Option(keys, keys));
		$('#categories1').append(new Option(keys, keys));
		$('#Existing').append(new Option(keys, keys));
		// console.log(typeof(keys))
	})

})

$("#getPass").on("click", function () {
	ipcRenderer.send('getPass', {
		"username": $("#accounts").val(),
		"category": $("#categories").val()
	})
})

ipcRenderer.on('passData', (e, object) => {
	console.log(object)
	$("#password").val(object)
	$("#password3").val(object)
	$("#show").attr("disabled", false)
	$("#password").attr("disabled", false)
	$("#copy").attr("disabled", false)
})

$("#add").on("click", function () {
	ipcRenderer.send('add')
})

$("#copy").on("click", function () {
	// $("#password").select(
	//     document.execCommand('copy')
	// )
	// console.log($("#password").val())
	clipboard.writeText($("#password").val(), 'selection')
	console.log(clipboard.readText('selection'))
})