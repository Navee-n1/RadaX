from flask import Blueprint, request, jsonify
from models.models import db, EmailLog

email_bp = Blueprint('email_bp', __name__)

@email_bp.route('/send-email/manual', methods=['POST'])
def send_manual_email():
    try:
        data = request.json
        new_email = EmailLog(
            jd_id=data.get('jd_id'),
            to_email=data.get('to'),
            cc=",".join(data.get('cc', [])),
            subject=data.get('subject'),
            body=data.get('body'),
            status='delivered'
        )
        db.session.add(new_email)
        db.session.commit()

        return jsonify({"message": "Email sent and logged"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
