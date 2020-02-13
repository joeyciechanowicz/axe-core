options = options || {};

var invalid = [];

var allowed,
	role = node.getAttribute('role'),
	attrs = axe.utils.getNodeAttributes(node);

if (!role) {
	role = axe.commons.aria.implicitRole(node);
}

allowed = axe.commons.aria.allowedAttr(role);

if (Array.isArray(options[role])) {
	allowed = axe.utils.uniqueArray(options[role].concat(allowed));
}

if (role && allowed) {
	for (const { name, nodeValue } of attrs) {
		if (axe.commons.aria.validateAttr(name) && !allowed.includes(name)) {
			invalid.push(name + '="' + nodeValue + '"');
		}
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;
