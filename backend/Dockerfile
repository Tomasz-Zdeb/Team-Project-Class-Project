# Wybierz obraz bazowy, np. oficjalny obraz Pythona
FROM python:3.10

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik 'requirements.txt' i zainstaluj zależności projektu
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Skopiuj pozostałe pliki projektu do katalogu roboczego
COPY . .

# Ustaw zmienne środowiskowe
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Otwórz port, na którym będzie nasłuchiwał serwer Django
EXPOSE 8000

# Uruchom serwer Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
