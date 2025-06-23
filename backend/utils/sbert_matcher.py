from sentence_transformers import SentenceTransformer, util

# Load once and reuse
model = SentenceTransformer('all-MiniLM-L6-v2')

def embed_text(text: str):
    return model.encode(text, convert_to_tensor=True)

def calculate_sbert_similarity(jd_text: str, resume_text: str) -> float:
    jd_embedding = embed_text(jd_text)
    resume_embedding = embed_text(resume_text)
    score = util.pytorch_cos_sim(jd_embedding, resume_embedding).item()
    return round(score * 100, 2)  # Convert to percentage

def explain_similarity(jd_text: str, resume_text: str, threshold: float = 0.7):
    jd_lines = [line.strip() for line in jd_text.split("\n") if line.strip()]
    resume_lines = [line.strip() for line in resume_text.split("\n") if line.strip()]

    highlights = []
    missing = []

    for line in jd_lines:
        line_embedding = embed_text(line)
        best_score = 0.0
        for rline in resume_lines:
            r_embedding = embed_text(rline)
            score = util.pytorch_cos_sim(line_embedding, r_embedding).item()
            if score > best_score:
                best_score = score
        if best_score >= threshold:
            highlights.append(line)
        else:
            missing.append(line)

    return highlights, missing
def generate_label(score):
    if score >= 90:
        return "Highly Recommended"
    elif score >= 75:
        return "Recommended"
    elif score >= 60:
        return "Can Explore"
    else:
        return "Not Suitable"
