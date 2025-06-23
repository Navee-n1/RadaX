from flask import Blueprint, jsonify
from models.models import db, JD, Resume, MatchResult
from utils.sbert_matcher import calculate_sbert_similarity, explain_similarity

match_bp = Blueprint('match_bp', __name__)

def generate_label(score):
    if score >= 90:
        return "Highly Recommended"
    elif score >= 80:
        return "Recommended"
    else:
        return "Explore"

@match_bp.route('/jd/<jd_id>/top-matches', methods=['GET'])
def get_top_matches(jd_id):
    jd = JD.query.get(jd_id)
    resumes = Resume.query.all()
    results = []

    for r in resumes:
        score = calculate_sbert_similarity(jd.description, r.full_text)
        highlights, missing = explain_similarity(jd.description, r.full_text)

        result = MatchResult(
            jd_id=jd_id,
            resume_id=r.id,
            score=score,
            label=generate_label(score),
            skills=r.skills,
            explanation=f"Similarity score: {score}%. Highlights show strong alignment.",
            highlights="|".join(highlights),
            missing="|".join(missing)
        )
        db.session.add(result)
        results.append(result)

    db.session.commit()

    top = sorted(results, key=lambda x: x.score, reverse=True)[:3]
    response = [{
        "id": r.resume.emp_id,
        "name": r.resume.name,
        "similarity": r.score,
        "label": r.label,
        "skills": r.skills.split(','),
        "experience": r.resume.experience,
        "vertical": r.resume.vertical,
        "highlights": r.highlights.split('|'),
        "missing": r.missing.split('|'),
        "explanation": r.explanation
    } for r in top]

    return jsonify(top_matches=response)
