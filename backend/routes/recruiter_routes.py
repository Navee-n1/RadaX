from flask import Blueprint, request, jsonify
from sqlalchemy import or_
from models.models import db, Profile

recruiter_bp = Blueprint('recruiter_bp', __name__)

@recruiter_bp.route('/consultants', methods=['GET'])
def get_consultants():
    name = request.args.get('name', '').strip().lower()
    vertical = request.args.get('vertical', '').strip()
    min_exp = float(request.args.get('min_exp', 0))
    max_exp = float(request.args.get('max_exp', 50))
    skills_param = request.args.get('skills', '').strip().lower()

    query = Profile.query

    # Name/Emp ID search
    if name:
        query = query.filter(or_(
            Profile.name.ilike(f"%{name}%"),
            Profile.emp_id.ilike(f"%{name}%")
        ))

    # Vertical filter
    if vertical and vertical.lower() != 'all':
        query = query.filter(Profile.vertical.ilike(vertical))

    # Experience range
    query = query.filter(Profile.experience_years >= min_exp)
    query = query.filter(Profile.experience_years <= max_exp)

    # Skill filtering
    if skills_param:
        skills = [s.strip() for s in skills_param.split(',') if s.strip()]
        for skill in skills:
            query = query.filter(Profile.skills.ilike(f"%{skill}%"))

    profiles = query.order_by(Profile.created_at.desc()).all()

    result = []
    for p in profiles:
        result.append({
            "empId": p.emp_id,
            "name": p.name,
            "vertical": p.vertical,
            "experience": f"{int(p.experience_years)} years" if p.experience_years else "N/A",
            "skills": p.skills.split(",") if p.skills else [],
            "rating": round(p.rating, 1),
            "projects": p.projects,
            "status": p.status,
            "location": "—",  # Add if you track it in model
            "rate": "$100/hr",  # Placeholder unless added
            "matchScore": 90,  # Static for now
        })

    return jsonify(result), 200
@recruiter_bp.route('/consultants', methods=['POST'])
def add_consultant():
    data = request.json

    consultant = Profile(
        emp_id=data.get("empId"),
        name=data.get("name"),
        vertical=data.get("verticals")[0] if isinstance(data.get("verticals"), list) else data.get("verticals"),
        skills=", ".join(data.get("skills", [])),
        experience_years=float(data.get("experience", 0)),
        rating=float(data.get("rating", 4.5)),
        projects=int(data.get("projects", 0)),
        status=data.get("status", "Available"),
        resume_path="",  # Optional field
    )

    db.session.add(consultant)
    db.session.commit()

    return jsonify({"message": "Consultant added successfully."}), 201
