'use strict'
// 1行目に記載している 'use strict' は削除しないでください



// <h1>土地選び</h1>
// <input type="radio" name="土地選び" value="13181182">名古屋市中区
// <input type="radio" name="土地選び" value="941597">名古屋市名東区
// <input type="radio" name="土地選び" value="903423">名古屋市天白区
// <input type="radio" name="土地選び" value="528925">名古屋市港区
// <input type="radio" name="土地選び" value="645661">刈谷市
// <input type="radio" name="土地選び" value="658045">長久手市
// <input type="radio" name="土地選び" value="679889">豊田市
// <input type="radio" name="土地選び" value="623140">岡崎市
// <input type="radio" name="土地選び" value="548333">豊橋市
// <input type="radio" name="土地選び" value="282231">碧南市
// <input type="radio" name="土地選び" value="213186">田原市
// <input type="radio" name="土地選び" value="11933">豊根村


// <h1>ハウスメーカー</h1>
//         <p>スウェーデンハウス</p>100万
//         <p>住友林業</p>100万
//         <p>ヘーベルハウス</p>100万
//         <p>積水ハウス</p>100万
//         <p>セキスイハイム</p>85万
//         <p>トヨタホーム</p>70万
//         <p>大和ハウス</p>95万
//         <p>パナソニックホームズ</p>80万
//         <p>タマホーム</p>50万
//         <p>一条工務店</p>80万
//         <p>三井ホーム</p>100万
//         <p>住友不動産</p>
//         <p>ミサワホーム</p>80万
//         <p>ヤマダホームズ</p>
// </body>
let areaName;
let areaValue;
let houseValue;
let landValue;
let properValue;
let introValue;
let landTotal;
let houseTotal;
let discount;
let allTotal;

// 即時実行
const questionArea =function(){
    // 1.エリア情報を取得 
    areaValue = localStorage.getItem("areaValue");
    // エリアと値段に分ける
    areaName = areaValue.split(":")[0];
    console.log('areaName: ', areaName);
    areaValue = areaValue.split(":")[1];
    console.log('areaValue: ', areaValue);

    // 選択中のエリアに記入する
    const questionArea = document.getElementById("question-area");
    questionArea.innerText = "選択中のエリア: " + areaName;

}();



function test2(e){
    areaValue = e.target.value;
    localStorage.setItem("areaValue", areaValue);
}




function result(){
    

    // ダイアログに表示させる準備をする
    const dialog = document.getElementById("dialog_ex1");
    const dialogElement = document.getElementsByClassName('dialog-comment');
    
    // 1.エリアを調査
    
    // for (let i=0; i<areaElements.length ;i++){
    //     if(areaElements.item(i).checked){
    //         areaValue = areaElements.item(i).value;
    //         // console.log('areaValue: ', areaValue);
    //     }
    // }
    
    // 2.土地を調査
    const landElements = document.getElementsByName("land");
    
    for (let i=0; i<landElements.length ;i++){
        if(landElements.item(i).checked){
            landValue = landElements.item(i).value;
            console.log('landValue: ', landValue);
        }
    }
    
    // 3.ハウスメーカーを調査
    const houseElements = document.getElementsByName("house");
    
    for (let i=0; i<houseElements.length ;i++){
        if(houseElements.item(i).checked){
            houseValue = houseElements.item(i).value;
            console.log('houseValue: ', houseValue);
        }
    }

    // 4.ハウスメーカーを調査
    const properElements = document.getElementsByName("proper");
    
    for (let i=0; i<properElements.length ;i++){
        if(properElements.item(i).checked){
            properValue = properElements.item(i).value;
            console.log('properValue: ', properValue);
        }
    }
    
    // 5.ハウスメーカーを調査
    const introElements = document.getElementsByName("intro");

    for (let i=0; i<introElements.length ;i++){
        if(introElements.item(i).checked){
            introValue = introElements.item(i).value;
            console.log('introValue: ', introValue);
        }
    }



    // 取得した情報から計算してみる
    // 土地
    landTotal = areaValue * landValue;
    // 家
    houseTotal = houseValue * landValue;
    // 家に消費税を掛ける
    houseTotal = houseTotal + (houseTotal*0.1);
    // 家に諸費用を足す
    houseTotal = houseTotal + 700000;
    // 家のお値引き
    discount = (houseTotal*properValue) + (houseTotal*introValue);

    // 合計
    allTotal = landTotal + houseTotal - discount;

    if(discount>0){
        discount = discount * -1;
        dialogElement[2].style.color = "red";
    }
    // 全て円に計算
    houseTotal = `${new Intl.NumberFormat("ja-JP",{ notation: "compact"}).format(BigInt(houseTotal))}円`
    landTotal = `${new Intl.NumberFormat("ja-JP",{ notation: "compact"}).format(BigInt(landTotal))}円`
    discount = `${new Intl.NumberFormat("ja-JP",{ notation: "compact"}).format(BigInt(discount))}円`
    allTotal = `${new Intl.NumberFormat("ja-JP",{ notation: "compact"}).format(BigInt(allTotal))}円`


    console.log('houseTotal: ', houseTotal);
    console.log('landTotal: ', landTotal);
    console.log('discount: ', discount);
    console.log('allTotal: ', allTotal);

    // alert(
    //     "家の金額"+houseTotal +"\n"
    //     + "\n土地の金額" + landTotal + "\n"
    //     + "\n総額" + allTotal
    // );


    // 家の金額を記入する
    dialogElement[0].innerText = houseTotal;
    // 土地の金額を記入する
    dialogElement[1].innerText = landTotal;
    // 合計を記入する
    dialogElement[2].innerText = discount;
    // 合計を記入する
    dialogElement[3].innerText = allTotal;

    // ダイアログ表示
    dialog.showModal();

}


// ボタンを起動したときにイベント発生
const checkButton = document.getElementById("check");

checkButton.addEventListener("click",result);

