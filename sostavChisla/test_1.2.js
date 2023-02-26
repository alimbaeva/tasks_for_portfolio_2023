/**
* Написать функцию sostavChisla(massivChisel: number[], chislo: number), 
  которая бы находила все возможные комбинации чисел из massivChisel, 
  сумма которых равна chislo. При этом:
  1) massivChisel содержит, только уникальные положительные числа (> 0)
  2) в комбинации не должно быть повторений чисел
  3) все комбинации должны быть уникальными
  
  Для проверки работоспособности функции запустить runTests()
  
  @param massivChisel: number[]
  @param chislo: number[]
  @return Array<Array<number>>
*/

function forFilter(result, sum) {
    let res = true;
    result.forEach((arrEl) => {
        if (arrEl.length === sum.length) {
            if (arrEl.join('') === sum.join('')) {
                res = false;
            }
        }
    });
    res ? result.push(sum) : false;
    return result;
 };

function sortSumFn(sortMassivCh, chislo) {
    const result = [];
    let summaNum = [];

    sortMassivCh.forEach((num1) => {
        let minuend = chislo;
        let answer = 0;
        let continueFor = true;
        sortMassivCh.forEach((num2) => {
            if (continueFor) {
                if (num1 < num2 + 1) {
                    answer = minuend - num2;
                    const strSummaNum = summaNum.join('');
                    if (num2 > answer) {
                        if (summaNum.length === 0 && answer !== 0) {
                            summaNum.push(answer, num2);
                            continueFor = false;
                        } else {
                            if (!strSummaNum.includes(minuend)) {
                                summaNum.push(minuend);
                                minuend = answer;
                                continueFor = false;
                            }
                        }
                    } else if (answer === 0) {
                        if (!strSummaNum.includes(minuend)) {
                            summaNum.push(minuend);
                            minuend = answer;
                            continueFor = false;
                        }
                    } else if (answer === num2) {
                        if (!strSummaNum.includes(minuend)) {
                            summaNum.push(minuend);
                            minuend = answer;
                            continueFor = false;
                        }
                    } else {
                        if (!strSummaNum.includes(num2)) {
                            summaNum.push(num2);
                            minuend = answer;
                        }
                    }
                }
            }
        });
        const sumWithSummaNum = summaNum.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          );

        if (sumWithSummaNum === chislo) {
            summaNum = summaNum.sort((a, b) => a - b);
            if (result.length > 0) {
                forFilter(result, summaNum)
            } else {
                result.push(summaNum);
            }
            summaNum = [];
        }
    });
    return result;
}

function addArray(result, res) {
    if (result.length === 0) {
        result = res;
    } else {
        res.forEach((arr) => {
            forFilter(result, arr);
        })
    }
    return result;
}

function sostavChisla(massivChisel, chislo) {
    let result = [];
    let sortMassivCh = massivChisel.sort().filter(el => el <= chislo);

    const res = sortSumFn(sortMassivCh, chislo);
    result = addArray(result, res);

    const averageValue = sortMassivCh[Math.ceil(sortMassivCh.length/2) - 1];
    console.log(averageValue)

    const copyResult = JSON.parse(JSON.stringify(result));;

    copyResult.forEach((arr1) => {
        arr1.forEach((number) => {
            if (number >= averageValue && number !== chislo) {
                const copSortMassivCh = sortMassivCh.filter(el => el < number);
                const subResult = sortSumFn(copSortMassivCh, number);
                
                const newArr1 = arr1.filter((el) => el !== number);

                subResult.forEach((arr2) => {
                    let answer = true;
                    arr2.forEach((num) => {
                        if (newArr1.includes(num)) answer = false;
                    });

                    if (answer) {
                        const arrSlice = newArr1.concat(arr2).sort((a, b) => a - b);
                        
                        if (arrSlice[arrSlice.length - 1] <= sortMassivCh[sortMassivCh.length -1]) result = forFilter(result, arrSlice);
                        
                    }
                });
            }
        });
    });

    const mainResult = []
    result.forEach((arr3) => {
            if (arr3[arr3.length-1] <= sortMassivCh[sortMassivCh.length -1]) {
                mainResult.push(arr3);
            }
    })

    return mainResult;
}

const chislo3= 8; 
const massivChisel3= [7, 8, 3, 4, 5, 6, 1, 2, 10];
const result3= [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]];
console.log(chislo3, massivChisel3, result3);
console.log(sostavChisla(massivChisel3, chislo3));

const chislo1= 15; 
const massivChisel1= [7, 8, 3, 4, 5, 6, 1, 2];
const result1= [[1, 2, 3, 4, 5], [2, 3, 4, 6], [1, 3, 5, 6], [4, 5, 6], [1, 3, 4, 7], [1, 2, 5, 7], [3, 5, 7], [2, 6, 7], [1, 2, 4, 8], [3, 4, 8], [2, 5, 8], [1, 6, 8], [7, 8]];
console.log(chislo1, massivChisel1, result1);
console.log(sostavChisla(massivChisel1, chislo1));

const chislo= 99; 
const massivChisel= [8, 2, 3, 4, 6, 7, 1];
const result2= [];
console.log(chislo, massivChisel, result2);
console.log(sostavChisla(massivChisel, chislo));

function compareNumericArrays(arr1, arr2) {
    if(arr1.length !== arr2.length) {
      return false;
    }
    
    arr1 = [...arr1].sort();
    arr2 = [...arr2].sort();
    
    for(let i=0; i<arr1.length; i++) {
      if(arr1[i] !== arr2[i]) {
        return false;
      }
    }
    
    return true;
  }
  
  function compareArraysOfNumericArrays(arr1, arr2) {
    if(arr1.length !== arr2.length) {
      return false;
    }
    
    for(let el1 of arr1) {
      if(arr2.findIndex(el2 => compareNumericArrays(el1, el2)) < 0) {
        return false;
      }
    }
    
    return true;
  }


  runTests();
  
  function runTests() {
      const tests = [
      {
        chislo: 5, 
        massivChisel: [8, 2, 3, 4, 6, 7, 1],
        result: [[2, 3], [4, 1]]
      },
      {
        chislo: 99, 
        massivChisel: [8, 2, 3, 4, 6, 7, 1],
        result: []
      },
      {
        chislo: 8, 
        massivChisel: [1, 2, 3, 4, 5, 6, 7, 8],
        result: [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]]
      },
      {
        chislo: 8, 
        massivChisel: [7, 8, 3, 4, 5, 6, 1, 2],
        result: [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]]
      },
      {
        chislo: 15, 
        massivChisel: [7, 8, 3, 4, 5, 6, 1, 2],
        result: [[1, 2, 3, 4, 5], [2, 3, 4, 6], [1, 3, 5, 6], [4, 5, 6], [1, 3, 4, 7], [1, 2, 5, 7], [3, 5, 7], [2, 6, 7], [1, 2, 4, 8], [3, 4, 8], [2, 5, 8], [1, 6, 8], [7, 8]]
      },  
      
    ];
  
    let errors = 0;
    for(const test of tests) {
      let result;
      try{
        result = sostavChisla(test.massivChisel, test.chislo);
        
        if(!compareArraysOfNumericArrays(
            result, 
            test.result)
        ) {
          errors++;
          console.log('--------------------------------------------')
          console.log("failed for test", test, "Got result", result);
        }
      } catch(e) {
        errors++;
        console.log("failed for", test, 'exception', e.message);
      }    
    }
  
    if(errors === 0) {
      console.log('checkStringForBracects test successfuly completed');
    } else {
      console.log(`checkStringForBracects test failed with ${errors} errors`);
    }
  }
  
  