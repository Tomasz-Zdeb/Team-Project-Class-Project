# Wybierz obraz bazowy, np. oficjalny obraz Pythona
FROM python:3.10

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik 'requirements.txt' i zainstaluj zależności projektu
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Skopiuj katalog EaterNet (zawierający manage.py i check_db.py) do katalogu roboczego
COPY EaterNet/ ./EaterNet

# Ustaw zmienne środowiskowe
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Otwórz port, na którym będzie nasłuchiwał serwer Django
EXPOSE 8000

# Ustaw katalog EaterNet jako katalog roboczy
WORKDIR /app/EaterNet

# Uruchom skrypt czekający na bazę danych, a następnie serwer Django
CMD ["sh", "-c", "python check_db.py && python manage.py runserver 0.0.0.0:8000"]
