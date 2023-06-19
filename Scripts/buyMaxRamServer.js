/** @param {NS} ns */
export async function main(ns) {
	let currentMoney = ns.getServerMoneyAvailable("home");
	let percentage = ns.args[0];
	let scripts = ["crack.js", "hack.js", "grow.js", "weaken.js"];

	// MAIN LOGIC
	await BuyMaxRamServer();
	DeployScripts();

	
	async function BuyMaxRamServer() {
		let myRam = 2;
		let multiplier = 1;

		while (true) {
			if (currentMoney * percentage >= ns.getPurchasedServerCost(myRam ** multiplier) && myRam ** multiplier < ns.getPurchasedServerMaxRam()) {
				multiplier++;
				ns.print("increased to ram: " + myRam ** multiplier);
				await ns.sleep(250);
			} else {
				ns.purchaseServer("pserver-0", myRam ** multiplier)
				ns.alert("success. Ram: " + myRam ** multiplier)
				multiplier = 1;

				return false;
			}
		}
	}
	
	function DeployScripts() {
		let serverList = ns.getPurchasedServers();
		
		let lastServer = serverList[serverList.length - 1];

		for (let i = 0; i < scripts.length; i++) {
			if (!ns.fileExists(scripts[i], lastServer)) {
				ns.scp(scripts[i], lastServer, "home");
			} else {
				ns.print("file: " + scripts[i] + " already exists on server: " + lastServer);
			}
		}
	}
}