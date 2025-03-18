from app import create_app
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create the Flask app
app = create_app()
application = app


if __name__ == "__main__":
    # Use DEBUG mode from the environment variable
    debug_mode = os.getenv("DEBUG", "False").lower() in ["true", "1", "t", "yes", "y"]
    app.run(debug=debug_mode)
