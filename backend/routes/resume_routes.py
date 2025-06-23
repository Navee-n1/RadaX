from flask import Blueprint, request, jsonify
from models.models import db, Resume
from datetime import datetime

resume_bp = Blueprint('resume_bp', __name__)

@resume_bp.route('/resumes', methods=['POST'])
def upload_resume():
    data = request.json
    resume = Resume(
        emp_id=data["emp_id"],
        name=data["name"],
        vertical=data["vertical"],
        experience=data["experience"],
        skills=",".join(data["skills"]),
        full_text=data["full_text"]
    )
    db.session.add(resume)
    db.session.commit()
    return jsonify({"message": "Resume uploaded"}), 200

@resume_bp.route('/resumes', methods=['GET'])
def get_resumes():
    resumes = Resume.query.all()
    return jsonify([{
        "id": r.emp_id,
        "name": r.name,
        "experience": r.experience,
        "skills": r.skills.split(','),
        "vertical": r.vertical
    } for r in resumes])
