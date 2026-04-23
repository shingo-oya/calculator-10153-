"use strict";

const display = document.getElementById("display");  ;
let pushed_number  = false;
let pushed_operator  = false;
let pushed_change = false;
let sign_renda = false;
let lastinput = "number";
let display_value = "0";
let ope = ""
let firstnumber = "0";
let secondnumber = "0";
let result =""
//数字の入力

const inputNumber = (num) => {
   display_value = display.value;
   if(isNaN(Number(display_value))){return;};
if(pushed_number === false || display.value ==="0" || display.value ==="-0"){//初期と計算後
    (display.value ==="-0")? display_value = "-" + num:display_value = num;
    
    display.value = display_value;
    pushed_number = true;
    pushed_change = false;
    lastinput = "number";
    return;}

if(pushed_number === true){//数字が入力されている場合
    if(display_value>=0){//正の数
         if(!display_value.includes(".")){//小数点がない場合
            if(display_value.length>9){//整数部分が10桁を超えた場合
                display.value = display_value;
                pushed_number = true;
                pushed_change = false;
                lastinput = "number"
                return;
            }else{//整数部分が10桁以内の場合
                display_value += num
            }
    }else{//少数部分がある場合
         const parts = display_value.split(".");
         if(parts[1].length >7){//少数部分が8桁を超えた場合
            display.value = display_value;
            pushed_number = true;
            pushed_change = false;
            lastinput = "number"
            return;
         }else{//少数部分が8桁以内の場合
            display_value += num;
         };
        }; 
    }else{//負の数
        if(!display_value.includes(".")){//小数点がない場合
        if(display_value.length>10){//整数部分が-を含めて11桁を超えた場合
            display.value = display_value;
            pushed_number = true;
            pushed_change = false;
            lastinput = "number"
            return;
        }else{//整数部分が11桁以内の場合
            display_value += num
        }
}else{//少数部分がある場合
     const parts = display_value.split(".");
     if(parts[1].length >7){//少数部分が8桁を超えた場合
        display.value = display_value;
        pushed_number = true;
        pushed_change = false;
        lastinput = "number"
        return;
     }else{//少数部分が8桁以内の場合
        display_value += num;
     };
    };
}
display.value = display_value;
    pushed_number = true;
    pushed_change = false;
    lastinput = "number";
};
};

//計算の処理

 const calc = (a,b,ope) => {
   a = firstnumber;
   b = secondnumber;

  const toBigInt =(numStr) =>{
    const [intPart, decimalPart] = numStr.split(".");
    const fulllStr = intPart + (decimalPart || "").padEnd(8,"0");
 return BigInt(fulllStr);
};

 const aInt = toBigInt(a);
 const bInt = toBigInt(b);
 let resultInt =""
        if(ope === "+"){resultInt = aInt + bInt};
        if(ope ==="-"){resultInt = aInt - bInt};
        if(ope ==="×"){resultInt = aInt * bInt/100000000n};
        if(ope ==="÷"){bInt===0n ? resultInt = "Error" :resultInt = aInt*100000000n/ bInt};
   if(resultInt>=0n){
    const resultStr = resultInt.toString().padStart(9,"0");
    const intPart = resultStr.slice(0,-8);
    const decimalPart = resultStr.slice(-8);
    return`${intPart}.${decimalPart}`;
   }else{
    const resultStr = (-resultInt).toString().padStart(9,"0");
    const intPart = resultStr.slice(0,-8);
    const decimalPart = resultStr.slice(-8);
    return`-${intPart}.${decimalPart}`;
   }
    };

//計算の結果を小数点以下8桁にする
const calc_format = (a,b,ope) =>{
    if(calc(a,b,ope)===Infinity){return "Error";}
    if(calc(a,b,ope)===-Infinity){return "Error";}
    if(isNaN(Number(calc(a,b,ope)))){return "Error";}
    if(Number(calc(a,b,ope))>=0){
    if((calc(a,b,ope)).length >19){return "Error";}
    }else{
        if((calc(a,b,ope)).length >20){return "Error";}
    };
    return calc(a,b,ope).replace(/\.?0+$/,"").replace(/\.$/,"")
};

//演算子の処理
const calc_operator = (operator) => {
 
 if(isNaN(Number(display_value))){return};

 if(lastinput ==="CE" || lastinput ==="operator"){
    ope = operator;
   lastinput = "operator";
   display.value = display_value.replace(/(\.[0-9]*[1-9])0+$/,"$1").replace(/\.0+$/,"").replace(/\.$/,"").replace(/^-0$/,"0")
   return;
   };

   if(!pushed_operator){
    display_value =display.value
        firstnumber =display_value
        display.value = display_value.replace(/(\.[0-9]*[1-9])0+$/,"$1").replace(/\.0+$/,"").replace(/\.$/,"").replace(/^-0$/,"0")
    }else{
        display_value =display.value
        secondnumber =display_value;
        result =calc_format(firstnumber,secondnumber,ope);
        display.value = result
        firstnumber =result;
    };
       ope = operator;
       

    pushed_number =false;
    pushed_operator =true;
    lastinput ="operator";
};

//イコールの挙動を考える
const calc_equal = () => {
   
    if(isNaN(Number(display.value))){return};

if(lastinput === "percent"){return};

if(lastinput === "operator"){
 if(sign_renda === false){
    if(ope==="+" || ope==="-"){
        firstnumber ="0"; 
        secondnumber =display_value;
    }else if(ope==="×"){
        secondnumber =display_value;
    }else if(ope==="÷"){
        firstnumber ="1"; 
        secondnumber =display_value;
    }; 
 }else{
    if(ope === "+" || ope === "-"){
    firstnumber =secondnumber;
    secondnumber =display_value;
    }else if(ope === "×"){
        secondnumber =display_value;
    }else if(ope === "÷"){
        firstnumber ="1";
        secondnumber =display_value;
    }
    };
 result =calc_format(firstnumber,secondnumber,ope);
    display.value = result;
    firstnumber =result;
    pushed_change = false;
    pushed_number =false;
    pushed_operator =false;
    sign_renda = true;
    lastinput ="equal";
    return;
};

if(!pushed_operator){
    if(lastinput ==="equal"){//イコール連打
        display_value = display.value;
           firstnumber =display_value;
           result = calc_format(firstnumber,secondnumber,ope);
           display.value = result;  
      }else{
        if(ope===""){//何も押されてないとき
           pushed_number = false;
           display.value = display_value.replace(/(\.[0-9]*[1-9])0+$/,"$1").replace(/\.0+$/,"").replace(/\.$/,"").replace(/^-0$/,"0")
           firstnumber = "";
           secondnumber = "";
           ope = "";
           result = "";
           lastinput = "";

           return;
          }else{//演算子一回押されている定数計算
            display_value = display.value;
            firstnumber =display_value;
                result = calc_format(firstnumber,secondnumber,ope);
                display.value = result;
           };
      };        
  }else{//通常計算
    secondnumber =display_value;
    result=calc_format(firstnumber,secondnumber,ope);
    firstnumber =result;
    display.value = result
  };

lastinput ="equal"
pushed_number =false;
pushed_operator =false;
};
//ドットの挙動
const input_dot = () =>{
 display_value = display.value;
 if(isNaN(Number(display_value))){return;};
 
 if(display_value === "-0"){
    display_value = "-0.";
    display.value = display_value;
pushed_number =true;
pushed_change = false;
lastinput = "number";
return;
 }
  if(lastinput === "number"){//最後の入力が数字の場合
      if(display_value.includes(".")){//小数点がある場合
         return;
        }else{//小数点がない場合
            display_value +="."
        };
    }else{display_value ="0.";//最後の入力が数字以外の場合
    };
display.value = display_value;
pushed_number =true;
pushed_change = false;
lastinput = "number";
};

//+/-の挙動
const change_click = () =>{
    display_value = display.value;
 if(isNaN(Number(display_value))){return;};
if(lastinput === "root"){
    if(display_value.includes("-")){//負の場合
        display_value = display_value.replace("-","");
          }else{//正の場合
        display_value = "-" + display_value;
    } 
    display.value = display_value;
    lastinput = "change";
    return};

 if(lastinput === "operator"){//演算子の直後の場合

 if(display_value.includes("-")){//負の場合
    display_value = display_value.replace("-","");
}else{//正の場合
    display_value = "-" + display_value;
     }
   firstnumber = display_value;  
   display.value = display_value;
   pushed_change = true;
return;    
}else{//演算子の直後でない場合
    if(display_value.includes("-")){//負の場合
    display_value = display_value.replace("-","");
      }else{//正の場合
    display_value = "-" + display_value;
}
};
display.value = display_value;
;
};
//%の挙動
const calc_percent = (c,d,ope) => {
    c = firstnumber;
    d = secondnumber;
 
   const toBigInt =(numStr) =>{
     const [intPart, decimalPart] = numStr.split(".");
     const fulllStr = intPart + (decimalPart || "").padEnd(8,"0");
  return BigInt(fulllStr);
 };
 
  const cInt = toBigInt(c);
  const dInt = toBigInt(d);
  let resultInt =""
         if(ope === "+"){resultInt = cInt + (cInt*dInt)/(100n*100000000n)};
         if(ope ==="-"){resultInt = cInt - (cInt*dInt)/(100n*100000000n)};
         if(ope ==="×"){resultInt = (cInt * dInt)/(100n*100000000n)};
         if(ope ==="÷"){dInt===0n ? resultInt = "Error" :resultInt = cInt*100000000n*100n/ dInt};
    if(resultInt>=0n){
     const resultStr = resultInt.toString().padStart(9,"0");
     const intPart = resultStr.slice(0,-8);
     const decimalPart = resultStr.slice(-8);
     return`${intPart}.${decimalPart}`;
    }else{
     const resultStr = (-resultInt).toString().padStart(9,"0");
     const intPart = resultStr.slice(0,-8);
     const decimalPart = resultStr.slice(-8);
     return`-${intPart}.${decimalPart}`;
    }
     };

const calc_percent_format = (c,d,ope) => {
    if(calc_percent(c,d,ope)===Infinity){return "Error";}
    if(calc_percent(c,d,ope)===-Infinity){return "Error";}
    if(isNaN(Number(calc_percent(c,d,ope)))){return "Error";}
    if(Number(calc_percent(c,d,ope))>=0){
    if((calc_percent(c,d,ope)).length >19){return "Error";}
    }else{
        if((calc_percent(c,d,ope)).length >20){return "Error";}
    };
    return calc_percent(c,d,ope).replace(/\.?0+$/,"").replace(/\.$/,"")
};




const percent_click = () =>{
 display_value =display.value
 if(isNaN(Number(display_value))){return;};
  if(ope===""){//演算子が押されてないとき
    result ="0";
    }else{//演算子が押されているとき
    if(lastinput=== "percent"){//複利計算
       firstnumber=display_value;
       result=calc_percent_format(firstnumber,secondnumber,ope);
       }else{//通常計算,定数計算
            secondnumber =display.value;
            result =calc_percent_format(firstnumber,secondnumber,ope);
            };
        };
    display_value = result;
  display.value = display_value;
  pushed_number = false;
  pushed_operator = false;
  lastinput = "percent";
};
//ルートの挙動
const sqrt_click = () =>{
    display_value = isNaN(Number(display.value))? "Error":display.value;
const numStr = display_value
    const toBigInt =(numStr) =>{
    const [intPart, decimalPart] = numStr.split(".");
    const fullStr = intPart + (decimalPart || "").padEnd(8,"0");
 return BigInt(fullStr);
    };
let NumInt = toBigInt(numStr) * 100000000n;

    const bigIntSqrt = (num) => {
        if (num < 0n) return null;
        if (num < 2n) return num;
    
        let x = NumInt / 2n + 1n;
        let y = (x + NumInt / x) / 2n;
        while (y < x) {
            x = y;
            y = (x + NumInt / x) / 2n;
        };
        return x;
    }
    const rootBig = bigIntSqrt(NumInt);
    if (rootBig === null) {
        display.value = "Error";
        pushed_number = false; //数字追記できるか確認
        lastinput = "";
        return;
    };
    result = rootBig.toString().padStart(9,"0");
    const dotPos = result.length - 8;
    let results = result.slice(0, dotPos) + "." + result.slice(dotPos);
    
    display_value = results.replace(/(\.[0-9]*[1-9])0+$/,"$1").replace(/\.0+$/,"").replace(/\.$/,"").replace(/^-0$/,"0")
    display.value = display_value;
    pushed_number = false; 
    pushed_change = false;
    lastinput = "root";
};

//CEの挙動
const ce_click = () =>{
    display_value = display.value;
   if(lastinput === "equal" || lastinput === "percent"){
        if(display_value === "Error"){
           c_click();
           }else{
            return;
           };
       }else{
    if(ope ==="÷" || ope ==="×" || ope ==="+" || ope ==="-"){
      display_value = "0";
      display.value = display_value;
      pushed_number = false;
      lastinput = "CE";
    }else{
       c_click();
    };
    }
};
//Cの挙動
const c_click = () =>{
display_value = "0";
firstnumber = "";
secondnumber = "";
ope = "";
result = "";
pushed_number = false;
pushed_operator = false;
sign_renda = false;
lastinput = "number";
display.value = display_value;

};