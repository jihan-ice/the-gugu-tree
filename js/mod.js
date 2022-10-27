let modInfo = {
	name: "鸽子窝之树α",
	id: "gugugu0",
	author: "极寒",
	pointsName: "咕咕点",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "",
}

let changelog = `<h1>更新记录:</h1><br>
	<h3>v0.1</h3><br>
		- 添加极寒节点.<br>
    <h3>v0.2</h3><br>
        - 添加只秋节点.<br>   - 添加华节点.<br>`

let winText = `恭喜通关!您已经完成了这个游戏.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	let gain = new ExpantaNum(0)
	if(hasUpgrade('ice', 11)) gain = gain.add(1)
	if(hasUpgrade('ice', 12)) gain = gain.mul((upgradeEffect('ice', 12)))
	if(hasUpgrade('ice', 13)) gain = gain.mul((upgradeEffect('ice', 13)))
	if(hasUpgrade('fall', 11)) gain = gain.mul((upgradeEffect('fall', 11)))
	if(hasUpgrade('fall', 13)) gain = gain.mul((upgradeEffect('fall', 13)))
	gain = gain.mul(layers.fall.clickables[12].gain())
	gain = gain.mul(layers.fall.clickables[21].gain())
	if(hasUpgrade('ice', 21)) gain = gain.pow((upgradeEffect('ice', 21)))
	if(gain>1e10) gain = ((gain.sub(1e10)).pow(0.8)).add(1e10)
	if(gain>1e20) gain = ((gain.sub(1e20)).pow(0.775)).add(1e20)
	if(gain>1e50) gain = ((gain.sub(1e50)).pow(0.75)).add(1e50)
	if(gain>1e80) gain = ((gain.sub(1e80)).pow(0.725)).add(1e80)
	if(gain>1e100) gain = ((gain.sub(1e100)).pow(0.7)).add(1e100)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}