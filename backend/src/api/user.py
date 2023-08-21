from flasgger import swag_from
from flask import Blueprint, request
from flask_login import login_user

from .. import config
from ..models.user import User
from ..utils.response import Responses

user_api: Blueprint = Blueprint("User", __name__, url_prefix="/user")


__swagger: dict = config.API_MODELS.get("user", {})
__schema: dict = config.API_SCHEMAS


@user_api.route("/register", methods=["POST"])
@swag_from(__swagger.get("register", {}) | __schema)
def register(response=Responses()):
    user = User()
    data = request.json
    data["password"] = config.bcrypt.generate_password_hash(data["password"])
    if user.create(**data) is None:
        return response.error("Error creating user", 500)
    return response.success(data=user.to_dict())


@user_api.route("/login", methods=["POST"])
@swag_from(__swagger.get("login", {}) | __schema)
def login(response=Responses()):
    user = User()
    email = request.json.get("email")
    password = request.json.get("password")
    if user.filter(email=email) is None:
        return response.error("No user found", 404)
    if user.current and config.bcrypt.check_password_hash(
        user.current.password, password
    ):
        login_user(user.current)
        return response.success(data=user.to_dict())
    return response.error("Invalid credentials", 401)
