def calculate_match_score(jd_skills, resume_skills):
    jd_set = set(jd_skills)
    res_set = set(resume_skills)
    intersection = jd_set & res_set
    union = jd_set | res_set
    return round(len(intersection) / len(union) * 100, 2) if union else 0

def generate_label(score):
    if score >= 90:
        return "Highly Recommended"
    elif score >= 75:
        return "Recommended"
    elif score >= 60:
        return "Can Explore"
    else:
        return "Not Suitable"

def get_highlights(jd_skills, resume_skills):
    return list(set(jd_skills) & set(resume_skills))

def get_missing(jd_skills, resume_skills):
    return list(set(jd_skills) - set(resume_skills))
