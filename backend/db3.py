from app import app
from models.models import db, Profile

with app.app_context():
    c1 = Profile(
        emp_id="C001",
        name="Arjun Mehta",
        vertical="Full Stack Development",
        skills="React,Node,PostgreSQL,Docker",
        experience_years=4.5,
        rating=4.6,
        projects=12,
        status="Available"
    )
    
    c2 = Profile(
        emp_id="C002",
        name="Sneha Roy",
        vertical="AI/ML Engineering",
        skills="Python,TensorFlow,Scikit-learn,Pandas",
        experience_years=3.0,
        rating=4.8,
        projects=8,
        status="Assigned"
    )

    c3 = Profile(
        emp_id="C003",
        name="Rahul Singh",
        vertical="DevOps Engineering",
        skills="AWS,Jenkins,Kubernetes,Terraform",
        experience_years=5.0,
        rating=4.4,
        projects=15,
        status="Available"
    )

    c4 = Profile(
        emp_id="C004",
        name="Meera Nair",
        vertical="Frontend Development",
        skills="HTML,CSS,JavaScript,Vue,TypeScript",
        experience_years=2.5,
        rating=4.7,
        projects=6,
        status="Available"
    )

    db.session.add_all([c1, c2, c3, c4])
    db.session.commit()
    print("Consultant records added successfully.")
