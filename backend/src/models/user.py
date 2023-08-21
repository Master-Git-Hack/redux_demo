from typing import Any, Dict

from flask_login import UserMixin
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from .. import db, login_manager, ma
from . import Template


class Model(db.Model, UserMixin):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String, unique=True)
    password = Column(String)
    todos = relationship("TodoItem", backref="owner")

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)

    def __repr__(self):
        return f"User<{self.first_name},{self.email}>"


class User(Template):
    def __init__(self) -> None:
        super().__init__(Model)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)

    @login_manager.user_loader
    def load_user(self, id):
        if id is None:
            return None
        self.current = self.model.query.get(id=id)
        if self.current is None:
            return None
        return self.current
