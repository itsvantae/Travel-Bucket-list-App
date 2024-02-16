import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-bda01-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const bucketListInDB = ref(database, "planToVisit")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const bucketListEl = document.getElementById("plan-to-visit")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(bucketListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(bucketListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearBucketListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToBucketListEl(currentItem)
        }    
    } else {
        bucketListEl.innerHTML = "No items here... yet"
    }
})

function clearBucketListEl() {
    bucketListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToBucketListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `planToVisit/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    bucketListEl.append(newEl)
}