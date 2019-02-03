//header

var result = document.querySelector('.seeresult');
var reload = document.querySelector('.icon');
var data = JSON.parse(localStorage.getItem('health')) || [];


result.addEventListener('click', BMI,{once: true}); //只執行一次
reload.addEventListener('click', reloading);
update(data);

function BMI(e){
    var heightvalue = document.querySelector('.heighttext').value / 100;
    var weightvalue = document.querySelector('.weighttext').value;
    var resulticon = document.querySelector('.icon');
    var resultbmiicon = document.querySelector('.smalltag');
    var evaluate = document.querySelector('.evaluate');
    var bmivalue = weightvalue / (heightvalue * heightvalue);
    if(heightvalue = '' || weightvalue == ''){
        return
    }else if(bmivalue<18.5){  //樣式
        result.style.backgroundColor = 'transparent';
        result.style.color = '#31baf9';
        result.style.borderColor = '#31baf9';
        resulticon.style.backgroundColor = "#31baf9";
        resultbmiicon.style.color = '#31baf9';
        evaluate.style.color = '#31baf9';
        evaluate.textContent = '過輕';
        resultbmiicon.style.opacity = 1;
        resulticon.style.opacity = 1;
        evaluate.style.opacity = 1;
    }else if(bmivalue>18.5 && bmivalue<=25){
        result.style.backgroundColor = 'transparent';
        result.style.color = '#86d73f';
        result.style.borderColor = '#86d73f';
        resulticon.style.backgroundColor = "#86d73f";
        resultbmiicon.style.color = '#86d73f';
        resulticon.style.opacity = 1;
        evaluate.style.opacity = 1;
        evaluate.style.color = '#86d73f';
        evaluate.textContent = '正常';
    }else if(bmivalue>25 && bmivalue<=30){
        result.style.backgroundColor = 'transparent';
        result.style.color = '#ff982d';
        result.style.borderColor = '#ff982d';
        resulticon.style.backgroundColor = "#ff982d";
        resultbmiicon.style.color = '#ff982d';
        resulticon.style.opacity = 1;
        evaluate.style.opacity = 1;
        evaluate.style.color = '#ff982d';
        evaluate.textContent = '過重';
    }else if(bmivalue>30 && bmivalue<=35){
        result.style.backgroundColor = 'transparent';
        result.style.color = '#ff6c03';
        result.style.borderColor = '#ff6c03';
        resulticon.style.backgroundColor = "#ff6c03";
        resultbmiicon.style.color = '#ff6c03';
        resulticon.style.opacity = 1;
        evaluate.style.opacity = 1;
        evaluate.style.color = '#ff6c03';
        evaluate.textContent = '中度肥胖';
    }else{
        result.style.backgroundColor = 'transparent';
        result.style.color = '#ff1200';
        result.style.borderColor = '#ff1200';
        resulticon.style.backgroundColor = "#ff1200";
        resultbmiicon.style.color = '#ff1200';
        resulticon.style.opacity = 1;
        evaluate.style.opacity = 1;
        evaluate.style.color = '#ff1200';
        evaluate.textContent = '嚴重肥胖';
    }
    var bmiresult = bmivalue.toFixed(2);
    result.textContent = bmiresult; //小數點取位
    result.style.cursor = 'auto';
}


var bmilist = document.querySelector('.bmilist');

//center
function update(item){
    var bmilist = document.querySelector('.bmilist');
    var str ='';
    var date = new Date(); //日期
    for(var i=0; i<item.length; i++){
        var content = 
        '<li data-num='+i+' style = "border-color:'+data[i].color+'">\
            <span class="firstword">'+data[i].eva+'</span>\
            <span class="bmili">BMI</span>\
            <span class="bmivalue">'+item[i].bmi+'</span>\
            <span class="weightli">weight</span>\
            <span class="weightvalue">'+item[i].weight+'</span>\
            <span class="heightli">height</span>\
            <span class="heightvalue">'+item[i].height+'</span>\
            <span class="dateli">'+date.getMonth()+1+'-'+date.getDate()+'-'+date.getFullYear()+'</span>\
            <div class="delete" data-num='+i+'>移除</div>\
        </li>'
        str+= content;
    }
    bmilist.innerHTML = str;
}


function reloading(){
    window.location.reload('file:///Users/mazusu/Desktop/bmi/index.html'); //重新整理
}

bmilist.addEventListener('click', del); //刪除LI


function del(e){
    var select = e.target.nodeName;
    // console.log(e.target.nodeName);
    if(select == 'LI' || select == 'SPAN' ){
        return
    }
    data.splice(e.target.dataset.num, 1);
    update(data);
    localStorage.setItem('health', JSON.stringify(data));
}


var btn = document.querySelector('.btn'); //紀錄按鈕


btn.addEventListener('click', btnevent);

var evaluate = document.querySelector('.evaluate');

function btnevent(e){
    var height = document.querySelector('.heighttext').value;
    var weight = document.querySelector('.weighttext').value;
    var bmiresult = result.textContent;
    var setcolor = result.style.color; //取顏色值
    var seteva = evaluate.textContent;
    if(height =='' || weight == '' || result.textContent == "看結果"){
        return;
    }else{
        var healthlist = {
            bmi: bmiresult,
            height: height,
            weight: weight,
            color: setcolor,
            eva: seteva 
        };
        data.push(healthlist); //放值
        update(data); //刷新data內容
        localStorage.setItem('health', JSON.stringify(data)); 
    }
}