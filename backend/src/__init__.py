from flasgger import Swagger
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager

from .config import Config

config = Config()
cors = CORS()
db = config.db
ma = config.ma
login_manager = LoginManager()


def init_app():
    context = Flask(__name__)
    context.config.from_object(config)
    config.bcrypt.init_app(context)
    db.init_app(context)
    ma.init_app(context)
    cors.init_app(context, **config.CORS_SRC)
    login_manager.init_app(context)
    return context


app: Flask = init_app()


from .api import api

app.register_blueprint(api)
swagger = Swagger(app)


# app.logger.addHandler(mail_handler)
# if not app.debug:
#     ...
