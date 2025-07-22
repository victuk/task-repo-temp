function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5));

function largestNumber(arr){
   let max = arr[0]
   for(let i = 1; i < arr.length; i++){
   if(arr[i] > max){
      max = arr[i]
   }

 }
 return max
}


function countConsonants(string) {
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        let count = 0;
      
        for (let i = 0; i < string.length; i++) {
          const char = string[i].toLowerCase();
      
          if (char >= 'a' && char <= 'z' && !vowels.includes(char)) {
            count++;
          }
        }
      
        return count;
      }
      
   console.log(countConsonants("hello"));
   
function multiplyNumbers(num){
     for(let i = 1; i <= 12 ; i++){
        console.log(`${num} X  ${i} = ${num * i}`)
     }
  }
 
 multiplyNumbers(2);
 
function reversedString(string, callBack){
    const reversed = string.split('').reverse().join('')
     return callBack(reversed)

  }

  function callBackFunction(callMe){
    console.log(callMe)
  }

  reversedString("hello", callBackFunction);