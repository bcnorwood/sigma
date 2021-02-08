# import routes
from . import     \
	images_GET,   \
	image_GET,    \
	image_DELETE, \
	upload

# set up a 2D hash mapping each route/method to the appropriate handler
_routes = {}
for route in (images_GET, image_GET, image_DELETE, upload):
	endpoint = _routes.setdefault(route.path, {})
	endpoint[route.method] = route.handler

# export convenience method to encapsulate routing logic
def match(method, route):
	return _routes[route][method]
