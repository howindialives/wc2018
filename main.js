var limit = 1;
$('div.checkbox input').on('change', function(evt) {
    console.log("hello")
   zee=$(this);
   var group=zee.parent().parent().parent().parent().parent();
   if(group.find(":checked").length>2)this.checked=false;
});

function crossverify(){
    if(!$(".grp").toArray().every(v=>$(v).find(":checked").length==2)){
        alert("Ensure there are two checked boxes in each group")
        return;
    }
    else{
        result={}
        $(".grp").each((i,v)=>{
            var grpnum=$(v).find("h5").text();
            var first=$(v).find(":checked").eq(0).val()
            var second=$(v).find(":checked").eq(1).val()
            result[grpnum]={first:first,second:second};
        })
        localStorage.setItem("preferences",JSON.stringify(result));
    }
}
