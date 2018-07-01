
result={"Group A":{"first":"Uruguay","second":"Russia"},"Group B":{"first":"Spain","second":"Portugal"},"Group C":{"first":"France","second":"Denmark"},"Group D":{"first":"Croatia","second":"Argentina"},"Group E":{"first":"Brazil","second":"Switzerland"},"Group F":{"first":"Sweden","second":"Mexico"},"Group G":{"first":"Belgium","second":"England"},"Group H":{"first":"Colombia","second":"Japan"}};
assignFirstandSecond(result);
$('div.checkbox input').on('change', function(evt) {
   zee=$(this);
   var group=zee.parent().parent().parent().parent().parent();
   var group_id=group.attr("id").split("-")[1];
    if(group.find(":checked").length>2){
        this.checked=false;
        return;
    }
    if(group.find(":checked").length==1)result[`Group ${group_id}`]={first:group.find(":checked").val(),second:null};   
   
    if(group.find(":checked").length==0)result[`Group ${group_id}`]={first:null,second:null};
    if(group.find(":checked").length==2)result[`Group ${group_id}`].second=zee.val();
assignFirstandSecond(result);
});

function crossverify(){
    if(!$(".grp").toArray().every(v=>$(v).find(":checked").length==2)){
        alert("Ensure there are two checked boxes in each group")
        return;
    }
    else{
        localStorage.setItem("preferences",JSON.stringify(result));
        window.location='results.html'
    }
}



function assignFirstandSecond(resultcopy){
    //assign first and second
    for(grp in resultcopy){
        var data=resultcopy[grp];
        var classname="grp-"+grp.split(" ")[1];
        
        $(`.${classname}`).find(".first_picked").html(data.first||"NA")
        $(`.${classname}`).find(".second_picked").html(data.second||"NA")
    }
}

