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