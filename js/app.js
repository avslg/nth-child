// https://flaviocopes.com/dom-ready/

document.addEventListener('DOMContentLoaded', (event) => {
    let lsel = $("#leftSelect");
    let rsel = $("#rightSelect");
    let grid = $("#grid");
    let nthFormulaField =  $("#selector");
    let nthFormula =  nthFormulaField.val();
    let panel = $("#main-panel");
	


    appModule.config(lsel,rsel);
    lsel.val(2);// 2 x 3
    rsel.val(3); // 2 x 3


    appModule.gridChange(grid,lsel,rsel,nthFormula = 0);

    lsel.change(function () {
        appModule.gridChange(grid,lsel,rsel,nthFormula);
    });
    rsel.change(function () {
        appModule.gridChange(grid,lsel,rsel,nthFormula);
    });
    nthFormulaField.keyup(function () {
        nthFormula = nthFormulaField.val();
        appModule.gridChange(grid, lsel,rsel,nthFormula);
    });

	
	$(window).resize(function() {
		//grid = $("#grid");
		console.log("grid " + grid.width());
		appModule.gridChange(grid,lsel,rsel,nthFormula);
	});



});

var appModule = (function () {
    //init
    return({
        config: function (firstSelectList,secondSelectList) {
            firstSelectList.find("option").remove();
            secondSelectList.find("option").remove();
    
            for(i=1;i<=10;i++){
                firstSelectList.append("<option>" + i +"</option>");
                secondSelectList.append("<option>" + i + "</option>");
            }
        },
        gridChange: function (grid,firstSelectList,secondSelectList,nthFormula) {

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
            this.changeNthSelector(nthFormula,grid);
        }


    });

})();












