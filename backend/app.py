from flask import Flask
from flask_cors import CORS
from models.models import db
from routes.jd_routes import jd_bp
from routes.resume_routes import resume_bp
from routes.match_routes import match_bp
from routes.email_routes import email_bp
from routes.feedback_routes import feedback_bp
from routes.consultant_routes import consultant_bp
from routes.recruiter_routes import recruiter_bp


from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///match_results.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}}, supports_credentials=True)

db.init_app(app)

# Register all routes
app.register_blueprint(recruiter_bp,url_prefix='/recruiter')
app.register_blueprint(consultant_bp, url_prefix='/consultant')
app.register_blueprint(jd_bp, url_prefix='/jd')
app.register_blueprint(resume_bp, url_prefix='/resumes')
app.register_blueprint(match_bp, url_prefix='/match')
app.register_blueprint(email_bp, url_prefix='/email')
app.register_blueprint(feedback_bp, url_prefix='/feedback')

# Initialize database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
