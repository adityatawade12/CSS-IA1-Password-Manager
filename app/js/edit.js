$("#categories1").on("change",function(){
    $("#accounts1").attr("disabled",false)
    console.log($("#categories1").val())
    $('#accounts1').children("option:not(:first)").remove();
    $("#accounts1 ").val("0");
    obj[$("#categories1").val()].forEach(acc=>{
        $('#accounts1').append(new Option(acc, acc));
    })
    $("#password3").val("")
})

$("#show3").on("click",function(){
    if($("#password3").attr("type")=="text"){
        $("#password3").attr("type","password")
    }else{
        $("#password3").attr("type","text")
    }
    

})

$("#accounts1").on("change",function(){
    $("#password3").val("")
    $("#getPass1").attr("disabled",false)
   
})
$("#getPass1").on("click",function(){
    ipcRenderer.send('getPass',{"username":$("#accounts1").val(),"category":$("#categories1").val()})
    $("#save4").attr("disabled",false)
    $("#delete").attr("disabled",false)
    $("#show3").attr("disabled",false)
    $("#password3").attr("disabled",false)
})

$("#save4").on('click',function(){
    ipcRenderer.send('editPass',{"username":$("#accounts1").val(),"category":$("#categories1").val(),"password":$("#password3").val()})
})

$("#delete").on('click',function(){
    ipcRenderer.send('delete:send',{"username":$("#accounts1").val(),"category":$("#categories1").val()})
})

ipcRenderer.on("delete:done",()=>{
    ipcRenderer.send('getData')
   clearAll()
})


function clearAll(){
    document.getSelection().empty()
    $("#accounts1").val("0")
    $("#categories1").val("0")
    $("#password3").val("")
    $("#accounts").val("0")
    $("#categories").val("0")
    $("#password").val("")
    $("#password2").val("")
    $("#email").val("")
    $("#Existing").val("0")
    $("#catType").val("Existing")
    $("#New").css({"display":"none"})
    $("#Existing").css({"display":"initial"})
    $("#New").val("")
    $("#password3").attr("disabled",true)
    $("#password").attr("disabled",true)
    $("#save").attr("disabled",true)
    $("#save4").attr("disabled",true)
    $("#delete").attr("disabled",true)
    $("#getPass").attr("disabled",true)
    $("#getPass1").attr("disabled",true)
    $("#show3").attr("disabled",true)
    $("#password3").attr("type","password")
    $("#password2").attr("type","password")
    $("#password").attr("type","password")
    $("#show").attr("disabled",true)
    $("#copy").attr("disabled",true)
    $("#accounts").attr("disabled",true)
}

$(".cl").on('click',function(){
    clearAll()
})