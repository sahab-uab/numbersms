from datetime import datetime


def date_filter(d):
    if isinstance(d, datetime):  # Check if d is already a datetime object
        return d.strftime("%d-%m-%y %H:%M")  # Format the datetime directly
    elif isinstance(d, str):  # If d is a string
        d = datetime.strptime(d, "%y-%m-%d %H:%M")  # Convert string to datetime object
        return d.strftime("%d-%m-%y %H:%M")  # Return the formatted date string
    return d  # Return as is if it's not a string or datetime
