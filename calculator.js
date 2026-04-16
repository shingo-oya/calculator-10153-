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
if(!display_value.includes(".")){
    display_value = display_value.slice(0,9);
}else{const parts = display_value.split(".");
    parts[0].length <11. && parts[1].length <9
    display_value = parts[0].slice(0,10) +"."+ parts[1].slice(0,7);
};
    if (pushed_number === false || display.value ==="0" || display.value ==="-0"){
        display_value = num
        }else{
        display_value += num;
        };

    display.value = display_value;
    pushed_number = true;
    lastinput = "number";
};

//計算の処理
const scale =1e6;

const scale_num = (num) =>{
    return (num*scale);
};
const unscale_num = (num) =>{
    return (num/scale);
}
const calc = (a,b,ope) => {
    a=Number(firstnumber);
    b=Number(secondnumber);
if(ope === "+"){return unscale_num(scale_num(a) + scale_num(b));}
if(ope ==="-"){return unscale_num(scale_num(a) - scale_num(b));}
if(ope ==="×"){return a * b}
if(ope ==="÷"){return a / b}
};
//計算の結果を小数点以下8桁にする
const calc_format = (a,b,ope) =>{
    if(calc(a,b,ope)===Infinity){return "Error";}
    if(calc(a,b,ope)===-Infinity){return "Error";}
    if(isNaN(calc(a,b,ope))){return "Error";}
    if(Math.abs(calc(a,b,ope)) >=1e10){return "Error";}
    return Number(calc(a,b,ope)).toFixed(8).replace(/\.?0+$/,"").replace(/\.$/,"")
};

//演算子の処理
const calc_operator = (operator) => {
 display_value =Number(display.value).toString()
 if(isNaN(Number(display_value))){return};

 if(lastinput ==="operator"){
   ope = operator;
   lastinput = "operator";
   display.value = display.value
   return;
};
    if(!pushed_operator){
        firstnumber =display_value
        display.value = display.value;
    }else{
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
    display_value = Number(display.value).toString();
    if(isNaN(Number(display.value))){return};

     
if(!pushed_operator){
    if(lastinput ==="equal"){
           firstnumber =display_value;
           result = calc_format(firstnumber,secondnumber,ope);
           display.value = result;  
      }else{
        if(ope===""){
           pushed_number = false;
           display.value = display.value;
           lastinput = "equal";
           return;
          }else{firstnumber =display_value;
                result = calc_format(firstnumber,secondnumber,ope);
                display.value = result;
           };
      };        
  }else{
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

  if(lastinput === "number"){
      if(display_value.includes(".")){
         return;
        }else{
         display_value +=".";
        };
    }else{display_value ="0.";
    };
display.value = display_value;
pushed_number =true;
};

//+/-の挙動
const change_click = () =>{
    display_value = display.value;
 if(isNaN(Number(display_value))){return;};

 if(display_value.includes("-")){
    display_value = display_value.replace("-","");
}else{
    display_value = "-" + display_value;
}
display.value = display_value;
lastinput ="number";
}
//%の挙動
const calc_percent = (c,d,ope) => {
    c=Number(firstnumber);
    d=Number(secondnumber);
if(ope ==="+"){return c+c*d/100;};
if(ope ==="-"){return c-c*d/100;};
if(ope ==="×"){return c*d/100;};
if(ope ==="÷"){return c/(d/100);};
}
const calc_percent_format = (c,d,ope) => {
    if(calc_percent(c,d,ope)===Infinity){return "Error";}
    if(calc_percent(c,d,ope)===-Infinity){return "Error";}
    if(isNaN(calc_percent(c,d,ope))){return "Error";}
    if(Math.abs(calc_percent(c,d,ope)) >=1e10){return "Error";}
    return Number(calc_percent(c,d,ope)).toFixed(8).replace(/\.?0+$/,"").replace(/\.$/,"")
};


const percent_click = () =>{
 display_value =display.value
 if(isNaN(Number(display_value))){return;};
  if(ope===""){
    result ="0";
    }else{
    if(lastinput=== "percent"){//複利計算
       firstnumber=display_value;
       result=calc_percent_format(firstnumber,secondnumber,ope);
       }else{
            if(!pushed_operator){//定数計算
            firstnumber =display_value;
            result =calc_percent_format(firstnumber,secondnumber,ope);
            }else{//通常計算
            secondnumber =display.value;
            result =calc_percent_format(firstnumber,secondnumber,ope);
            };
        };
    };
  display.value = result;
  pushed_number = false;
  pushed_operator = false;
  lastinput = "percent";
};
//ルートの挙動
const sqrt_click = () =>{
    display_value = (isNaN(Number(display.value))? "Error":
    Number(display.value).toFixed(8).replace(/\.?0+$/,"").replace(/\.$/,""));
   
 result =Math.sqrt(Number(display_value));
 display_value = isNaN(result) ? "Error" : Number(result).toFixed(8).replace(/\.?0+$/,"").replace(/\.$/,"");
 display.value = display_value;
 pushed_number = false; //数字追記できるか確認
 lastinput = "";
};

//CEの挙動
const ce_click = () =>{
    display_value = display.value;
display_value = "0";
display.value = display_value;
pushed_number = false;
lastinput = "number";
};
//Cの挙動
const c_click = () =>{
display_value = "0";
firstnumber = "0";
secondnumber = "0";
ope = "";
result = "";
pushed_number = false;
pushed_operator = false;
lastinput = "";
display.value = display_value;
};