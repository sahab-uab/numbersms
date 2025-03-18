from flask import session, redirect, url_for
import functools
from app.helpers.database import get_user_by_id


def isAuthUser():
    sessin_id = session.get("user_id", False)
    if sessin_id:
        user = get_user_by_id(sessin_id)
        if user:
            if user["user_type"] == "user":
                return {
                    "is_auth": True,
                    "user_type": user["user_type"],
                    "session_id": sessin_id,
                    "user": user,
                }
            else:
                return {
                    "is_auth": True,
                    "user_type": user["user_type"],
                    "session_id": sessin_id,
                    "user": user,
                }
        else:
            return {
                "is_auth": False,
                "user_type": None,
                "session_id": None,
                "user": None,
            }
    else:
        return {
            "is_auth": False,
            "user_type": None,
            "session_id": None,
            "user": None,
        }


# for guest user
def guest(view_func):
    @functools.wraps(view_func)
    def decorated(*args, **kwargs):
        user_data = isAuthUser()

        if user_data.get("is_auth"):
            return redirect(url_for("landing.index"))

        return view_func(*args, **kwargs)

    return decorated


# for admin
def isadmin(view_func):
    @functools.wraps(view_func)
    def decorated(*args, **kwargs):
        user_data = isAuthUser()

        if not user_data.get("is_auth") or user_data.get("user_type") != "admin":
            return redirect(url_for("landing.login"))

        return view_func(*args, **kwargs)

    return decorated


# for user
def user(view_func):
    @functools.wraps(view_func)
    def decorated(*args, **kwargs):
        user_data = isAuthUser()

        if not user_data.get("is_auth") or user_data.get("user_type") != "user":
            return redirect(url_for("landing.login"))

        return view_func(*args, **kwargs)

    return decorated
