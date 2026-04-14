"use strict";

const display = document.getElementById("display");  ;
let pushed_number  = false;
let pushed_operator  = false;
let lastinput = "";
let display_value = "";
let ope = ""
let firstnumber = 0;
let secondnumber = 0;
let result =""
//数字の入力

const inputNumber = (num) => {
   display_value = display.value;
    if (pushed_number === false || display.value ==="0"){
        display_value = num
        }else{
        display_value += num;
        };
    
    display.value = display_value;
    pushed_number = true;
    lastinput = "number";
};

//計算の処理 書き換え・初回・二回目以降
const calc = (a,b,ope) => {
    a=Number(firstnumber);
    b=Number(secondnumber);
if(ope === "+"){return a + b;}
if(ope ==="-"){return a-b;}
if(ope ==="×"){return a*b}
if(ope ==="÷"){return a/b}
};

//演算子の処理
const calc_operator = (operator) => {
 display_value = display.value;
   
 if(lastinput ==="operator"){
   ope = operator;
   lastinput = "operator";
   return;
};
    if(!pushed_operator){
        firstnumber =display_value
        display.value = display_value;
    }else{
        secondnumber =display_value;
        result =calc(firstnumber,secondnumber,ope);
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
    display_value = display.value;
if(lastinput ==="equal"){
        firstnumber =display_value;
        result = calc(firstnumber,secondnumber,ope);
        display.value = result;
  };    
    if(!pushed_operator){
        firstnumber =display_value;
        display.value = display_value;
    }else{
        secondnumber =display_value;
        result=calc(firstnumber,secondnumber,ope);
        firstnumber =result;
        display.value = result;
    };

lastinput ="equal";
pushed_operator =false;
pushed_number =false;
};