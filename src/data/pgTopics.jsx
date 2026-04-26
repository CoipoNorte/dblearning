import CodeBlock from '../components/ui/CodeBlock'
import PrismaCard from '../components/ui/PrismaCard'

function PgIntro() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🐘 ¿Qué es PostgreSQL?</h2>
      <p className="text-sm text-prisma-gray">La base de datos relacional <span className="text-pg-blue font-medium">más avanzada del mundo</span>. Open source.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <PrismaCard title="¿Por qué PostgreSQL?" icon="🐘" variant="blue">
          <ul className="space-y-1.5 text-xs">
            <li>✅ Open source — gratis para siempre</li>
            <li>✅ ACID compliant — datos consistentes</li>
            <li>✅ JSON nativo — lo mejor de SQL y NoSQL</li>
            <li>✅ Extensible — tipos custom, funciones</li>
            <li>✅ Escalable — billones de registros</li>
          </ul>
        </PrismaCard>
        <PrismaCard title="PG vs MySQL vs SQLite" icon="⚔️" variant="default">
          <ul className="space-y-1 text-xs">
            <li><span className="text-pg-blue font-bold">PostgreSQL</span> — Más features, JSON, arrays. Producción.</li>
            <li><span className="text-prisma-orange font-bold">MySQL</span> — Simple, popular en PHP.</li>
            <li><span className="text-prisma-cyan font-bold">SQLite</span> — Archivo local. Prototipos.</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function PgSetup() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🚀 Instalación</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Instalar" language="bash" code={`# Docker (recomendado)
docker run --name pg -e POSTGRES_PASSWORD=secreto -p 5432:5432 -d postgres:16

# Windows: descargar de postgresql.org
# Mac: brew install postgresql@16
# Linux: sudo apt install postgresql

# Conectar
psql -U postgres

# Cloud gratis: Supabase, Neon, Railway`} />
        <CodeBlock title="Primeros comandos" language="sql" code={`CREATE DATABASE mi_app;
\\c mi_app
\\dt
\\d users

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`} />
      </div>
    </div>
  )
}

function PgTypes() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">📋 Tipos de Datos</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Tipos" language="sql" code={`CREATE TABLE ejemplo (
  id          SERIAL PRIMARY KEY,
  edad        INTEGER,
  precio      DECIMAL(10,2),
  nombre      VARCHAR(100),
  bio         TEXT,
  activo      BOOLEAN DEFAULT true,
  nacimiento  DATE,
  creado      TIMESTAMPTZ DEFAULT NOW(),
  config      JSONB,
  tags        TEXT[],
  id_uuid     UUID DEFAULT gen_random_uuid()
);`} />
        <PrismaCard title="Los más usados" icon="⭐" variant="blue">
          <ul className="space-y-1 text-xs">
            <li><span className="text-pg-blue font-bold">SERIAL</span> — ID auto-increment</li>
            <li><span className="text-pg-blue font-bold">VARCHAR(n)</span> — Texto con límite</li>
            <li><span className="text-pg-blue font-bold">TEXT</span> — Texto sin límite</li>
            <li><span className="text-pg-blue font-bold">INTEGER</span> — Números enteros</li>
            <li><span className="text-pg-blue font-bold">DECIMAL</span> — Dinero</li>
            <li><span className="text-pg-blue font-bold">BOOLEAN</span> — true/false</li>
            <li><span className="text-pg-blue font-bold">TIMESTAMPTZ</span> — Fecha+hora+zona</li>
            <li><span className="text-pg-blue font-bold">JSONB</span> — JSON rápido</li>
            <li><span className="text-pg-blue font-bold">TEXT[]</span> — Array</li>
            <li><span className="text-pg-blue font-bold">UUID</span> — ID único global</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function PgJson() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">📦 JSON y Arrays</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="JSONB" language="sql" code={`CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  metadata JSONB DEFAULT '{}'
);

INSERT INTO products (name, metadata) VALUES (
  'Laptop', '{"brand": "Dell", "specs": {"ram": 16}, "tags": ["work"]}'
);

SELECT metadata->>'brand' AS brand FROM products;
SELECT metadata->'specs'->>'ram' AS ram FROM products;
SELECT * FROM products WHERE metadata->>'brand' = 'Dell';
SELECT * FROM products WHERE metadata->'tags' ? 'work';

CREATE TABLE users (id SERIAL PRIMARY KEY, skills TEXT[] DEFAULT '{}');
INSERT INTO users (skills) VALUES (ARRAY['React', 'Node', 'SQL']);
SELECT * FROM users WHERE 'React' = ANY(skills);
UPDATE users SET skills = array_append(skills, 'Docker') WHERE id = 1;`} />
        <PrismaCard title="JSON vs JSONB" icon="⚔️" variant="blue">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-prisma-orange font-bold">JSON</span> — Texto. Más lento. Preserva formato.</li>
            <li><span className="text-pg-blue font-bold">JSONB</span> — Binario. Rápido. Indexable. SIEMPRE usar JSONB.</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function PgFunctions() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">⚙️ Funciones y Triggers</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Funciones y triggers" language="sql" code={`CREATE OR REPLACE FUNCTION get_user_stats(uid INTEGER)
RETURNS TABLE(total_posts BIGINT, avg_likes NUMERIC) AS $$
BEGIN
  RETURN QUERY SELECT COUNT(*), AVG(likes)::NUMERIC
  FROM posts WHERE user_id = uid;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_user_stats(1);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON users FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();`} />
        <PrismaCard title="Funciones built-in" icon="🧮" variant="default">
          <ul className="space-y-1 text-xs font-code">
            <li><span className="text-pg-blue">NOW()</span> — Fecha/hora actual</li>
            <li><span className="text-pg-blue">COALESCE(a, b)</span> — Primer no-null</li>
            <li><span className="text-pg-blue">gen_random_uuid()</span> — UUID</li>
            <li><span className="text-pg-blue">array_agg(col)</span> — Agrupar en array</li>
            <li><span className="text-pg-blue">string_agg(col,',')</span> — Concatenar</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function PgTransactions() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🔒 Transacciones</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Transacciones" language="sql" code={`BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

BEGIN;
  INSERT INTO orders (user_id, total) VALUES (1, 99.99);
  SAVEPOINT sp1;
  INSERT INTO items (order_id) VALUES (currval('orders_id_seq'));
  ROLLBACK TO sp1;
COMMIT;`} />
        <PrismaCard title="ACID" icon="📋" variant="purple">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-prisma-purple-light font-bold">Atomicity</span> — Todo o nada</li>
            <li><span className="text-prisma-purple-light font-bold">Consistency</span> — Datos válidos</li>
            <li><span className="text-prisma-purple-light font-bold">Isolation</span> — No interfieren</li>
            <li><span className="text-prisma-purple-light font-bold">Durability</span> — Persisten</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function PgViews() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">👁️ Views y CTEs</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Views" language="sql" code={`CREATE VIEW active_users AS
SELECT id, name, email FROM users WHERE is_active = true;
SELECT * FROM active_users;

CREATE MATERIALIZED VIEW user_stats AS
SELECT u.id, u.name, COUNT(p.id) AS total_posts
FROM users u LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name;
REFRESH MATERIALIZED VIEW user_stats;

WITH monthly AS (
  SELECT DATE_TRUNC('month', created_at) AS month, SUM(total) AS revenue
  FROM orders GROUP BY month
)
SELECT month, revenue FROM monthly ORDER BY month;`} />
        <PrismaCard title="View vs Materialized" icon="⚔️" variant="blue">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-pg-blue font-bold">View</span> — Ejecuta cada vez. Siempre fresco. Más lento.</li>
            <li><span className="text-prisma-green font-bold">Materialized</span> — Cache. Rápido. Refrescar manual.</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function PgSecurity() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🛡️ Seguridad</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Roles y permisos" language="sql" code={`CREATE ROLE app_user WITH LOGIN PASSWORD 'seguro123';
GRANT CONNECT ON DATABASE mi_app TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;
REVOKE DELETE ON users FROM app_user;

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_posts ON posts FOR ALL
  USING (user_id = current_setting('app.user_id')::integer);`} />
        <PrismaCard title="Principio menor privilegio" icon="📌" variant="red">
          <ul className="space-y-1.5 text-xs">
            <li>✅ App usa rol con permisos MÍNIMOS</li>
            <li>✅ NUNCA usar superuser para la app</li>
            <li>✅ Passwords fuertes y rotados</li>
            <li>✅ SSL para conexiones remotas</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function PgPerformance() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">⚡ Performance</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Optimización" language="sql" code={`EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'ana@mail.com';

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_meta ON products USING GIN(metadata);

VACUUM ANALYZE users;`} />
        <PrismaCard title="Checklist" icon="📋" variant="green">
          <ul className="space-y-1.5 text-xs">
            <li>✅ EXPLAIN ANALYZE en queries lentos</li>
            <li>✅ Índices en WHERE, JOIN, ORDER BY</li>
            <li>✅ Connection pooling</li>
            <li>✅ Evitar SELECT *</li>
            <li>✅ Paginación cursor-based</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function PgNode() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🔌 PG + Node.js</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Setup con pg" language="js" code={`import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  database: 'mi_app',
  user: 'app_user',
  password: process.env.DB_PASSWORD,
  max: 20,
});

const { rows } = await pool.query('SELECT * FROM users');

const { rows: [user] } = await pool.query(
  'SELECT * FROM users WHERE email = $1', ['ana@mail.com']
);

const { rows: [newUser] } = await pool.query(
  'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
  ['Ana', 'ana@mail.com']
);`} />
        <CodeBlock title="En Express" language="js" code={`app.get('/api/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users ORDER BY id');
  res.json({ success: true, data: rows });
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const { rows: [user] } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Duplicado' });
    throw err;
  }
});`} />
      </div>
    </div>
  )
}

export const pgTopics = {
  'pg-intro': PgIntro, 'pg-setup': PgSetup, 'pg-types': PgTypes,
  'pg-json': PgJson, 'pg-functions': PgFunctions, 'pg-transactions': PgTransactions,
  'pg-views': PgViews, 'pg-security': PgSecurity, 'pg-performance': PgPerformance,
  'pg-node': PgNode,
}
