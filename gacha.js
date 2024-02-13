


// 5 star system gacha chances make (-1 if not included)
var fiveSChance = 3;
var fourSChance = 13;
var threeSChance = 28;
var twoSChance = 58;

// HTML elements
const oneRoll = document.getElementById("oneRollButton");
const rewardScreen = document.getElementById("rewardScreen");
const oneS = document.getElementById("oneS");
const twoS = document.getElementById("twoS");
const threeS = document.getElementById("threeS");
const fourS = document.getElementById("fourS");
const fiveS = document.getElementById("fiveS");






function roll(){
    let dice = Math.floor((Math.random()*100)+1);
    let star = 0;
    

    if(dice <= fiveSChance){
        fiveSChance = 3;
        star = 5;
    } else if (dice <= fourSChance){
        fourSChance = 13;
        star = 4;
    } else if (dice <= threeSChance){
        star = 3;
    } else if (dice <= twoSChance){
        star = 2;
    } else {
        star = 1;
    }



    return star;
}


//how many rolls
oneRoll.addEventListener('click', (e) =>{

    
    let star = roll();
    console.log(star)

    
    switch (star) {
        case 1:
            rewardScreen.style.display = "flex";
            oneS.style.display = "flex";
            break;
        case 2:
            rewardScreen.style.display = "flex";
            twoS.style.display = "flex";
            break;
        case 3:
            rewardScreen.style.display = "flex";
            threeS.style.display = "flex";
            break;
        case 4:
            rewardScreen.style.display = "flex";
            fourS.style.display = "flex";
            break;
        case 5:
            rewardScreen.style.display = "flex";
            fiveS.style.display = "flex";
            break;
        
    }
    

})

rewardScreen.addEventListener('click', (e) =>{
    rewardScreen.style.display = "none";
    oneS.style.display = "none";
    twoS.style.display = "none";
    threeS.style.display = "none";
    fourS.style.display = "none";
    fiveS.style.display = "none";

    console.log("click")
})

