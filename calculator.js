"use strict";
let firstnumber = 0;//最初の数字
let secondnumber = 0;//次の数字
let operator = "";//演算子
let pushed_operator = false;//演算子押したかどうか
let pushed_equal = false;
let lastinput ="";
const display = document.getElementById("display");
let result = ""


//数字ボタンの処理
function inputNumber(num){
 let current = display.value;
  if(lastinput === "operator"  || current ==="0" || current === "Error"){
             current = num;
       }else{current += num;
       };
 lastinput = "number";

 if(current.length > 10){
  current = "Error"
 }
 display.value = current;
 };
//計算と表示を考える。

const scale =1e8;

function scale_number(num){
  return Math.round(num*scale);
};
function unscale_number(num){
  return num/scale;
};

function calc(){
  let a = Number(firstnumber);
  let b = Number(secondnumber);
  let ope = operator;
if(Math.abs(a)>=1e6 || Math.abs(b)>=1e6){
  if (ope ==="+"){result = a+b;}
  else if(ope === "-"){result = a-b;}
  else if(ope === "×"){result = a*b;}
  else if(ope === "÷"){result = a/b;}
}else{ 
  if(ope === "+"){result =unscale_number(scale_number(a)+ scale_number(b));}
  else if(ope === "-"){result = unscale_number(scale_number(a)- scale_number(b));}
  else if(ope === "×"){result = unscale_number(scale_number(a)* scale_number(b)/scale);}
  else if(ope === "÷"){ result = unscale_number((scale_number(a)/ scale_number(b))*scale);
                      }else{result = firstnumber;
  };
};   
  display.value = result;
};
function format_result(){
let result = display.value;
  if(Math.abs(result)>=1e10 ){
  result ="Error";
   }else if(result === "Infinity" || result === "-Infinity" || result === "NaN"){
    result = "Error";
   }else{
    result = Number(result).toFixed(8).replace(/\.?0+$/,"");
    };
    display.value = result;
  };
//演算子の処理
function calc_operator(val){
 let current = display.value;

 if(lastinput === "operator"){
    operator = val;
    firstnumber = Number(current);
    pushed_operator = true;
    pushed_equal = false;
  return };

 if(pushed_operator === false) {
    current = current.replace(/\.0+$/,"").replace(/\.$/,"");
      display.value = current
    firstnumber = Number(current); 
    
 }else{
      secondnumber = Number(current);
      calc();
      format_result();
    
      firstnumber = result;
 };
  operator = val;
  pushed_operator = true;
  pushed_equal = false;
  lastinput = "operator";

  };
//＝の処理を考える

function calc_result(){
 let current = display.value;


 if(pushed_equal === true){
  firstnumber = Number(current);
  calc();
  format_result();

  firstnumber = Number(current);
  lastinput = "operator";
  pushed_equal = true;
  return;
 };

if(pushed_operator === false){

  current = current.replace(/\.0+$/,"").replace(/\.$/,"");
      display.value = current
  firstnumber = Number(current);
}else{
 secondnumber =Number(current);
 
 calc(); 
 format_result();;
      firstnumber = Number(result);
      lastinput = "operator";
      pushed_operator = true;
};
pushed_equal = true;
};
//dotの処理を考える
function calc_dot(val){
  let current = display.value;
  
  if(lastinput == "operator"){
       current = "0.";
    }else if(current.indexOf(".")<0 ){
      current += ".";
    };
    lastinput = "number";
    display.value = current;


  };
//Cボタンの処理を考える
function c_click(){
 let current = display.value;
  current = "0"; 
  firstnumber = 0;
  secondnumber = 0;
  result ="",
  operator = ""; 
  lastinput = "";
  pushed_operator = false;
  pushed_equal = false;
  display.value = current;
};
//CEボタンの処理を考える
function ce_click(){
let current = display.value;

   current ="0";

display.value = current;
};
//+/-ボタンの処理を考える。演算結果の負の入れ替えに対応していない。
function change_click(){
let current = Number(display.value);
let result = 0;
result =current *-1;
display.value = result;

};

//√の処理を考える
function sqrt_click(){
let current = display.value;
let result = 0;
result = Math.sqrt(Number(current));
if(isNaN(result)){
  result = "Error";
}else{
  result = result.toFixed(8).replace(/\.?0+$/,"");
}
display.value = result;
};

//％の処理を考える。 
function percent_click(){
 
let current = display.value;
  secondnumber =  Number(current);

    if(operator === "+"){
        result = firstnumber + firstnumber *(secondnumber/100);
      }else if(operator === "-"){
        result = firstnumber - firstnumber *(secondnumber/100);
      }else if(operator === "×"){
       result = firstnumber * (secondnumber/100);
      }else if(operator === "÷"){
       result = firstnumber / (secondnumber/100);
      }else if(operator === ""){
        result ="0"};

  format_result();
  display.value = result;
  current = Number(result);
  firstnumber = current;
   
    lastinput ="operator";
  };


//桁と＋/-と％の処理明日中に考える