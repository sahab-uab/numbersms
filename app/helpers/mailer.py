from flask_mail import Message
from flask import current_app

def send_email(subject, recipient, body=None, html=None):
    """
    Sends an email using Flask-Mail.

    :param subject: Subject of the email
    :param recipient: Recipient's email address
    :param body: Plain text body of the email (optional)
    :param html: HTML content of the email (optional)
    :return: True if email is sent successfully, False otherwise
    """
    try:
        # Access the mail instance from the current app context
        mail = current_app.extensions.get("mail")
        if not mail:
            raise Exception("Mail instance not found in app context")

        # Create the email message
        msg = Message(subject=subject, recipients=[recipient])
        if body:
            msg.body = body
        if html:
            msg.html = html

        # Sender is default sender from configuration
        msg.sender = current_app.config["MAIL_DEFAULT_SENDER"]

        # Send the email
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
