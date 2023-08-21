from sqlalchemy import Column, DateTime, ForeignKey, Integer, String

from .. import db, ma
from . import Template


class Model(db.Model):
    __tablename__ = "task"
    id = Column(Integer, primary_key=True)
    task_name = Column(String(255))
    due_date = Column(DateTime())
    status = Column(String(255))
    todo_owner = Column(Integer, ForeignKey("user.id"))

    def __repr__(self):
        return f"Task{self.task_name}{self.due_date}"


class Task(Template):
    def __init__(self) -> None:
        super().__init__(Model)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
