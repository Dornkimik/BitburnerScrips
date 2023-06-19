/** @param {NS} ns */
export async function main(ns) {
	var target = ns.args[0]

    let portsOpened = 0;

    if (ns.fileExists('BruteSSH.exe', 'home')) {
        ns.brutessh(target);
        portsOpened++;
    }

    if (ns.fileExists('FTPCrack.exe', 'home')) {
        ns.ftpcrack(target);
        portsOpened++;
    }

    if (ns.fileExists('relaySMTP.exe', 'home')) {
        ns.relaysmtp(target);
        portsOpened++;
    }

    if (ns.fileExists('HTTPWorm.exe', 'home')) {
        ns.httpworm(target);
        portsOpened++;
    }

    if (ns.fileExists('SQLInject.exe', 'home')) {
        ns.sqlinject(target);
        portsOpened++;
    }

	if (!ns.hasRootAccess(target)) {
		ns.nuke(target);
	}

    ns.printf("opened ports from " + target + ": " + portsOpened);
}