const base = import.meta.env.BASE_URL || "/";

export function withBase(path) {
	if (!path) {
		return "";
	}

	if (/^(https?:|mailto:|tel:|sms:|#)/.test(path)) {
		return path;
	}

	if (path === "/") {
		return base;
	}

	return `${base}${path.replace(/^\/+/, "")}`;
}
