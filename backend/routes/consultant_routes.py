from flask import Blueprint, request, jsonify
from models.models import db, Consultant

consultant_bp = Blueprint('consultant_bp', __name__)

@consultant_bp.route("/consultants", methods=["GET"])
def get_consultants():
    name = request.args.get("name", "").lower()
    skill = request.args.get("skill", "").lower()
    vertical = request.args.get("vertical", "").lower()

    consultants = Consultant.query.all()
    result = []
    for c in consultants:
        if (name in c.name.lower() or name in c.emp_id.lower()) and \
           (skill in [s.lower() for s in c.skills.split(",")] or not skill) and \
           (vertical == c.vertical.lower() or vertical == "all" or not vertical):
            result.append(c.to_dict())

    return jsonify(result)


@consultant_bp.route("/consultants", methods=["POST"])
def add_consultant():
    data = request.json
    try:
        consultant = Consultant(
            emp_id=data["empId"],
            name=data["name"],
            vertical=data["vertical"],
            skills=",".join([s.strip() for s in data.get("skills", [])]),
            experience=data["experience"],
            status=data["status"],
            location=data["location"],
            rate=data["rate"],
            rating=float(data["rating"]),
            projects=int(data["projects"])
        )
        db.session.add(consultant)
        db.session.commit()
        return jsonify({"message": "Consultant added"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
