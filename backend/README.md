# IMDADIC Backend

Backend service for the IMDADIC (Intelligent Market Data Analysis & Detection of Irregularities in Cadastre) platform. Built with FastAPI and integrated with Google Gemini for AI capabilities.

## 📋 Prerequisites

- Python 3.9+
- pip (Python package manager)

## 🚀 Installation & Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**
    - **Windows:**
        ```powershell
        .\venv\Scripts\activate
        ```
    - **macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```

4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Environment Configuration:**
    Create a `.env` file in the `backend` directory and add your Google Gemini API key:
    ```env
    GOOGLE_API_KEY=your_api_key_here
    ```

## 🏃‍♂️ Running the Server

Start the development server with hot-reload enabled:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.
- **Swagger UI:** `http://127.0.0.1:8000/docs`
- **ReDoc:** `http://127.0.0.1:8000/redoc`

## 📂 Project Structure

```
backend/
├── app/
│   ├── api/            # API Route definitions
│   │   └── v1/         # Version 1 endpoints
│   ├── core/           # Core configuration (settings, config)
│   ├── schemas/        # Pydantic models for request/response validation
│   ├── services/       # Business logic and external service integrations (Gemini)
│   └── main.py         # Application entry point
├── agent/              # Agent-specific logic (if applicable)
├── requirements.txt    # Project dependencies
└── README.md           # Project documentation
```

## 🏗️ Architecture

The backend follows a layered architecture:

- **API Layer (`app/api`)**: Handles HTTP requests, routing, and invokes services.
- **Service Layer (`app/services`)**: Contains the business logic. For example, `chat_service.py` handles interactions with the Google Gemini API.
- **Schemas (`app/schemas`)**: Defines data transfer objects (DTOs) using Pydantic to ensure type safety and validation.
- **Core (`app/core`)**: Manages application configuration and environment variables.

## 🔌 API Endpoints

### Chat
- `POST /api/v1/chat`: Endpoint for the AI assistant. Receives a user message and returns a generated response.
