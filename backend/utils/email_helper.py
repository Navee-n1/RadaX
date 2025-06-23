import smtplib
from email.message import EmailMessage
import os

def send_email(to, cc, subject, body):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = os.getenv("EMAIL_SENDER")
    msg["To"] = to
    msg["Cc"] = ", ".join(cc)
    msg.set_content(body)

    try:
        with smtplib.SMTP_SSL(os.getenv("SMTP_SERVER"), 465) as smtp:
            smtp.login(os.getenv("EMAIL_SENDER"), os.getenv("EMAIL_PASSWORD"))
            smtp.send_message(msg)
        return True
    except Exception as e:
        print("Email failed:", str(e))
        return False
