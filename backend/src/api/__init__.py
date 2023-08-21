from flask import Blueprint

from .. import config

__static = config.PATHS.static
api: Blueprint = Blueprint("api", __name__, url_prefix=config.API_URL_PREFIX)

# from .module import module
# api.register_blueprint(module)
from .task import task_api
from .user import user_api

api.register_blueprint(task_api)
api.register_blueprint(user_api)
