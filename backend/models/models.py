from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# ---------------- JD Model ---------------- #
class JD(db.Model):
    __tablename__ = 'jd'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    skills = db.Column(db.Text)  # comma-separated
    experience = db.Column(db.String(50))
    description = db.Column(db.Text)
    user_email = db.Column(db.String(200))
    file_path = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# ---------------- Resume Model ---------------- #
class Resume(db.Model):
    __tablename__ = 'resume'
    id = db.Column(db.Integer, primary_key=True)
    emp_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(120), nullable=False)
    vertical = db.Column(db.String(100))
    skills = db.Column(db.Text)  # comma-separated
    experience = db.Column(db.String(50))
    full_text = db.Column(db.Text)  # parsed resume text
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# ---------------- Match Result ---------------- #
class MatchResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jd_id = db.Column(db.Integer, db.ForeignKey('jd.id'))
    resume_id = db.Column(db.Integer, db.ForeignKey('resume.id'))
    score = db.Column(db.Float)
    label = db.Column(db.String)
    explanation = db.Column(db.Text)
    skills = db.Column(db.Text)
    highlights = db.Column(db.Text)  # pipe-separated
    missing = db.Column(db.Text)     # pipe-separated

    resume = db.relationship('Resume', backref='match_results')
    jd = db.relationship('JD', backref='match_results')

# ---------------- Email Log ---------------- #
class EmailLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jd_id = db.Column(db.String)
    to_email = db.Column(db.String)
    cc = db.Column(db.String)
    subject = db.Column(db.String)
    body = db.Column(db.Text)
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String, default='delivered')

# ---------------- Consultant ---------------- #
class Consultant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    emp_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(100))
    vertical = db.Column(db.String(50))
    skills = db.Column(db.Text)  # Comma-separated
    experience = db.Column(db.String(50))
    status = db.Column(db.String(50))
    location = db.Column(db.String(100))
    rate = db.Column(db.String(20))
    rating = db.Column(db.Float)
    projects = db.Column(db.Integer)

    def to_dict(self):
        return {
            "empId": self.emp_id,
            "name": self.name,
            "vertical": self.vertical,
            "skills": self.skills.split(",") if self.skills else [],
            "experience": self.experience,
            "status": self.status,
            "location": self.location,
            "rate": self.rate,
            "rating": self.rating,
            "projects": self.projects
        }

# ---------------- Recruiter Profile ---------------- #
class Profile(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    emp_id = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    vertical = db.Column(db.String(100))
    skills = db.Column(db.Text)  # comma-separated
    experience_years = db.Column(db.Float)
    rating = db.Column(db.Float, default=4.5)
    projects = db.Column(db.Integer, default=10)
    status = db.Column(db.String(50), default="Available")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    resume_path = db.Column(db.String(500))

# ---------------- Feedback ---------------- #
class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    match_id = db.Column(db.Integer, db.ForeignKey('match_result.id'))
    feedback = db.Column(db.String)  # thumbs_up / thumbs_down
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    match_result = db.relationship("MatchResult", backref="feedbacks")
