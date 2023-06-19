/** @param {NS} ns */
export async function main(ns) {

	let currentMoney = ns.getServerMoneyAvailable("home");


	function BuyServer(serverAmount, ramAmount) {
		if (currentMoney * 0.25 >= ns.getPurchasedServerCost(ramAmount) * serverAmount) {
			for (let i = 0; i < serverAmount; i++) {
				ns.purchaseServer("pserver-" + i, ramAmount);
			}
		} else {
			ns.alert("Not enough money");
		}
	}

	function DeleteServer(serverAmount) {
		for (let i = 0; i < serverAmount; i++) {
			ns.deleteServer("pserver-" + i);
		}
	}

	
}