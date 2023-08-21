from flasgger import swag_from
from flask import Blueprint, request

from .. import config
from ..models.task import Task
from ..utils.response import Responses

task_api: Blueprint = Blueprint("Task", __name__, url_prefix="/task")


__swagger: dict = config.API_MODELS.get("task", {})
__schema: dict = config.API_SCHEMAS


@task_api.route("/all", methods=["GET"])
@swag_from(__swagger.get("get_all", {}) | __schema)
def get_all(response=Responses()):
    tasks = Task()
    if tasks.all() is None:
        return response.error("No tasks found", 404)
    return response.success(data=tasks.to_list())


@task_api.route("/<int:id>", methods=["GET"])
@swag_from(__swagger.get("get_one", {}) | __schema)
def get_one(id: int, response=Responses()):
    tasks = Task()
    if tasks.get(id) is None:
        return response.error("No task found", 404)
    return response.success(data=tasks.to_dict())


@task_api.route("/", methods=["POST"])
@swag_from(__swagger.get("create", {}) | __schema)
def create(response=Responses()):
    tasks = Task()
    if tasks.create(**request.json) is None:
        return response.error("Error creating task", 500)
    return response.success(data=tasks.to_dict())


@task_api.route("/<int:id>", methods=["PUT"])
@swag_from(__swagger.get("update", {}) | __schema)
def update(id: int, response=Responses()):
    tasks = Task()
    if tasks.get(id) is None:
        return response.error("No task found", 404)
    if tasks.update(id, **request.json) is None:
        return response.error("Error updating task", 500)
    return response.success(data=tasks.to_dict())


@task_api.route("/<int:id>", methods=["DELETE"])
@swag_from(__swagger.get("delete", {}) | __schema)
def delete(id: int, response=Responses()):
    tasks = Task()
    if tasks.get(id) is None:
        return response.error("No task found", 404)
    if tasks.delete(id) is None:
        return response.error("Error deleting task", 500)
    return response.success(data=tasks.to_dict())


# @task_api.route("/user/<int:id>", methods=["GET"])
# @swag_from(__swagger.get("user_get_all", {}))
# @get_user
# def get_all_user(id: int, user=None, response=Responses()):
#     if user is None:
#         return response.error("No user found", 404)
#     tasks = Task()
#     if tasks.filter_group(todo_owner=user.id) is None:
#         return response.error("No tasks found", 404)
#     return response.success(data=tasks.to_list())


# @task_api.route("/user/<int:id>/<int:task_id>", methods=["GET"])
# @swag_from(__swagger.get("user_get_one", {}))
# @get_user
# def get_one_user(id: int, task_id: int, user=None, response=Responses()):
#     if user is None:
#         return response.error("No user found", 404)
#     tasks = Task()
#     if tasks.filter_group(todo_owner=user.id, id=task_id) is None:
#         return response.error("No task found", 404)
#     return response.success(data=tasks.to_dict())
