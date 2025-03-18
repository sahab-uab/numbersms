from flask import g

# Fetch user by email
def get_user_by_email(email):
    # Use the MySQL connection stored in g
    cursor = g.mysql.cursor()
    cursor.execute(
        "SELECT * FROM user WHERE email = %s",
        (email,)
    )
    result = cursor.fetchone()
    cursor.close()  # Ensure the cursor is closed

    if result:
        return result
    return False

# Fetch user by ID
def get_user_by_id(user_id):
    cursor = g.mysql.cursor()
    cursor.execute(
        "SELECT * FROM user WHERE id = %s",
        (user_id,),
    )
    result = cursor.fetchone()
    cursor.close()
    if result:
        return result
    return False
