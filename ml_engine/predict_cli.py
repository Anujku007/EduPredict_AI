import sys
import json
import os
import pandas as pd

def run_prediction(payload):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, "artifacts", "model.pkl")
    preprocessor_path = os.path.join(base_dir, "artifacts", "preprocessor.pkl")

    if os.path.exists(model_path) and os.path.exists(preprocessor_path):
        import pickle
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        with open(preprocessor_path, "rb") as f:
            preprocessor = pickle.load(f)

        df = pd.DataFrame([{
            "gender": payload["gender"],
            "race_ethnicity": payload["raceEthnicity"],
            "parental_level_of_education": payload["parentalLevelOfEducation"],
            "lunch": payload["lunch"],
            "test_preparation_course": payload["testPreparationCourse"],
            "reading_score": float(payload["readingScore"]),
            "writing_score": float(payload["writingScore"]),
        }])

        scaled = preprocessor.transform(df)
        pred = float(model.predict(scaled)[0])
        return {"score": round(max(0.0, min(100.0, pred)), 2), "engine": "sklearn-catboost-pkl"}

    raise FileNotFoundError("Artifacts not copied into ml_engine/artifacts yet")

if __name__ == "__main__":
    raw = sys.stdin.read()
    data = json.loads(raw)
    result = run_prediction(data)
    print(json.dumps(result))
