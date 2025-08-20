### Global basic styles  — `src/styles.css`

```css
:root {
  --primary: red;
  --text: #222;
  --muted: #666;
  --bg: #fff;
  --border: #eee;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--text);
  background: var(--bg);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px;
}

a { color: var(--primary); text-decoration: none; }
a:hover { text-decoration: underline; }
```


### App component 

```html
<app-header></app-header>
<main class="container">
  <div>
    <router-outlet></router-outlet>
  </div>
</main>
<app-footer></app-footer>
```

```css
.container {
  display: flex;
  justify-content: center;
  background-color: rgba(241, 21, 21, 0.05);
  margin-top: 50px;
}

div {
  width: 75%;
}
```

---
### Header component
```html
<header class="site-header">
  <div class="container header-row">
    <div class="brand">
      <a>My Site</a>
    </div>

    <nav class="nav">
      <a >Home</a>
      <a >About</a>
      <a >Contact</a>
      <a >Movies</a>

      <a >Sign In</a>
      <a >Sign Up</a>
    </nav>
  </div>
</header>
```

```css
.site-header {
  border-bottom: 1px solid var(--border);
  background: #fff;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
}

.brand a {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary);
}

.nav a {
  margin-left: 12px;
  padding: 6px 8px;
  border-radius: 4px;
}

.nav a.active {
  background: rgba(255, 0, 0, 0.08);
  border: 1px solid var(--primary);
}

.nav a:last-child {
  background: var(--primary);
  color: #fff;
}
.nav a:last-child:hover {
  opacity: 0.9;
}
```
---
### Footer component
```html
<footer class="site-footer">
  <div class="container footer-row">
    <p>My Site</p>
    <p class="muted">Built with Angular</p>
  </div>
</footer>
```

```css
.site-footer {
  border-top: 1px solid var(--border);
  background: #fff;
  margin-top: 24px;
}

.footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20;
}

.muted { color: var(--muted); font-size: 14px; }
```


---
### Home component
```html
<section>
  <h1 style="color: var(--primary);">Welcome</h1>
  <p>This is the home page. Use the navigation to explore the site.</p>
</section>
```

```css
section { padding: 8px 0; }
```

---
### About component
```html
<section>
  <h1 style="color: var(--primary);">About Us</h1>
  <p>Short description about your website</p>
</section>
```

```css
section { padding: 8px 0; }
```

---
### Contact component
```html
<section>
  <h1 style="color: var(--primary);">Contact</h1>


  <form class="contact-form">
    <label>
      Name
      <input type="text" placeholder="Your name" />
    </label>

    <label>
      Email
      <input type="email" placeholder="you@example.com" />
    </label>

    <label>
      Message
      <textarea rows="4" placeholder="How can we help?"></textarea>
    </label>

    <button type="submit">Send</button>
  </form>
</section>
```

```css
section { padding: 8px 0; }

.contact-form {
  display: grid;
  gap: 10px;

}
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
}
.contact-form button {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.contact-form button:hover { opacity: 0.9; }
```
---
---
### Movies component
```html
<section>
  <h1 style="color: var(--primary);">Movies</h1>

  <div class="movie-grid">
    <article class="movie-card">
      <h3>Movie Title</h3>
      <p class="muted">Short description…</p>
      <button type="button">Details</button>
    </article>

    <article class="movie-card">
      <h3>Another Movie</h3>
      <p class="muted">Short description…</p>
      <button type="button">Details</button>
    </article>
  </div>
</section>
```

```css
section { padding: 8px 0; }

.movie-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.movie-card {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px;
  background: #fff;
}

.movie-card h3 { margin: 0 0 6px; }

.movie-card button {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.movie-card button:hover { opacity: 0.9; }

```

---

---
### SignIn component
```html

<section class="card">
  <h1>Login</h1>

  <form  class="login-form" #loginForm="ngForm" (ngSubmit)="onSubmit()">

    <div>
      <label>Email</label>
      <input
        type="email"
        name="email"
        ngModel
        required
        email
        #emailRef="ngModel"
      />
      @if (emailRef.invalid && emailRef.touched) {
      <small class="error">Email is required</small>
      }
      </div>
  

      <div>
   
      <label>Password</label>
      <input
        type="password"
        name="password"
        ngModel
        required
        minlength="8"
        #passwordRef="ngModel"
      />
      @if (passwordRef.invalid && passwordRef.touched) {
      <small class="error">Password is required</small>
      }
      </div>
   

    <button type="submit" [disabled]="loading">
      {{ loading ? 'Signing in...' : 'Login' }}
    </button>

    @if (serverError) {
    <small class="server-error">{{ serverError }}</small>
    }
  </form>
</section>
```

```css
h1 {
  text-align: center;
}

.signin-form {
  display: grid;
  gap: 14px;
  width: 100%;

  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.signin-form label {
  display: grid;
  gap: 4px;
  font-size: 14px;
}

.signin-form input {
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 14px;
}

.signin-form button {
  background: var(--primary);
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
}

.signin-form button:hover {
  opacity: 0.9;
}

div * {
  width: 100%;
}

small {
  color: red;
  font-size: 12px;
}

```

---

## movie-details component

```html
<section class="movie-details">
  <!-- Cover Image -->
  <div class="cover">
    <img src="'http://localhost:4200/uploads/movies' + movie.coverImage" alt="Movie Cover" />
  </div>

  <!-- Movie Info -->
  <div class="info">
    <h1>{{ movie.name }}</h1>
    <p class="muted">{{ movie.language }} • {{ movie.releaseYear }} • {{ movie.duration }} min</p>

    <p class="description">{{ movie.description }}</p>

    <!-- Ratings -->
    <div class="ratings"><strong>⭐ {{ movie.ratings || 0 }}</strong> ({{ movie.totalRatings || 0 }} ratings)</div>

    <!-- Genres -->
    <div class="genres">
      @for (g of movie.genres; track $index) {
      <span>{{ g }}</span>
      }
    </div>

    <!-- Directors -->
    <p><strong>Directors:</strong> {{ movie.directors.join(', ') }}</p>

    <!-- Actors -->
    <p><strong>Actors:</strong> {{ movie.actors.join(', ') }}</p>

    <!-- Trailer -->
    @if (movie.trailerUrl) {
    <div class="trailer">
      <iframe [src]="movie.trailerUrl"></iframe>
    </div>
    }
    <!-- Price & Availability -->
    <div class="buy">
      <span class="price">\${{ movie.price }}</span>
      <button [disabled]="!movie.isAvailable">{{ movie.isAvailable ? 'Buy Ticket' : 'Not Available' }}</button>
    </div>
  </div>
</section>
```
---
```css
.movie-details {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.cover img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.info h1 {
  margin: 0 0 8px;
  color: var(--primary);
}

.muted {
  color: var(--muted);
  margin-bottom: 16px;
}

.description {
  margin-bottom: 16px;
}

.ratings {
  margin-bottom: 12px;
}

.genres {
  margin-bottom: 12px;
}
.tag {
  display: inline-block;
  background: rgba(255, 0, 0, 0.1);
  color: var(--primary);
  padding: 4px 8px;
  border-radius: 6px;
  margin: 2px;
  font-size: 13px;
}

.trailer {
  margin: 16px 0;
}
.trailer iframe {
  width: 100%;
  height: 250px;
  border-radius: 6px;
}

.buy {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}
.price {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary);
}
.buy button {
  background: var(--primary);
  color: #fff;
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.buy button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
```