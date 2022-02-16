$("#back").on("click",function(){
    ipcRenderer.send('back')
})

$("#catType").on('change',function(){
    
    if($("#catType").val()=="Existing"){
        $("#Existing").css({"display":"initial"})
        $("#New").css({"display":"none"})
        $("#Existing").val("0");
    }else{
        $("#New").css({"display":"initial"})
        $("#Existing").css({"display":"none"})
        $("#New").val("");
    }
    enableSave()
})

$("#Existing").on('change',function(){
    enableSave()
})


$("#email").on("input",function(){
    enableSave()
})

$("#password2").on("input",function(){
    enableSave()
})

$("#show1").on("click",function(){
    if($("#password2").attr("type")=="text"){
        $("#password2").attr("type","password")
    }else{
        $("#password2").attr("type","text")
    }
    

})

$("#New").on("input", function(){
    
    enableSave()
    
});

ipcRenderer.on("update",(e,object)=>{
    ipcRenderer.send('getData')
    clearAll()
})

$("#save").on('click',function(){
   
    ipcRenderer.send("createNew",{
        category:$("#"+$("#catType").val()).val(),
        username:$("#email").val(),
        password:$("#password2").val()
    })
    clearAll()

})

function enableSave() {
    console.log($("#Existing").val())
    if($("#catType").val()=="Existing" && $("#Existing").val()!="0" && $("#Existing").val()!=null ){
        if( $("#email").val().length>0 && $("#password2").val().length>0 ){
        
            $("#save").attr("disabled",false)
           
        }else{
            
            $("#save").attr("disabled",true)
        }
    }
    else if($("#catType").val()=="New" && $("#New").val().length>0 ){
        if( $("#email").val().length>0 && $("#password2").val().length>0 ){
        
            $("#save").attr("disabled",false)
           
        }else{
            
            $("#save").attr("disabled",true)
        }
    }
    else{
        $("#save").attr("disabled",true)
    }
    
}