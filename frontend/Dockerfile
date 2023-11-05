# Wybierz obraz bazowy
FROM node:18

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Kopiuj pliki 'package.json' i 'package-lock.json' (lub 'yarn.lock')
COPY package*.json ./

# Zainstaluj zależności projektu, w tym 'serve' do serwowania aplikacji
RUN npm install
RUN npm install -g serve

# Kopiuj pliki projektu do katalogu roboczego
COPY . .

# Zbuduj aplikację (jeśli to krok jest wymagany)
RUN npm run build

# Określ port, na którym będzie wystawiona usługa
EXPOSE 3000

# Uruchom aplikację za pomocą 'serve'
CMD ["serve", "-s", "dist", "-l", "3000"]
