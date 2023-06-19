/** @param {NS} ns */
export async function main(ns) {

	let index = 0;
	let serverAmount = 0;

	while (true) {
		if (ns.serverExists("pserver-" + index)) {
			serverAmount++;
			index++;
			await ns.sleep(250);
		} else {
			ns.alert(serverAmount)
			return false;
		}
	}

}