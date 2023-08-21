from json import load
from os import environ
from os.path import abspath, dirname, join
from typing import Optional

from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

# from flask_mongoengine import MongoEngine
from sqlalchemy.orm import scoped_session, sessionmaker

load_dotenv()


class __Base(object):
    """
    Clase base de configuración. Define variables compartidas por todos los entornos.
    """

    HOST: str = environ.get("FLASK_RUN_HOST", "0.0.0.0")
    PORT: str = environ.get("FLASK_RUN_PORT", "5000")
    DEBUG: bool = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING: bool = False
    CSRF_ENABLED: bool = True
    SECRET_KEY: str = environ.get("SECRET_KEY")
    API_VERSION: str = environ.get("API_VERSION", "1.0.0")
    API_URL_PREFIX: str = f"/api/v{API_VERSION[0]}"
    API_MODELS: dict = {}
    API_SCHEMAS: dict = {}
    JSON_AS_ASCII = False
    CORS: str = environ.get("CORS", "*")
    CORS_ORIGIN: str = environ.get("CORS_ORIGIN", "*")
    CORS_ALLOW_METHODS: str = environ.get("CORS_ALLOW_METHODS", "*")
    CORS_ALLOW_HEADERS: str = environ.get("CORS_ALLOW_HEADERS", "*")
    CORS_EXPOSE_HEADERS: str = environ.get("CORS_EXPOSE_HEADERS", "*")

    class PATHS(object):
        """
        Objeto para acceder a los diferentes directorios utilizados en la aplicación.
        """

        __ROOT_DIR: str = abspath(dirname(__file__))
        __TMP_FOLDERNAME: str = environ.get("TEMPORARY_FOLDER", "tmp")
        __TEMPLATES_FOLDERNAME: str = environ.get("TEMPLATES_FOLDER", "templates")
        __STATIC_FOLDERNAME: str = environ.get("STATIC_FOLDER", "static")
        __IMAGES_FOLDERNAME: str = environ.get("IMAGES_FOLDER", "images")
        __FONTS_FOLDERNAME: str = environ.get("FONTS_FOLDER", "fonts")
        tmp: str = join(__ROOT_DIR, __TMP_FOLDERNAME)
        templates: str = join(__ROOT_DIR, __TEMPLATES_FOLDERNAME)
        static: str = join(__ROOT_DIR, __STATIC_FOLDERNAME)
        imgs: str = join(static, __IMAGES_FOLDERNAME)
        fonts: str = join(static, __FONTS_FOLDERNAME)


class __Production(__Base):
    """
    Configuración específica para el entorno de producción.
    """

    DEBUG: bool = False
    SQLALCHEMY_DATABASE_URI: str = f"sqlite:///{abspath(dirname(__file__))}/prod.sqlite"


class __Development(__Base):
    """
    Configuración específica para el entorno de desarrollo.
    """

    Development: bool = True
    DEBUG: bool = True
    SQLALCHEMY_DATABASE_URI: str = f"sqlite:///{abspath(dirname(__file__))}/dev.sqlite"


class __Testing(__Base):
    """
    Configuración específica para el entorno de pruebas.
    """

    TESTING: bool = True

    SQLALCHEMY_DATABASE_URI: str = f"sqlite:///{abspath(dirname(__file__))}/test.sqlite"


def __get_config(env: Optional[str] = None) -> __Base:
    """
    Función para obtener la configuración en función del entorno.
    """
    if env is None:
        env = environ.get("ENV", "development")
    envs: dict = {
        "production": __Production,
        "testing": __Testing,
        "development": __Development,
    }
    current = envs[env.lower()]
    try:
        with open(
            f"{current.PATHS.static}/swagger.json", "r", encoding="utf-8"
        ) as file:
            current.API_MODELS = load(file)
        with open(
            f"{current.PATHS.static}/componets_swagger.json", "r", encoding="utf-8"
        ) as file:
            current.API_SCHEMAS = load(file)
    except FileNotFoundError:
        current.API_MODELS = {}
    return current


current_env = __get_config()


class Config(current_env):
    """
    Objeto con la configuración del entorno de ejecución.
    Attributes:
        API_VERSION: str
        API_URL_PREFIX: str
        PATHS: object
            (tmp | static | templates)
        bcrypt: Bcrypt
        no_db: MongoEngine
        db: SQLAlchemy
        ma: Marshmallow

    """

    CORS_SRC: dict = {
        f"{current_env.API_URL_PREFIX}/{current_env.CORS}": {
            "origins": current_env.CORS_ORIGIN,
            "methods": current_env.CORS_ALLOW_METHODS,
            "allow_headers": current_env.CORS_ALLOW_HEADERS,
            "expose_headers": current_env.CORS_EXPOSE_HEADERS,
        }
    }
    SWAGGER: dict = {
        "title": "API de la Dirección General de Recursos Materiales, Servicios Generales y Catastro",
        "uiversion": 3,
        "version": current_env.API_VERSION,
        "specs_route": "/docs",
    }
    bcrypt: Bcrypt = Bcrypt()
    # no_db: MongoEngine = MongoEngine()
    db: SQLAlchemy = SQLAlchemy()
    ma: Marshmallow = Marshmallow()
