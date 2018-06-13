var divA = document.querySelector("#a");
var divB = document.querySelector("#b");
var connector = document.querySelector("#connector");

var drawConnector = function (from, to, nu) {
    var posnA = {
        x: from.offset().left + from.width(),
        y: from.offset().top + from.height() / 2
    };
    adj = nu % 2 == 0 ? 10 : -10;
    var posnB = {
        x: to.offset().left,
        y: to.offset().top + (to.height() / 2) + adj
    };
    var dStr =
        "M" +
        (posnA.x) + "," + (posnA.y) + " " +
        "C" +
        (posnA.x + 100) + "," + (posnA.y) + " " +
        (posnB.x - 100) + "," + (posnB.y) + " " +
        (posnB.x) + "," + (posnB.y);
    console.log(dStr);
    document.querySelector("#conn" + nu).setAttribute("d", dStr);

};
TESTDATA=[];
//Load TestJSON
fetch('test.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    TESTDATA=myJson;
    create_r16_recipe();
  });
drawConnector($("#g1"), $("#q1"), 1);
drawConnector($("#g2"), $("#q1"), 2);

drawConnector($("#g3"), $("#q2"), 3);
drawConnector($("#g4"), $("#q2"), 4);

drawConnector($("#g5"), $("#q3"), 5);
drawConnector($("#g6"), $("#q3"), 6);

drawConnector($("#g7"), $("#q4"), 7);
drawConnector($("#g8"), $("#q4"), 8);

drawConnector($("#q1"), $("#s1"), 9);
drawConnector($("#q2"), $("#s1"), 10);

drawConnector($("#q3"), $("#s2"), 11);
drawConnector($("#q4"), $("#s2"), 12);

drawConnector($("#s1"), $("#f"), 13);
drawConnector($("#s2"), $("#f"), 14);
var mapper = {
    "Brazil": "br",
    "Germany": "de",
    "Spain": "es",
    "Mexico": "mx",
    "Argentina": "ar",
    "Poland": "pl",
    "Portugal": "pt",
    "Uruguay": "uy",
    "Saudi Arabia": "sa",
    "Russia": "ru",
    "Egypt": "eg",
    "Switzerland": "ch",
    "Australia": "au",
    "Belgium": "be",
    "Denmark": "dk",
    "Nigeria": "ng",
    "Japan": "jp",
    "Croatia": "hr",
    "South Korea": "kr",
    "Sweden": "se",
    "Costa Rica": "cr",
    "Senegal": "sn",
    "England": "gb",
    "Panama": "pa",
    "Tunisia": "tn",
    "Colombia": "co",
    "Peru": "pe",
    "Iran": "ir",
    "Morocco": "ma",
    "France": "fr",
    "Iceland": "is",
    "Serbia": "rs",
}
function beautify(seed, cla) {

    return `<span class="flag-icon flag-icon-${mapper[seed]}"></span><br/>${seed}<div class="checkbox">
    <label>
        <input class="${cla}-${seed}" onclick="${cla}_clicked(this);" type="checkbox" value="${seed}">
    </label>
</div>`

}
function winnerspair(firstblock, secondblock, cla) {
    //you should compare here.
    firstblock = Object.values(firstblock);
    secondblock = Object.values(secondblock);
    chosen1 = parseInt(Math.random() * 2);
    chosen2 = parseInt(Math.random() * 2);
    firstwinner = firstblock[chosen1];
    secondwinner = secondblock[chosen2];
    
    //check the winners 
    $(`.${cla}-${firstwinner}`).attr("checked", true);
    $(`.${cla}-${secondwinner}`).attr("checked", true);

    return [firstwinner, secondwinner];

}
function compare(b1,b2,cla){
    var f1=b1.checked==0?b1.first:b1.second;
    var f2=b2.checked==0?b2.first:b2.second;
    $(`.${cla}-${f1}`).attr("checked", true);
    $(`.${cla}-${f2}`).attr("checked", true);
    return {first:f1,second:f2,checked:pickOne(f1,f2)};
}

function pickOne(t1,t2){
   const source=TESTDATA.find(x => ((x.A == t1 && x.B==t2)||(x.A==t2 && x.B==t1)));
   console.log(source)
   if(source.z==0 && source.z2==0){
       //no interaction, use FIFA rank
       if(source.A==t1){
           if(source.rankA>source.rankB)return 1;
           if(source.rankA<source.rankB)return 0;
       }
       if(source.A==t2){
        if(source.rankA>source.rankB)return 0;
        if(source.rankA<source.rankB)return 1;
       }
   }

   else{
        if(source.A==t1){
            if(source.z>source.z2)return 0;
            if(source.z<source.z2)return 1;
        }
        if(source.A==t2){
        if(source.z>source.z2)return 1;
        if(source.z<source.z2)return 0;
        }
   }

}
function create_r16_recipe() {
    const DATA = JSON.parse(localStorage.preferences);
    r16 = [{
        first: DATA["Group F"].first,
        second: DATA["Group E"].second,
        checked:pickOne(DATA["Group F"].first,DATA["Group E"].second)
    }, {
        first: DATA["Group H"].first,
        second: DATA["Group G"].second,
        checked:pickOne(DATA["Group H"].first,DATA["Group G"].second)
    }, {
        first: DATA["Group A"].second,
        second: DATA["Group B"].first,
        checked:pickOne(DATA["Group A"].second,DATA["Group B"].first)
    }, {
        first: DATA["Group D"].first,
        second: DATA["Group C"].second,
        checked:pickOne(DATA["Group D"].first,DATA["Group C"].second)
    }, {
        first: DATA["Group F"].second,
        second: DATA["Group E"].first,
        checked:pickOne(DATA["Group F"].second,DATA["Group E"].first)
    }, {
        first: DATA["Group H"].second,
        second: DATA["Group G"].first,
        checked:pickOne(DATA["Group H"].second,DATA["Group G"].first)
    }, {
        first: DATA["Group B"].second,
        second: DATA["Group A"].first,
        checked:pickOne(DATA["Group B"].second,DATA["Group A"].first)
    }, {
        first: DATA["Group D"].second,
        second: DATA["Group C"].first,
        checked:pickOne(DATA["Group D"].second,DATA["Group C"].first)
    }];

    for (var i = 1; i < 9; i++) {
        $(`#g${i}`).find(".first").html(beautify(r16[i - 1].first, "g"));
        $(`#g${i}`).find(".second").html(beautify(r16[i - 1].second, "g"));
    }
    createQtrs(r16);
}
//quarters assignment

function createQtrs(r16copy){
    //receive the previous layer data
quarters = []

//TAKE 2 pairs at a time for prediction and generate the second layer
for (var i = 0; i < 7; i += 2) {
    quarters.push(compare(r16copy[i], r16copy[i + 1],"g")); //generate an array
}

for (var i = 1; i < 5; i++) {
    $(`#q${i}`).find(".first").html(beautify(quarters[i - 1].first, "q"));
    $(`#q${i}`).find(".second").html(beautify(quarters[i - 1].second, "q"));
}
createSemis(quarters);
}

function createSemis(qtrcopy){
semis = []
for (var i = 0; i < 3; i += 2) {
    semis.push(compare(qtrcopy[i], qtrcopy[i + 1], "q"))
}
for (var i = 1; i < 3; i++) {
    $(`#s${i}`).find(".first").html(beautify(semis[i - 1].first, "s"));
    $(`#s${i}`).find(".second").html(beautify(semis[i - 1].second, "s"));
}
createFinals(semis);
}

function createFinals(semicopy){
final = []
final.push(compare(semis[0], semis[1], "s"))
$("#f").find(".first").html(beautify(final[0].first, "f"))
$("#f").find(".second").html(beautify(final[0].second, "f"))
createWinner(final)
}

function createWinner(finalcopy){
winner = finalcopy[0].checked==0?finalcopy[0].first:finalcopy[0].second;
$(`.f-${winner}`).attr("checked", true);
console.log(winner+" is the winner!");
}



function radiofy(cttx) {
    zee = $(cttx);
    group = zee.parent().parent().parent().parent();
    console.log(group)
    group.find(":checked").attr("checked", false);
    cttx.checked = true;
}

function g_clicked(ctx){
//Recreate R16, make change and supply
radiofy(ctx);
for(var i=0;i<8;i++)r16[i].checked=$(`#g${i+1}`).find(".first input:checked").length>0?0:1;
createQtrs(r16);

}
function q_clicked(ctx){
    radiofy(ctx);
    for(var i=0;i<4;i++)quarters[i].checked=$(`#q${i+1}`).find(".first input:checked").length>0?0:1;
    createSemis(quarters);

}
function s_clicked(ctx){
    radiofy(ctx);
    for(var i=0;i<2;i++)semis[i].checked=$(`#s${i+1}`).find(".first input:checked").length>0?0:1;
    createFinals(semis);

}
function f_clicked(ctx){
    radiofy(ctx);
    final[0].checked=$("#f").find(".first input:checked").length>0?0:1;
    createWinner(final);
}
