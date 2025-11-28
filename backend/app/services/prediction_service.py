"""
Prediction Service - Business logic for ML predictions
CORRECTED for LightGBM Booster API
"""

import pandas as pd
import numpy as np
from typing import Dict, Any
from app.models_ml.model_loader import ml_models
import logging

logger = logging.getLogger(__name__)


class PredictionService:
    """Service for ML predictions"""

    def __init__(self):
        """Initialize prediction service"""
        pass

    def clasificar_precio(self, predio_dict: Dict[str, Any]) -> Dict[str, Any]:
        """
        Classify price range for a property

        Args:
            predio_dict: Dictionary with property features

        Returns:
            Dictionary with predicted class and probabilities
        """
        try:
            # Get model and artifacts
            classifier = ml_models.get_classifier()  # This is a LightGBM Booster
            artifacts = ml_models.get_model_artifacts()

            # Get required features and target info
            all_features = artifacts.get("all_features", [])
            cat_features = artifacts.get("cat_features", [])
            target_classes = artifacts.get(
                "target_classes", []
            )  # ['ALTO', 'BAJO', 'LUJO', 'MEDIO']

            # Convert to DataFrame with only required features
            df = pd.DataFrame([predio_dict])

            # Select only the features that were used in training
            df = df[all_features]

            # For LightGBM Booster, categorical features should be specified by name
            # Make sure categorical features are strings
            for cat_col in cat_features:
                if cat_col in df.columns:
                    df[cat_col] = df[cat_col].astype("category")

            # Make prediction using Booster API
            # predict() returns probabilities for multiclass
            probabilities = classifier.predict(df)[0]  # Get first row's probabilities

            # Get the predicted class (index with highest probability)
            predicted_class_idx = np.argmax(probabilities)
            predicted_class = target_classes[predicted_class_idx]

            # Build probability dictionary
            prob_dict = {
                str(target_classes[i]): float(probabilities[i])
                for i in range(len(target_classes))
            }

            return {"rango_precio": predicted_class, "probabilidades": prob_dict}

        except Exception as e:
            logger.error(f"Error in price classification: {e}")
            import traceback

            logger.error(traceback.format_exc())
            raise

    def detectar_anomalia(self, predio_dict: Dict[str, Any]) -> Dict[str, Any]:
        """
        Detect if a property transaction is anomalous

        Args:
            predio_dict: Dictionary with property features

        Returns:
            Dictionary with anomaly detection results
        """
        try:
            # Get model and artifacts
            detector = ml_models.get_anomaly_detector()
            artifacts = ml_models.get_anomaly_artifacts()

            # Get required info
            features = artifacts.get("features", [])
            encoders = artifacts.get("encoders", {})  # Dict with lists as values
            scaler_dict = artifacts.get("scaler", {})

            # Convert to DataFrame
            df = pd.DataFrame([predio_dict])

            # Select only the required features
            df = df[features]

            # Apply label encoding for categorical features
            # Encoders are lists - encode by finding index in the list
            for col_name, categories_list in encoders.items():
                if col_name in df.columns:
                    original_value = df[col_name].iloc[0]
                    try:
                        # Find index of value in categories list
                        encoded_value = categories_list.index(original_value)
                        df[col_name] = encoded_value
                        logger.info(
                            f"Encoded {col_name}: '{original_value}' -> {encoded_value}"
                        )
                    except ValueError:
                        # Handle unseen categories - use 0
                        logger.warning(
                            f"Unseen category in {col_name}: '{original_value}', using 0"
                        )
                        df[col_name] = 0

            # Apply manual scaling
            # The scaler only applies to the first n_features (3 in this case)
            # which are the numerical features, not the encoded categorical ones
            if scaler_dict and "mean" in scaler_dict and "scale" in scaler_dict:
                mean = np.array(scaler_dict["mean"])
                scale = np.array(scaler_dict["scale"])
                n_features_scaled = scaler_dict.get("n_features", len(mean))

                # Get the values as numpy array
                df_values = df.values[0]  # Get the 1D array

                # Only scale the first n_features_scaled features
                # The rest (encoded categoricals) are left as-is
                scaled_features = (df_values[:n_features_scaled] - mean) / scale

                # Combine scaled numerical features with unscaled encoded categoricals
                if len(df_values) > n_features_scaled:
                    df_scaled = np.concatenate(
                        [scaled_features, df_values[n_features_scaled:]]
                    )
                else:
                    df_scaled = scaled_features

                # Reshape to 2D array (1 row, n features)
                df_scaled = df_scaled.reshape(1, -1)

                logger.info(f"Scaling applied to first {n_features_scaled} features")
            else:
                # No scaler, use raw values
                logger.warning("No scaler information found, using raw values")
                df_scaled = df.values

            # Make prediction (-1 = anomaly, 1 = normal)
            prediction = detector.predict(df_scaled)[0]

            # Get anomaly score (lower = more anomalous)
            score = detector.score_samples(df_scaled)[0]

            return {
                "anomalia_detectada": prediction == -1,
                "es_normal": prediction == 1,
                "score_anomalia": float(score),
                "prediccion_raw": int(prediction),
            }

        except Exception as e:
            logger.error(f"Error in anomaly detection: {e}")
            import traceback

            logger.error(traceback.format_exc())
            raise

    def prediccion_completa(self, predio_dict: Dict[str, Any]) -> Dict[str, Any]:
        """
        Perform both price classification and anomaly detection

        Args:
            predio_dict: Dictionary with property features

        Returns:
            Dictionary with both classification and anomaly detection results
        """
        try:
            clasificacion = self.clasificar_precio(predio_dict)
            anomalia = self.detectar_anomalia(predio_dict)

            return {
                "clasificacion": clasificacion,
                "deteccion_anomalia": anomalia,
                "predio_input": predio_dict,
            }

        except Exception as e:
            logger.error(f"Error in full prediction: {e}")
            raise


# Global service instance
prediction_service = PredictionService()
