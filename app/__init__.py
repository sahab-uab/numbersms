from flask import Flask, render_template
from dotenv import load_dotenv
import os
from app.helpers.init_helpers import init_helpers
from app.helpers.utils import date_filter


def create_app():
    app = Flask(__name__)

    # Load environment variables
    load_dotenv()

    # App Configurations
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["APP_URL"] = os.getenv("APP_URL")

    # file upload folder
    app.config["UPLOAD_FOLDER"] = "app/static/uploads"

    # Global templates
    init_helpers(app)

    from .views.api import api

    # Filter
    app.jinja_env.filters["date"] = date_filter

    app.register_blueprint(api, url_prefix="/api")

    # Add a global 404 error handler
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template("404.html"), 404

    return app
