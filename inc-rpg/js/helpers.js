function getXpNeeded() {
	if (ps.level > 1) {
		ps.xpNeeded = ps.level * Math.sqrt(100 * 200);
	};
};
function getMonsterHp(maxHp, minHp) {
	return Math.floor(Math.random() * (((maxHp - minHp)) * ps.level) + minHp);
};
function getMonsterGold(maxGold, minGold) {
	return Math.floor(Math.random() * (((maxGold - minGold)) * ps.level) + minGold);
};
function getMonsterXp(maxXp, minXp) {
	return Math.floor(Math.random() * (((maxXp - minXp)) * ps.level) + minXp);
};