# Documentacion de Backend
inicializacion y creación de la base de datos
"""bash
python -m app.core.init_db
"""
correr el backend 

"""bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
"""