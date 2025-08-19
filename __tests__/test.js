// const result = [
//   {
//     studentAverage: 89
//   },
//   {
//     studentAverage: 88
//   },
//   {
//     studentAverage: 88
//   },
//   {
//     studentAverage: 90
//   },
//   {
//     studentAverage: 42
//   },
//   {
//     studentAverage: 45
//   },
//   {
//     studentAverage: 45
//   },
//   {
//     studentAverage: 50
//   }
// ];

// const resultWithBracket = () => {
//   const updatedResult = [];
//   const sortedResult = result.sort((a, b) => b.studentAverage - a.studentAverage);
//   console.log("result", result);
//   console.log("sortedResult", sortedResult);
//   let position = 1;
//   let firstPosition = sortedResult[0]
//   firstPosition.position = 1;
//   updatedResult.push(firstPosition);
//   for(let i = 1; i < sortedResult.length; i++) {
//     if(sortedResult[i].studentAverage == sortedResult[i - 1].studentAverage) {
//       sortedResult[i].position = position;
//     } else {
//       position += 1;
//       sortedResult[i].position = position;
//     }
//   }
//   console.log(sortedResult);
// }

// resultWithBracket();



//1. a function that accepts a number and returns the factorial of that number
function factorial(n) {
  if (n < 0) {
    return 'Factorial is not defined for negative numbers.';
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(4));

//2.  a function that accepts an array of numbers and returns the largest number in the array
function largestNumber(arr) {
  if (arr.length === 0) {
    return null;
  }
  let largest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  return largest;
}

console.log(largestNumber([2,3,6,8,4]));

//3. a function that accepts a string and returns the number of consonants in that string
function countConsonants(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;

    for (let char of str.toLowerCase()) {
        if (char >= 'a' && char <= 'z' && !vowels.includes(char)) {
            count++;
        }
    }

    return count;
}

console.log(countConsonants("hello"));

//4. a function that accepts a number and returns the multiplication table for that number up to 12
function multiples(num) {
  const table = [];
  for (let i = 1; i <= 12; i++) {
    table.push(`${num} x ${i} = ${num * i}`);
  }
  return table.join('\n');
}

console.log(multiples(5));

//5. a function that accepts two parameters, a string and a callback function
function myFunction(str, callback) {
  const reversed = str.split('').reverse().join('');
  callback(reversed);
}

function revString(s) { // a callback function that receives and print the reversed form of the string passed to its parent function
  console.log(s);
}

myFunction("hello", revString)