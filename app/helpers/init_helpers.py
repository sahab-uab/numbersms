def init_helpers(app):
    from app.helpers.database import get_user_by_email, get_user_by_id
    from app.helpers.auth import isAuthUser
    from app.helpers.mailer import send_email

    app.add_template_global(isAuthUser)
    app.add_template_global(get_user_by_email)
    app.add_template_global(get_user_by_id)
    app.add_template_global(send_email)
