$(document).ready(function () {

    var lsel = $("#leftSelect");
    var rsel = $("#rightSelect");
    var grid = $("#grid");
    var nthFormulaField =  $("#selector");
    var nthFormula =  nthFormulaField.val();
    panel = $("#main-panel");
	
	
	
    app.config(lsel,rsel);
    lsel.val(2);// 2 x 3
    rsel.val(3); // 2 x 3


    app.gridChange(grid,lsel,rsel,nthFormula = 0);

    lsel.change(function () {
        app.gridChange(grid,lsel,rsel,nthFormula);
    });
    rsel.change(function () {
        app.gridChange(grid,lsel,rsel,nthFormula);
    });
    nthFormulaField.keyup(function () {

        nthFormula = nthFormulaField.val();
        app.gridChange(grid, lsel,rsel,nthFormula);
    });

	
	$(window).resize(function() {
		//grid = $("#grid");
		console.log("grid " + grid.width());
		app.gridChange(grid,lsel,rsel,nthFormula);
	});

	
});




 app = {
    config:function (firstSelectList,secondSelectList) {
        firstSelectList.find("option").remove();
        secondSelectList.find("option").remove();

        for(i=1;i<=10;i++){
            firstSelectList.append("<option>" + i +"</option>");
            secondSelectList.append("<option>" + i + "</option>");
        }
    },

    gridChange:function (grid,firstSelectList,secondSelectList,nthFormula) {

        //чистим
        grid.find("div").remove();

        var row = firstSelectList.val();
        var col = secondSelectList.val();
        var divWidth = (grid.width() / col) - 7;
        var counter = 0;

        for (i = 0; i < row; i++) {
            for (j = 0; j < col; j++) {
                counter++;
                grid.append("<div style='width:"+ divWidth + "px'>" + counter +"</div>")
            }
        }
        app.changeNthSelector(nthFormula,grid);
    },

    changeNthSelector : function (nthFormula, grid) {
        grid.find(':nth-child(' + nthFormula + ')').addClass("fill");
    }

};









