/** @param {NS} ns */
export async function main(ns) {
	let currentMoney = ns.getServerMoneyAvailable("home");
	let serverList = ns.getPurchasedServers();
	let serverAmount = serverList.length;

	let serverIndex = 0;
	
	let maxServerRam = ns.getPurchasedServerMaxRam()

	let upgradeCost;

	while (true) {
		let myRam = 2;
		let multiplier = 1;

		if (ns.serverExists(serverList[serverIndex])) {
			upgradeCost = ns.getPurchasedServerUpgradeCost(serverList[serverIndex], myRam ** multiplier);
		}

		if (currentMoney >= upgradeCost && myRam ** multiplier < maxServerRam && serverIndex < serverAmount) {
			await ns.sleep(250);
			multiplier++;
			ns.print("increased to ram: " + myRam ** multiplier);
		} else if (currentMoney >= upgradeCost && myRam ** multiplier < maxServerRam && serverIndex < serverAmount){
			await ns.sleep(250);
			ns.upgradePurchasedServer(serverList[serverIndex], myRam ** multiplier)
			ns.alert("successfully upgraded ram to: " + myRam ** multiplier + "on: " + serverList[serverIndex])
			multiplier = 1;
			serverIndex++;	
		} else {
			return false;
		}
	}
}