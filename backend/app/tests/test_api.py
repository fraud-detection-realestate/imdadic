"""
Test API endpoints with example data
"""

import requests
import json

# API base URL
BASE_URL = "http://127.0.0.1:8000"

# Example property data from README
predio_ejemplo = {
    "DEPARTAMENTO": "ANTIOQUIA",
    "MUNICIPIO": "MEDELLIN",
    "TIPO_PREDIO_ZONA": "URBANO",
    "CATEGORIA_RURALIDAD": "Urbano",
    "ORIP": "001",
    "ESTADO_FOLIO": "ACTIVO",
    "YEAR_RADICA": 2023,
    "NUM_ANOTACION": 5,
    "Dinámica_Inmobiliaria": 10,
    "COD_NATUJUR": 125,
    "COUNT_A": 1,
    "COUNT_DE": 1,
    "PREDIOS_NUEVOS": 0,
    "TIENE_MAS_DE_UN_VALOR": 0,
    "VALOR_CONSTANTE_2024": 500000000,
}


def test_health():
    """Test health endpoint"""
    print("\n1️⃣  Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False


def test_classify_price():
    """Test price classification endpoint"""
    print("\n2️⃣  Testing price classification...")
    try:
        response = requests.post(
            f"{BASE_URL}/api/v1/predictions/classify-price", json=predio_ejemplo
        )
        print(f"   Status: {response.status_code}")
        print(f"   Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False


def test_detect_anomaly():
    """Test anomaly detection endpoint"""
    print("\n3️⃣  Testing anomaly detection...")
    try:
        response = requests.post(
            f"{BASE_URL}/api/v1/predictions/detect-anomaly", json=predio_ejemplo
        )
        print(f"   Status: {response.status_code}")
        print(f"   Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False


def test_full_prediction():
    """Test full prediction endpoint"""
    print("\n4️⃣  Testing full prediction...")
    try:
        response = requests.post(
            f"{BASE_URL}/api/v1/predictions/full", json=predio_ejemplo
        )
        print(f"   Status: {response.status_code}")
        print(f"   Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False


if __name__ == "__main__":
    print("=" * 60)
    print("🧪 Testing IMDADIC API Endpoints")
    print("=" * 60)

    results = {
        "health": test_health(),
        "classify_price": test_classify_price(),
        "detect_anomaly": test_detect_anomaly(),
        "full_prediction": test_full_prediction(),
    }

    print("\n" + "=" * 60)
    print("📊 Test Results Summary")
    print("=" * 60)
    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"   {test_name}: {status}")

    all_passed = all(results.values())
    print("\n" + ("🎉 All tests passed!" if all_passed else "⚠️  Some tests failed"))
