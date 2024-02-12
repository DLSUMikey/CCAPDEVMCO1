


// 5 star system gacha chances make (-1 if not included)
var fiveSChance = 3;
var fourSChance = 13;
var threeSChance = 28;
var twoSChance = 58;

// HTML elements
const oneRoll = document.getElementById("oneRollButton");



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
    

    /*
    switch (star) {
        case 1:

            break;
        case 2:
            
            break;
        case 3:
            
            break;
        case 4:
            
            break;
        case 5:
            
            break;
        
    }
    */

})

