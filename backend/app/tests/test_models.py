"""
Quick test to verify ML models can be loaded
"""

import sys

sys.path.append(
    "c:/Users/carlo/Documents/KrozFu/repos/challenge-opendata/imdadic/backend"
)

from app.models_ml.model_loader import ml_models

try:
    print("🔄 Loading ML models...")
    ml_models.load_models()
    print("✅ All models loaded successfully!")
    print(f"   - Models loaded: {ml_models.is_loaded()}")
    print(f"   - Classifier: {ml_models.lgbm_classifier is not None}")
    print(f"   - Anomaly detector: {ml_models.isolation_forest is not None}")
except Exception as e:
    print(f"❌ Error loading models: {e}")
    import traceback

    traceback.print_exc()
