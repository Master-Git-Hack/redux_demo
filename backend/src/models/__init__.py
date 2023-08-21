from typing import Any, Dict, List, Optional, Tuple

from .. import config, db, ma

schema = ma.SQLAlchemyAutoSchema


def create_schema(
    model,
    schema_args: Optional[List[Tuple[str, Any]]] = None,
    **meta_kwargs: Optional[Dict[str, Any]],
) -> object:
    class Model(model):
        pass

    class Schema(schema):
        """Class for schema.
        Example:
            >>> Schema().dump(model)->dict
            >>> Schema().load(model)
            >>> Schema(many=True).dump(model)->list
            >>> Schema(many=True).load(model)
        Args:
            SQLAlchemyAutoSchema (class): class for schema.
        Attributes:
            Meta (class): class for schema.
        """

        class Meta:
            model = Model
            load_instance = True
            include_relationships = True
            include_fk = True

    if schema_args is not None:
        for key, value in schema_args:
            setattr(Schema, key, value)

    for key, value in meta_kwargs.items():
        if "model" == key:
            continue
        if "exclude" == key:
            value += ["geom"]

        setattr(Schema.Meta, key, value)

    return Schema


class Template:
    model: object = None
    schema = None
    current: Optional[object] = None
    create_schema = create_schema
    session: object = db.session

    def __init__(
        self, model, schema_args: Optional[List] = [], **schema_kwargs
    ) -> None:
        self.model = model
        self.schema = create_schema(
            model=self.model, schema_args=schema_args, **schema_kwargs
        )
        self.check_attr()
        self.session = db.session

    def check_attr(self):
        if self.model is None:
            raise ValueError("Model is not defined")
        if self.schema is None:
            self.schema = create_schema(model=self.model)
        return True

    def __enter__(self):
        if self.check_attr():
            return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.model = None
        self.schema = None
        self.current = None

    def __call__(self) -> Any:
        return self.current

    def get(
        self,
        id: int,
        to_dict: bool = False,
        exclude: Optional[List[str]] = None,
    ) -> Optional[object]:
        """
        Get a record by id
        Args:
            id (int): The id of the record
            to_dict (bool): Whether to return a dictionary or an object
            exclude (list): List of fields to exclude
        Returns:
            object: The record
        """
        self.check_attr()

        self.current = self.model.query.get(id)

        if to_dict or exclude is not None and len(exclude) > 0:
            return self.to_dict(exclude=exclude)
        return self.current

    def filter(
        self, to_dict: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Filter records
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.check_attr()
        self.current = self.model.query.filter_by(**kwargs).one()
        if to_dict or exclude is not None and len(exclude) > 0:
            return self.to_dict(exclude=exclude)
        return self.current

    def filter_group(
        self, to_list: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Filter records
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.check_attr()
        self.current = self.model.query.filter_by(**kwargs).all()
        if to_list or exclude is not None and len(exclude) > 0:
            return self.to_list(exclude=exclude)
        return self.current

    def all(
        self,
        to_list: bool = False,
        exclude: Optional[List[str]] = None,
    ) -> Optional[object]:
        """
        Get all records
        Returns:
            object: The record
        """
        self.check_attr()
        self.current = self.model.query.all()
        if to_list or exclude is not None and len(exclude) > 0:
            return self.to_list(exclude=exclude)
        return self.current

    def create(
        self, to_dict: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Create a record
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.check_attr()
        self.current = self.model(**kwargs)
        try:
            self.session.add(self.current)
            self.session.commit()

        except Exception as e:
            print(e)
            self.session.rollback()
            self.current = None

        if to_dict or exclude is not None and len(exclude) > 0:
            return self.to_dict(exclude=exclude)
        return self.current

    def update(
        self,
        id: Optional[int] = None,
        to_dict: bool = False,
        exclude: Optional[List[str]] = None,
        **kwargs,
    ) -> Optional[object]:
        """
        Update a record
        Args:
            id (int): The id of the record
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.check_attr()
        if id is not None:
            self.current = self.model.query.get(id)
        for key, value in kwargs.items():
            setattr(self.current, key, value)
        try:
            self.session.merge(self.current)
            self.session.commit()
            self.session.refresh(self.current)

        except Exception as e:
            print(e)
            self.session.rollback()
            self.current = None

        if to_dict or exclude is not None and len(exclude) > 0:
            self.to_dict(exclude=exclude)
        return self.current

    def delete(self, id: Optional[int] = None):
        """
        Delete a record
        Args:
            id (int): The id of the record
        Returns:
            bool: Whether the record was deleted or not

        """
        self.check_attr()
        if id is not None:
            self.current = self.model.query.get(id)
        try:
            self.session.delete(self.current)
            self.session.commit()

        except Exception as e:
            print(e)
            self.session.rollback()
            self.current = None

        return self.current

    def to_dict(
        self,
        data: Optional[object] = None,
        exclude: Optional[List[str]] = None,
        **kwargs,
    ) -> Dict:
        self.check_attr()
        if "many" in kwargs:
            kwargs.pop("many")
        if data is not None:
            self.current = data
        if self.current is None:
            return {}
        if exclude is not None:
            return self.schema(exclude=exclude, **kwargs).dump(self.current)
        return self.schema(**kwargs).dump(self.current)

    def to_list(
        self,
        data: Optional[object] = None,
        exclude: Optional[List[str]] = None,
        **kwargs,
    ) -> List:
        self.check_attr()
        if data is not None:
            self.current = data
        if self.current is None:
            return []
        if exclude is not None:
            return self.schema(exclude=exclude, many=True, **kwargs).dump(self.current)
        return self.schema(many=True, **kwargs).dump(self.current)


from .task import Task
from .user import User


class Modelos(object):
    Task = Task
    User = User
