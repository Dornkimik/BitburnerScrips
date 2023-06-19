/** @param {NS} ns */
export async function main(ns) {
	let currentMoney = ns.getServerMoneyAvailable("home");
	
	let myServer = ns.args[0];

	let percentage = ns.args[1];
	
	let upgradeCost;
	let currentServerRam;

	let multiplier = 1;

	let maxServerRam = ns.getPurchasedServerMaxRam();

	while (true) {

		if (ns.serverExists(myServer)) {
			currentServerRam = ns.getServerMaxRam(myServer);
			upgradeCost = ns.getPurchasedServerUpgradeCost(myServer, 2 ** multiplier);
		}

		if (currentMoney * percentage >= upgradeCost && 2 ** multiplier < maxServerRam && currentServerRam > 2 ** multiplier) {
			await ns.sleep(250);
			multiplier++;
			ns.print("increased to ram: " + 2 ** multiplier);
		} else if (currentMoney * percentage < upgradeCost && 2 ** multiplier < maxServerRam && currentServerRam < 2 ** multiplier) {
			await ns.sleep(250);
			multiplier++;
		} else if (currentServerRam < 2 ** multiplier) {
			await ns.sleep(250);
			ns.upgradePurchasedServer(myServer, 2 ** multiplier)
			ns.alert("successfully upgraded ram to: " + 2 ** multiplier + " on: " + myServer)
			multiplier = 1;
			return false;
		}
	}

	// if current ram < 2 ** multiplier
	// current ram + 2 ** multiplier;
}