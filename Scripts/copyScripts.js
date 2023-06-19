/** @param {NS} ns */
export async function main(ns) {

	let scripts = ["crack.js", "hack.js", "grow.js", "weaken.js"];

	let serverIndex = 0;
	let scriptIndex = 0;

	let serverList = ns.getPurchasedServers();
	let serverAmount = serverList.length;

	async function CopyScriptsOnServers() {
		// check if the important scripts are on the server and if not copy them on the server
		if (scriptIndex < scripts.length && !ns.fileExists(scripts[scriptIndex], "pserver-" + serverIndex)) {
			ns.scp(scripts[scriptIndex], "pserver-" + serverIndex, "home");
			ns.print(scripts[scriptIndex] + " was added to: " + "pserver-" + serverIndex)
			scriptIndex++;
			await ns.asleep(250);
		} else if (scriptIndex < scripts.length && ns.fileExists(scripts[scriptIndex], "pserver-" + serverIndex)) {
			ns.print(scripts[scriptIndex] + " was already added to pserver-" + serverIndex);
			scriptIndex++;
			await ns.asleep(250);
		} else if (scriptIndex >= scripts.length && serverIndex < serverAmount){
			serverIndex++;
			scriptIndex = 0;
			ns.print("server index increased " + serverIndex);
			await ns.asleep(250);
		} else {
			ns.sleep(1000);
			ns.print("finished");
			return false;
		}
	}

	while (true) {
		await CopyScriptsOnServers();
	}

	// 	ns.scp(scripts[scriptIndex], "pserver-" + serverIndex, "home");

}