// https://flaviocopes.com/dom-ready/



document.addEventListener('DOMContentLoaded', (event) => {
    let lsel = document.querySelector("#leftSelect");
    let rsel = document.querySelector("#rightSelect");
    let grid = document.querySelector("#grid");
    let nthFormulaField = document.querySelector("#selector");
    let nthFormula =  nthFormulaField.value;
    let panel = document.querySelector("#main-panel");
	


    appModule.config(lsel,rsel);
    lsel.value = 2;
    rsel.value = 3;
    //rsel.val(3); // 2 x 3


    appModule.gridChange(grid,lsel,rsel,nthFormula = 0);

    lsel.addEventListener("change", function () {
        appModule.gridChange(grid,lsel,rsel,nthFormula);
    });

    lsel.addEventListener ("change", function () {
        appModule.gridChange(grid,lsel,rsel,nthFormula);
    });
    rsel.addEventListener('change', function () {
        appModule.gridChange(grid,lsel,rsel,nthFormula);
    });
    nthFormulaField.addEventListener("keyup", function () {
        nthFormula = nthFormulaField.value;
        appModule.gridChange(grid, lsel,rsel,nthFormula);
    });


	
	$(window).resize(function() {
		//grid = $("#grid");
		console.log("grid " + grid.offsetWidth);
		appModule.gridChange(grid,lsel,rsel,nthFormula);
	});



});

var appModule = (function () {
    //init
    return({
        
        config: function (firstSelectList,secondSelectList) {
            //firstSelectList.find("option").remove();
            firstSelectList.querySelectorAll("option").forEach(element => {
                element.remove();
            });
           //secondSelectList.find("option").remove();
            secondSelectList.querySelectorAll("option").forEach(element => {
                element.remove();
            });


            
            for(i=1;i<=10;i++){
                let optByLeft = document.createElement("option");
                let optByRight = document.createElement("option");
                optByLeft.text = i;
                optByRight.text = i;
                firstSelectList.add(optByLeft);
                secondSelectList.add(optByRight);

            }
        },
        gridChange: function (grid,firstSelectList,secondSelectList,nthFormula) {

            //чистим
            //grid.find("div").remove();
            grid.querySelectorAll("div").forEach(element => {
                element.remove();
            });

            var row = firstSelectList.value;
            var col = secondSelectList.value;
            var gridWidth = parseFloat(window.getComputedStyle(grid).width);
           // var divWidth = (grid.offsetWidth / col) - 7;
            var divWidth = (gridWidth/ col) - 7;
           alert(gridWidth);
            alert(grid.offsetWidth);


            var counter = 0;
             
            for (i = 0; i < row; i++) {
                for (j = 0; j < col; j++) {
                    counter++;
                    let divBlock = document.createElement("div");
                    divBlock.setAttribute("style",`width: ${divWidth}px`);
                    divBlock.innerHTML = counter;
                    grid.appendChild(divBlock);
                    //grid.append("<div style='width:"+ divWidth + "px'>" + counter +"</div>")
                }
            }
            this.changeNthSelector(nthFormula,grid);
        },
        changeNthSelector: function (nthFormula, grid) {
            //grid.find(':nth-child(' + nthFormula + ')').addClass("fill");
            grid.querySelectorAll(':nth-child(' + nthFormula + ')').forEach(element => {
                element.classList.Add("fill");
            });
        }


    });

})();












