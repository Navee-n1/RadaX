from flask import Blueprint, request, jsonify
from models.models import db, Feedback

feedback_bp = Blueprint("feedback_bp", __name__)

@feedback_bp.route("/feedback", methods=["POST"])
def submit_feedback():
    data = request.json
    try:
        feedback = Feedback(
            jd_id=data["jd_id"],
            resume_id=data["resume_id"],
            rating=data["rating"],  # 1 (like) or 0 (dislike)
            comment=data.get("comment", "")
        )
        db.session.add(feedback)
        db.session.commit()
        return jsonify({"message": "Feedback saved"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@feedback_bp.route("/feedback/<jd_id>", methods=["GET"])
def get_feedback(jd_id):
    feedbacks = Feedback.query.filter_by(jd_id=jd_id).all()
    return jsonify([
        {
            "resume_id": f.resume_id,
            "rating": f.rating,
            "comment": f.comment,
            "submitted_at": f.created_at.strftime("%Y-%m-%d %H:%M:%S")
        } for f in feedbacks
    ])
