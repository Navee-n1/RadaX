from flask import Blueprint, request, jsonify
from models.models import db, JD
import os
from werkzeug.utils import secure_filename
from datetime import datetime

jd_bp = Blueprint('jd_bp', __name__)

@jd_bp.route('/jd/upload', methods=['POST'])
def upload_jd():
    title = request.form.get("title")
    skills = request.form.get("skills", "")
    experience = request.form.get("experience")
    description = request.form.get("description")
    user_email = request.form.get("user_email")
    file = request.files.get("file")

    jd = JD(
        title=title,
        skills=skills,
        experience=experience,
        description=description,
        user_email=user_email,
        created_at=datetime.utcnow()
    )

    if file:
        filename = secure_filename(file.filename)
        path = os.path.join("uploads", filename)
        os.makedirs("uploads", exist_ok=True)
        file.save(path)
        jd.file_path = path

    db.session.add(jd)
    db.session.commit()

    return jsonify({
        "id": jd.id,
        "title": jd.title,
        "skills": jd.skills.split(','),
        "experience": jd.experience,
        "description": jd.description,
        "userEmail": jd.user_email,
        "uploadedAt": jd.created_at.isoformat()
    }), 200
