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

const profile = document.getElementById("profile"); //Copy over
const profileText = document.getElementById("profileText"); //Copy over
const errorLog = document.getElementById("errorLog"); //Copy over
var profileLink //Copy over
var userID //Copy over
var loggedIN //Copy over//New~!

const readItemDatas = async () => {
    let itemDataR = await fetch('http://localhost:3000/items');
    let itemData = await itemDataR.json();
    return itemData;
}

function getItemIndex(itemDatas) {//Important copy over
    let i;
    let userID = localStorage.getItem("currentUserID")
    for(i=0; i<itemDatas.length; i++){
        console.log(itemDatas[i].userID)
        if(userID == itemDatas[i].userID){
            return i;
        }
    }
    return -1;
}

const readData = async () => {
    let rollDataR = await fetch('http://localhost:3000/userdatas/' + userID)
    let rollData = await rollDataR.json();
    return rollData;
};

async function updateCurrency(){
    let UserData = await readData()
    $('#rolls').text("Rolls: " + UserData.Rolls.toString())
    $('#credits').text("¢: " + UserData.credits.toString())
}

async function roll(){
    let dice = Math.floor((Math.random()*100)+1);
    let star = 0;
    let rollData = await readData();

    console.log(rollData.fiveStarPity)

    rollData.fiveStarPity++;
    rollData.fourStarPity++;
    rollData.TotalRolls++;
    rollData.Rolls--;


    if(rollData.fiveStarPity == 100){
        fiveSChance = 100;
    }
    if(rollData.fourStarPity == 10){
        fourSChance = 100;
    }

    if(dice <= fiveSChance){
        rollData.fiveStarPity = 0;
        fiveSChance = 3;
        star = 5;
    } else if (dice <= fourSChance){
        rollData.fourStarPity = 0;
        fourSChance = 13;
        star = 4;
    } else if (dice <= threeSChance){
        star = 3;
    } else if (dice <= twoSChance){
        star = 2;
    } else {
        star = 1;
    }

    fetch(('http://localhost:3000/userdatas/' + userID), {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "fiveStarPity" : rollData.fiveStarPity,
            "fourStarPity" : rollData.fourStarPity,
            "Rolls" : rollData.Rolls,
            "TotalRolls" : rollData.TotalRolls
        })
    })



    return star;
}


//how many rolls
oneRoll.addEventListener('click', async (e) =>{
    let userData = await readData()
    
    let newCharacter = {//Index + quantity is not here
        itemName: ["catWhite", "catGreen", "catBlue", "catEpic", "catLegend"],
        itemDesc: ["common cat", "uncommon cat", "rare cat", "epic cat", "chiyo's dad"],
        itemPrice: [200, 500, 1000, 3000, 10000],
        itemIMG: ["Chiyo-Chichi.png", "Chiyo-Chichi.png", "Chiyo-Chichi.png", "Chiyo-Chichi.png", "Chiyo-Chichi.png"],
        itemRarity: [1, 2, 3, 4, 5]
    }

    if(loggedIN == true && userData != null) {
        if(userData.Rolls > 0) {
            let star = await roll();
            console.log(star)
            switch (star) {//refactor soonto get Chars from DB
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
            //Add Update for Roll + Credit value ammount

            let i, found = -1;
            let itemRaw = await readItemDatas();
            let index = getItemIndex(itemRaw);

            if(index != -1){
                let Items = itemRaw[index]
                let collection = Items.itemIndex.length
                for(i=0;i<collection;i++){
                    if(newCharacter.itemName[star-1] == Items.itemName[i]){
                        found = i
                    }
                }
                if(found != -1){
                    Items.itemCount[found]++
                } else {
                    Items.itemName.push(newCharacter.itemName[star-1])
                    Items.itemDesc.push(newCharacter.itemDesc[star-1])
                    Items.itemPrice.push(newCharacter.itemPrice[star-1])
                    Items.itemCount.push(1)
                    Items.itemIMG.push(newCharacter.itemIMG[star-1])
                    Items.itemRarity.push(newCharacter.itemRarity[star-1])
                    Items.itemIndex.push(collection)
                }

                fetch(('http://localhost:3000/items/' + Items._id), {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "itemName": Items.itemName,
                        "itemDesc": Items.itemDesc,
                        "itemPrice": Items.itemPrice,
                        "itemCount": Items.itemCount,
                        "itemIMG": Items.itemIMG,
                        "itemRarity": Items.itemRarity,
                        "itemIndex": Items.itemIndex
                    })
                })
                updateCurrency()

            } else {
                console.log("ERROR")
            }
        }
    }
})

oneRoll.addEventListener('mouseover', async (e) =>{
    let userData = await readData()
    if(loggedIN == false || userData == null) {
        oneRoll.textContent = "Sign in before rolling"
        console.log("no user")
        profileText.textContent = "Sign in"
        profileLink = "FindAcc.html"
        loggedIN = false
    }
    if(userData.Rolls < 1) {
        oneRoll.textContent = "Insufficent Rolls"
    }
})

oneRoll.addEventListener('mouseout', async (e) =>{
    oneRoll.textContent = "Collect a prize!"
})

rewardScreen.addEventListener('click', (e) =>{
    rewardScreen.style.display = "none";
    oneS.style.display = "none";
    twoS.style.display = "none";
    threeS.style.display = "none";
    fourS.style.display = "none";
    fiveS.style.display = "none";
    $("#profilePop").css("display", "none")

})

//bring up
async function loadProfile(){
    let userData = await readData()
    $("#profilePop").css("display", "block")
    $("#rewardScreen").css("display", "flex")
    $("#username").text(userData.userName)
    
    
    if (userData.email != null){
        $("#email").text(userData.email)
    } else {
        $("#email").text("Email not Verified")
    }
    $("#tasks").text("Tasks completed: " + userData.TotalTasksCompleted)
    $("#totalRolls").text("Total Rolls: " + userData.TotalRolls)
}

//copy over
profile.addEventListener('click', (e) =>{
    if(loggedIN == false){
        window.location.href = profileLink
    }else {
        loadProfile()
    }
    
})

//copy over new!
window.onload = async function() {
    userID = localStorage.getItem("currentUserID")
    if (userID != null) {
        let userData = await readData()
        if(userID == userData._id) {//checks if no changes have been made
            console.log(localStorage.getItem("currentUserID"))
            profileText.textContent = userData.userName
            loggedIN = true
            
            profileLink = "FindAcc.html"//change to Profile.html

            updateCurrency()
        } else {
            console.log("Error")
            profileText.textContent = "Sign in"
            profileLink = "FindAcc.html"
            loggedIN = false
        }
            
    } else {
        console.log("no user")
        profileText.textContent = "Sign in"
        profileLink = "FindAcc.html"
        loggedIN = false
    }

};
