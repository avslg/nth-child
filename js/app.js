// https://flaviocopes.com/dom-ready/

const appModule = (function application() {
  return {
    config(firstSelectList, secondSelectList) {
      firstSelectList.querySelectorAll('option').forEach((element) => {
        element.remove();
      });
      secondSelectList.querySelectorAll('option').forEach((element) => {
        element.remove();
      });

      for (let i = 1; i <= 10; i += 1) {
        const optByLeft = document.createElement('option');
        const optByRight = document.createElement('option');
        optByLeft.text = i;
        optByRight.text = i;
        firstSelectList.add(optByLeft);
        secondSelectList.add(optByRight);
      }
    },
    gridChange(grid, firstSelectList, secondSelectList, nthFormula) {
      grid.querySelectorAll('div').forEach((element) => { // чистим grid.find("div").remove();
        element.remove();
      });

      const row = firstSelectList.value;
      const col = secondSelectList.value;

      const paddingGridLeft = parseInt(getComputedStyle(grid).getPropertyValue('padding-left'), 10);
      const paddingGridRight = parseInt(getComputedStyle(grid).getPropertyValue('padding-right'), 10);
      const gridWidth = grid.clientWidth - paddingGridLeft - paddingGridRight;
      const divWidth = (gridWidth / col) - 7;
      let counter = 0;
      const divBlock = document.createElement('div');
      for (let i = 0; i < row; i += 1) {
        for (let j = 0; j < col; j += 1) {
          counter += 1;
          // const divBlock = document.createElement('div');
          divBlock.setAttribute('style', `width: ${divWidth}px`);
          divBlock.innerHTML = counter;
          grid.appendChild(divBlock);
        }
      }
      this.changeNthSelector(nthFormula, grid);
    },
    changeNthSelector(nthFormula, grid) {
      // grid.find(':nth-child(' + nthFormula + ')').addClass("fill");
      try {
        if (nthFormula) {
          grid.querySelectorAll(`:nth-child(${nthFormula})`).forEach((element) => {
            element.classList.add('fill');
          });
        }
      } catch (error) {
        // console.log("log - " + error);
      }
    },
  };
}());

document.addEventListener('DOMContentLoaded', () => {
  const lsel = document.querySelector('#leftSelect');
  const rsel = document.querySelector('#rightSelect');
  const grid = document.querySelector('#grid');
  const nthFormulaField = document.querySelector('#selector');
  let nthFormula = nthFormulaField.value;
  // const panel = document.querySelector('#main-panel');

  appModule.config(lsel, rsel);
  lsel.value = 2;
  rsel.value = 3;

  appModule.gridChange(grid, lsel, rsel, nthFormula = 0);
  lsel.addEventListener('change', () => {
    appModule.gridChange(grid, lsel, rsel, nthFormula);
  });

  lsel.addEventListener('change', () => {
    appModule.gridChange(grid, lsel, rsel, nthFormula);
  });
  rsel.addEventListener('change', () => {
    appModule.gridChange(grid, lsel, rsel, nthFormula);
  });
  nthFormulaField.addEventListener('keyup', () => {
    nthFormula = nthFormulaField.value;
    appModule.gridChange(grid, lsel, rsel, nthFormula);
  });

  $(window).resize(() => {
    // grid = $("#grid");
    appModule.gridChange(grid, lsel, rsel, nthFormula);
  });
});
