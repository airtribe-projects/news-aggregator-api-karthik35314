# 📰 News Aggregator API

A RESTful API built with Node.js and Express.js that allows users to register, log in, set news preferences, and fetch personalized news articles from external APIs like NewsAPI and GNews.

---

## 🚀 Features

- 🔐 User authentication with JWT
- 🔒 Password hashing using bcrypt
- 📚 User preferences for personalized news
- 🌐 Integration with external news APIs
- 🧰 Input validation and error handling
- ⚡ Caching support (optional)
- 🧪 Unit testing with `tap` and `nock`

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- bcrypt
- jsonwebtoken
- dotenv
- axios
- tap (for testing)
- nock (for mocking API responses)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/news-aggregator-api.git
cd news-aggregator-api
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_newsapi_key
GNEWS_API_KEY=your_gnews_key
```

---

## ▶️ Running the Server

```bash
node app.js
```

---

## 📬 API Endpoints

### Auth

- `POST /api/register` – Register a new user
- `POST /api/login` – Log in and receive a JWT

### News

- `GET /api/news` – Get personalized news (requires JWT)

---

## 🧪 Testing

```bash
npm test
```

Uses `tap` for unit testing and `nock` for mocking external API calls.

---

## 📚 External APIs

- [NewsAPI](https://newsapi.org/)
- [GNews](https://gnews.io/)
- [NewsCatcher](https://newscatcherapi.com/)

---

## 📄 License

MIT

---

## 👨‍💻 Author

**Karthik Panneerselvam**  
Software Engineer I  
Chennai, Tamil Nadu
