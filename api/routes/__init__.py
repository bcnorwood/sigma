from . import     \
	images_GET,   \
	image_GET,    \
	image_DELETE, \
	upload

_routes = {}
for route in (images_GET, image_GET, image_DELETE, upload):
	endpoint = _routes.setdefault(route.path, {})
	endpoint[route.method] = route.handler

def match(method, route):
	return _routes[route][method]
