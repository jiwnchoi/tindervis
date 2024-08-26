from api.models import State

state = State()


# decorator that return dict(state)
def return_state(func):
  def wrapper(*args, **kwargs):
    func(*args, **kwargs)
    return dict(state)

  return wrapper


__all__ = ["state", "return_state"]
