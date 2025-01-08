FROM node:20

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем проект
COPY . .

# Сборка проекта с флагом experimental-modules
RUN node --experimental-modules node_modules/vite/bin/vite.js build

# Устанавливаем сервер для раздачи статики
RUN npm install -g serve

EXPOSE 3000

# Запускаем сервер
CMD ["serve", "-s", "build"]
