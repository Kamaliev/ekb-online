# EKB Online — Smart Home Landing

Лендинг-заглушка сервиса умного дома: камеры, устройства, тарифы. Любое интерактивное действие открывает попап авторизации, который имитирует ошибку «неверный логин или пароль». Без реальной авторизации, без БД.

Стек: **Next.js 15** (App Router) · **TypeScript** · **Tailwind CSS** · **next-intl** (RU/EN) · **Zustand** · **Docker** · **Traefik v3** + Let's Encrypt.

---

## Локальная разработка

```bash
npm install
npm run dev
```

Открыть http://localhost:3000 → автоматический редирект на `/ru`.

---

## Прод-деплой одной командой

### 1. Подготовка сервера

- VPS с публичным IP, открыты порты `80` и `443`.
- Установлены Docker и Docker Compose v2.
- DNS: A-запись `<DOMAIN>` указывает на IP сервера.

### 2. Скопировать репозиторий и настроить `.env`

```bash
git clone <repo-url> ekb-online
cd ekb-online
cp .env.example .env
```

Отредактировать `.env`:

```env
DOMAIN=smarthome.example.com
ACME_EMAIL=you@example.com
```

### 3. Запустить

```bash
docker compose up -d --build
```

Через 30–60 секунд Traefik получит сертификат от Let's Encrypt по HTTP-01 challenge.

Проверка:

```bash
curl -I https://${DOMAIN}            # 200 OK, валидный TLS
curl -I http://${DOMAIN}             # 308 → https
docker compose logs -f traefik       # смотрим ACME
docker compose ps                    # оба контейнера healthy
```

### 4. Обновление

```bash
git pull
docker compose up -d --build
```

---

## Что внутри

| Раздел | Описание |
|--------|----------|
| `/` | Лендинг: hero → фичи → камеры → устройства → тарифы → FAQ → футер |
| `/cameras` | Сетка из 8 «онлайн камер» с LIVE-бейджами |
| `/dashboard` | Тайлы умных устройств (свет, климат, замок, датчики) |
| `/tariffs` | Отдельная страница с тарифами и FAQ |
| `/api/login` | POST → всегда `401 invalid_credentials` после задержки 700–1200мс |
| `/api/health` | GET → `200 {ok:true}` для healthcheck |

Любой клик по интерактивному элементу (кнопки шапки, тайлы камер, тайлы устройств, кнопки тарифов, ссылки футера) открывает модалку авторизации.

Локали — `ru` (по умолчанию) и `en`. Переключатель в шапке.

---

## Backup сертификатов

`acme.json` лежит в named volume `traefik-letsencrypt`. Бэкапить так:

```bash
docker run --rm -v traefik-letsencrypt:/data -v $PWD:/backup alpine \
  tar czf /backup/acme-$(date +%F).tar.gz -C /data .
```

---

## Структура проекта

```
app/
  [locale]/
    layout.tsx              # шрифты, провайдеры, Header, AuthModal
    page.tsx                # лендинг
    cameras/page.tsx
    dashboard/page.tsx
    tariffs/page.tsx
  api/
    login/route.ts          # фейковый login → 401
    health/route.ts         # healthcheck
components/                 # 10 React-компонентов
lib/
  store.ts                  # Zustand: состояние AuthModal
  cn.ts                     # className-утилита
messages/
  ru.json en.json           # все строки UI
i18n.ts middleware.ts       # next-intl
Dockerfile                  # multi-stage standalone build
docker-compose.yml          # traefik + app
.env.example                # DOMAIN, ACME_EMAIL
```
