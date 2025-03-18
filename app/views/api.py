from flask import Blueprint, jsonify, request, g
import requests
from dotenv import load_dotenv
import os

api = Blueprint("api", __name__)

load_dotenv()

BASE_URL = os.getenv("BASE_URL")
API_KEY = os.getenv("API_KEY")
EMAIL = os.getenv("EMAIL")


def generate_bearer_token():
    headers = {"X-API-KEY": API_KEY, "X-API-USERNAME": EMAIL}
    try:
        response = requests.post(f"{BASE_URL}/api/pub/v2/auth", headers=headers)
        response.raise_for_status()

        token_data = response.json()
        return token_data.get("token")  # Return the fresh token
    except requests.exceptions.RequestException as e:
        print(f"Error generating token: {e}")
        return None


def make_api_request(endpoint, method="GET", data=None, params=None, urltype=None):
    token = generate_bearer_token()
    if not token:
        return {"error": "Failed to generate token"}

    # Ensure the endpoint is correctly formatted
    if urltype == True:
        url = endpoint
    else:
        url = f"{BASE_URL}{endpoint}"

    headers = {"Authorization": f"Bearer {token}"}

    try:
        # Debug: Log the final URL
        print(f"Making API request to: {url}")

        # Make the API call with the new token
        if method.upper() == "GET":
            response = requests.get(url, headers=headers, params=params)
        elif method.upper() == "POST":
            response = requests.post(url, headers=headers, json=data)
        else:
            return {"error": f"Unsupported HTTP method: {method}"}

        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error making API request: {e}")
        return {"error": f"API request failed: {str(e)}"}


@api.route("/service", methods=["POST"])
def service():
    try:
        # Fetch services using the helper function
        result = make_api_request(
            "/api/pub/v2/services",
            method="GET",
            params={"numberType": "mobile", "reservationType": "verification"},
        )

        # Check for errors in the response
        if "error" in result:
            return jsonify({"status": "error", "error": result["error"]})

        # Filter services with capability "Sms"
        services = [
            service
            for service in result
            if service.get("capability", "").lower() == "sms"
        ]

        return jsonify({"status": "success", "services": services})
    except Exception as e:
        print(f"Error in service_list: {e}")
        return jsonify({"status": False, "error": "An unexpected error occurred."})


@api.route("/verification_pricing", methods=["POST"])
def verification_pricing():
    try:
        data = request.json
        service_name = data.get("serviceName")
        area_code = data.get("areaCode", True)
        carrier = data.get("carrier", True)
        number_type = data.get("numberType", "mobile")
        capability = data.get("capability", "sms")

        pricing_data = {
            "serviceName": service_name,
            "areaCode": area_code,
            "carrier": carrier,
            "numberType": number_type,
            "capability": capability,
        }

        result = make_api_request(
            "/api/pub/v2/pricing/verifications", method="POST", data=pricing_data
        )

        if "error" in result:
            return jsonify({"status": "error", "error": result["error"]})

        return jsonify({"status": "success", "pricing": result})

    except Exception as e:
        print(f"Error in verification_pricing: {e}")
        return jsonify({"status": False, "error": "An unexpected error occurred."})


@api.route("/create_verification", methods=["POST"])
def create_verification():
    try:
        # Extract data from the request body
        data = request.json

        # Prepare the body for the verification request
        body = {
            "areaCodeSelectOption": data.get("areaCodeSelectOption", []),
            "carrierSelectOption": data.get("carrierSelectOption", []),
            "serviceName": data.get("serviceName", ""),
            "capability": data.get("capability", ""),
            "serviceNotListedName": data.get("serviceNotListedName", ""),
        }

        result = make_api_request("/api/pub/v2/verifications", method="POST", data=body)
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        return jsonify(
            {"status": "error", "error": f"An unexpected error occurred: {str(e)}"}
        )


@api.route("/startpolling", methods=["POST"])
def start_polling():
    data = request.json
    href = data.get("href")
    last_segment = href.split("/")[-1]

    if not href:
        return jsonify({"error": "Missing verification_href in the request"}), 400

    endpoint = f"/api/pub/v2/verifications/{last_segment}"
    result = make_api_request(endpoint, method="GET")
    return jsonify(result)


@api.route("/getotp", methods=["POST"])
def getotp():
    data = request.json
    href = data.get("href")
    methods = data.get("methods", "GET").upper()

    if not href:
        return jsonify({"error": "Missing href in the request"}), 400

    result = make_api_request(href, method=methods, urltype=True)
    return jsonify(result)


@api.route("/me", methods=["POST"])
def me():
    try:
        # Fetch services using the helper function
        result = make_api_request(
            "/api/pub/v2/account/me",
            method="GET",
        )

        # Check for errors in the response
        if "error" in result:
            return jsonify({"status": "error", "error": result["error"]})

        return jsonify({"status": "success", "data": result})
    except Exception as e:
        return jsonify({"status": False, "error": "An unexpected error occurred."})
