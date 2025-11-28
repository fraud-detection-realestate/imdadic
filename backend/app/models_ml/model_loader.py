"""
Model Loader for ML Models
Loads and maintains trained ML models in memory as singleton
"""

import joblib
from pathlib import Path
from typing import Dict, Any
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class MLModels:
    """Singleton class to load and manage ML models"""

    def __init__(self):
        self.lgbm_classifier = None
        self.model_artifacts = None
        self.isolation_forest = None
        self.anomalies_artifacts = None
        self._loaded = False

        current = Path(__file__).resolve()

        # Buscar carpeta backend
        for parent in current.parents:
            if parent.name == "backend":
                backend_dir = parent
                break

        project_root = backend_dir.parent
        self.models_path = project_root / "ml_models" / "v1"

    def load_models(self):
        """Load all ML models and artifacts from disk"""
        if self._loaded:
            logger.info("Models already loaded, skipping...")
            return

        try:
            logger.info(f"Loading models from: {self.models_path}")

            # Load LightGBM classifier
            classifier_path = self.models_path / "lgbm_classifier_balanced_v1.pkl"
            self.lgbm_classifier = joblib.load(classifier_path)
            logger.info("✓ Loaded LightGBM classifier")

            # Load model artifacts
            artifacts_path = self.models_path / "model_artifacts_v1.pkl"
            self.model_artifacts = joblib.load(artifacts_path)
            logger.info("✓ Loaded model artifacts")

            # Load Isolation Forest
            iso_forest_path = self.models_path / "isolation_forest_v1.pkl"
            self.isolation_forest = joblib.load(iso_forest_path)
            logger.info("✓ Loaded Isolation Forest anomaly detector")

            # Load anomaly detection artifacts
            anomaly_artifacts_path = self.models_path / "anomalies_artifacts_v1.pkl"
            self.anomalies_artifacts = joblib.load(anomaly_artifacts_path)
            logger.info("✓ Loaded anomaly detection artifacts")

            self._loaded = True
            logger.info("🎉 All ML models loaded successfully!")

        except FileNotFoundError as e:
            logger.error(f"❌ Model file not found: {e}")
            raise
        except Exception as e:
            logger.error(f"❌ Error loading models: {e}")
            raise

    def is_loaded(self) -> bool:
        return self._loaded

    def get_classifier(self):
        if not self._loaded:
            raise RuntimeError("Models not loaded. Call load_models() first.")
        return self.lgbm_classifier

    def get_model_artifacts(self) -> Dict[str, Any]:
        if not self._loaded:
            raise RuntimeError("Models not loaded. Call load_models() first.")
        return self.model_artifacts

    def get_anomaly_detector(self):
        if not self._loaded:
            raise RuntimeError("Models not loaded. Call load_models() first.")
        return self.isolation_forest

    def get_anomaly_artifacts(self) -> Dict[str, Any]:
        if not self._loaded:
            raise RuntimeError("Models not loaded. Call load_models() first.")
        return self.anomalies_artifacts


# Global singleton instance
ml_models = MLModels()
