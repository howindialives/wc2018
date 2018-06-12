var divA      = document.querySelector("#a");
var divB      = document.querySelector("#b");
var connector = document.querySelector("#connector");

var drawConnector = function(from,to,nu) {
  var posnA = {
    x: from.offset().left + from.width(),
    y: from.offset().top  + from.height() / 2
  };
  adj=nu%2==0?10:-10;
  var posnB = {
    x: to.offset().left,
    y: to.offset().top  + (to.height() / 2) +adj
  };
  var dStr =
      "M" +
      (posnA.x      ) + "," + (posnA.y) + " " +
      "C" +
      (posnA.x + 100) + "," + (posnA.y) + " " +
      (posnB.x - 100) + "," + (posnB.y) + " " +
      (posnB.x      ) + "," + (posnB.y);
      console.log(dStr);
  document.querySelector("#conn"+nu).setAttribute("d", dStr);
  
};

drawConnector($("#g1"),$("#q1"),1);
drawConnector($("#g2"),$("#q1"),2);

drawConnector($("#g3"),$("#q2"),3);
drawConnector($("#g4"),$("#q2"),4);

drawConnector($("#g5"),$("#q3"),5);
drawConnector($("#g6"),$("#q3"),6);

drawConnector($("#g7"),$("#q4"),7);
drawConnector($("#g8"),$("#q4"),8);

drawConnector($("#q1"),$("#s1"),9);
drawConnector($("#q2"),$("#s1"),10);

drawConnector($("#q3"),$("#s2"),11);
drawConnector($("#q4"),$("#s2"),12);

drawConnector($("#s1"),$("#f"),13);
drawConnector($("#s2"),$("#f"),14);


$(document).ready(function(){
    DATA=JSON.parse(localStorage.preferences);

$("#g1").find(".first_text").html(DATA["Group F"].first);
$("#g1").find(".second_text").html(DATA["Group E"].second);

$("#g2").find(".first_text").html(DATA["Group H"].first);
$("#g2").find(".second_text").html(DATA["Group G"].second);

$("#g3").find(".first_text").html(DATA["Group A"].second);
$("#g3").find(".second_text").html(DATA["Group B"].first);

$("#g4").find(".first_text").html(DATA["Group D"].first);
$("#g4").find(".second_text").html(DATA["Group C"].second);

$("#g5").find(".first_text").html(DATA["Group F"].second);
$("#g5").find(".second_text").html(DATA["Group E"].first);

$("#g6").find(".first_text").html(DATA["Group H"].second);
$("#g6").find(".second_text").html(DATA["Group G"].first);

$("#g7").find(".first_text").html(DATA["Group B"].second);
$("#g7").find(".second_text").html(DATA["Group A"].first);

$("#g8").find(".first_text").html(DATA["Group D"].second);
$("#g8").find(".second_text").html(DATA["Group C"].first);
})


//Assignments

//1F2E 1H2G 2A1B 1D2C 2F1E 2H1G 2B1A 2D1C 
