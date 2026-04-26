import CodeBlock from '../components/ui/CodeBlock'
import PrismaCard from '../components/ui/PrismaCard'
import LiveDemo from '../components/ui/LiveDemo'

function SqlIntro() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">📖 ¿Qué es SQL?</h2>
      <p className="text-sm text-prisma-gray">SQL es el lenguaje para <span className="text-sql-blue font-medium">hablar con bases de datos relacionales</span>. Universal.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <PrismaCard title="¿Por qué SQL?" icon="🤔" variant="blue">
          <ul className="space-y-1.5 text-xs">
            <li>✅ Universal — todas las DBs relacionales</li>
            <li>✅ 50+ años y sigue siendo #1</li>
            <li>✅ Obligatorio para backend</li>
            <li>✅ Millones de registros en ms</li>
          </ul>
        </PrismaCard>
        <PrismaCard title="Conceptos clave" icon="📌" variant="purple">
          <ul className="space-y-1 text-xs">
            <li><span className="text-prisma-purple-light">Tabla</span> — Como hoja de Excel</li>
            <li><span className="text-prisma-purple-light">Columna</span> — Un campo (name, email)</li>
            <li><span className="text-prisma-purple-light">Fila</span> — Un registro</li>
            <li><span className="text-prisma-purple-light">Primary Key</span> — ID único</li>
            <li><span className="text-prisma-purple-light">Foreign Key</span> — Referencia a otra tabla</li>
            <li><span className="text-prisma-purple-light">Index</span> — Acelera búsquedas</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function SqlSelect() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🔍 SELECT</h2>
      <p className="text-sm text-prisma-gray">El comando más usado. Obtiene datos de tablas.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="SELECT" language="sql" code={`SELECT * FROM users;
SELECT name, email FROM users;
SELECT name AS nombre FROM users;
SELECT DISTINCT city FROM users;
SELECT * FROM users ORDER BY name ASC;
SELECT * FROM users ORDER BY age DESC;
SELECT * FROM users LIMIT 10;
SELECT * FROM users LIMIT 10 OFFSET 20;
SELECT COUNT(*) AS total FROM users;
SELECT name, age,
  CASE WHEN age < 18 THEN 'Menor'
       WHEN age < 65 THEN 'Adulto'
       ELSE 'Senior' END AS categoria
FROM users;`} />
        <PrismaCard title="Orden de ejecución" icon="📋" variant="blue">
          <ol className="space-y-0.5 text-xs list-decimal pl-4">
            <li>FROM — de qué tabla</li><li>WHERE — filtrar filas</li>
            <li>GROUP BY — agrupar</li><li>HAVING — filtrar grupos</li>
            <li>SELECT — qué columnas</li><li>ORDER BY — ordenar</li>
            <li>LIMIT/OFFSET — cortar</li>
          </ol>
        </PrismaCard>
      </div>
    </div>
  )
}

function SqlWhere() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🎯 WHERE y Filtros</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="WHERE" language="sql" code={`SELECT * FROM users WHERE age = 25;
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE name = 'Ana';
SELECT * FROM users WHERE age > 18 AND is_active = true;
SELECT * FROM users WHERE city = 'Madrid' OR city = 'Barcelona';
SELECT * FROM users WHERE age BETWEEN 18 AND 30;
SELECT * FROM users WHERE city IN ('Madrid', 'Barcelona', 'Valencia');
SELECT * FROM users WHERE name LIKE 'Ana%';
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE name LIKE '%arc%';
SELECT * FROM users WHERE bio IS NULL;
SELECT * FROM users WHERE bio IS NOT NULL;
SELECT * FROM users WHERE city NOT IN ('Madrid', 'Barcelona');`} />
        <PrismaCard title="Operadores" icon="📋" variant="blue">
          <div className="space-y-1 text-xs font-code">
            <div className="flex justify-between"><span className="text-sql-blue">=</span><span className="text-prisma-gray">igual</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">{'!='}</span><span className="text-prisma-gray">diferente</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">{'>'} {'>='}</span><span className="text-prisma-gray">mayor</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">{'<'} {'<='}</span><span className="text-prisma-gray">menor</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">BETWEEN</span><span className="text-prisma-gray">en rango</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">IN</span><span className="text-prisma-gray">en lista</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">LIKE</span><span className="text-prisma-gray">patrón</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">IS NULL</span><span className="text-prisma-gray">es nulo</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">AND OR NOT</span><span className="text-prisma-gray">lógicos</span></div>
          </div>
        </PrismaCard>
      </div>
    </div>
  )
}

function SqlInsert() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">✏️ INSERT, UPDATE, DELETE</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Escritura" language="sql" code={`INSERT INTO users (name, email, age) VALUES ('Ana', 'ana@mail.com', 28);
INSERT INTO users (name, email) VALUES ('Bob', 'bob@mail.com'), ('Eve', 'eve@mail.com');
UPDATE users SET name = 'Ana García' WHERE id = 1;
UPDATE users SET age = age + 1 WHERE id = 1;
DELETE FROM users WHERE id = 5;
DELETE FROM users WHERE is_active = false;
INSERT INTO users (email, name) VALUES ('ana@mail.com', 'Ana')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;`} />
        <PrismaCard title="Regla de oro" icon="🚨" variant="red">
          <p className="text-xs font-bold">SIEMPRE usa WHERE en UPDATE y DELETE. Sin WHERE afecta TODAS las filas.</p>
        </PrismaCard>
      </div>
    </div>
  )
}

function SqlJoins() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🔗 JOINs</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="JOINs" language="sql" code={`SELECT u.name, p.title FROM users u
INNER JOIN posts p ON u.id = p.user_id;

SELECT u.name, COUNT(p.id) AS total FROM users u
LEFT JOIN posts p ON u.id = p.user_id GROUP BY u.id, u.name;

SELECT u.name, p.title, c.text FROM users u
JOIN posts p ON u.id = p.user_id
JOIN comments c ON p.id = c.post_id WHERE u.is_active = true;

SELECT e.name AS empleado, m.name AS jefe FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`} />
        <LiveDemo title="JOINs visual">
          <div className="grid grid-cols-2 gap-3 text-[10px]">
            <div className="p-2 rounded-lg bg-prisma-green/10 border border-prisma-green/30 text-center">
              <p className="text-prisma-green font-bold">INNER JOIN</p>
              <p className="text-prisma-gray mt-1">Solo coincidencias</p>
            </div>
            <div className="p-2 rounded-lg bg-prisma-blue/10 border border-prisma-blue/30 text-center">
              <p className="text-prisma-blue font-bold">LEFT JOIN</p>
              <p className="text-prisma-gray mt-1">Todos izq + coincidencias</p>
            </div>
            <div className="p-2 rounded-lg bg-prisma-orange/10 border border-prisma-orange/30 text-center">
              <p className="text-prisma-orange font-bold">RIGHT JOIN</p>
              <p className="text-prisma-gray mt-1">Todos der + coincidencias</p>
            </div>
            <div className="p-2 rounded-lg bg-prisma-purple/10 border border-prisma-purple/30 text-center">
              <p className="text-prisma-purple-light font-bold">FULL JOIN</p>
              <p className="text-prisma-gray mt-1">Todos de ambas</p>
            </div>
          </div>
        </LiveDemo>
      </div>
    </div>
  )
}

function SqlAggregate() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">📊 Agregación</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="GROUP BY" language="sql" code={`SELECT COUNT(*) FROM users;
SELECT SUM(salary) FROM users;
SELECT AVG(age) FROM users;
SELECT MIN(age), MAX(salary) FROM users;

SELECT city, COUNT(*) AS total FROM users GROUP BY city ORDER BY total DESC;

SELECT department, COUNT(*) AS empleados, AVG(salary) AS salario_avg
FROM employees GROUP BY department;

SELECT city, COUNT(*) AS total FROM users
GROUP BY city HAVING total > 5 ORDER BY total DESC;`} />
        <PrismaCard title="WHERE vs HAVING" icon="⚔️" variant="blue">
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-lg bg-db-input border border-db-border">
              <p className="text-sql-blue font-bold">WHERE</p>
              <p className="text-prisma-gray">Filtra filas ANTES de agrupar</p>
            </div>
            <div className="p-2 rounded-lg bg-db-input border border-db-border">
              <p className="text-prisma-purple-light font-bold">HAVING</p>
              <p className="text-prisma-gray">Filtra grupos DESPUÉS de agrupar</p>
            </div>
          </div>
        </PrismaCard>
      </div>
    </div>
  )
}

function SqlSubqueries() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🔄 Subqueries</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Subqueries y CTEs" language="sql" code={`SELECT * FROM users WHERE EXISTS (
  SELECT 1 FROM posts WHERE posts.user_id = users.id);

SELECT name, (SELECT COUNT(*) FROM posts WHERE posts.user_id = users.id) AS total
FROM users;

WITH top_users AS (
  SELECT user_id, COUNT(*) AS cnt FROM posts GROUP BY user_id HAVING COUNT(*) > 10
)
SELECT u.name, t.cnt FROM users u
JOIN top_users t ON u.id = t.user_id ORDER BY t.cnt DESC;`} />
        <PrismaCard title="CTE vs Subquery" icon="💡" variant="green">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-prisma-green font-bold">CTE (WITH)</span> — Más legible. Reutilizable.</li>
            <li><span className="text-sql-blue font-bold">Subquery</span> — Inline. Para cosas simples.</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function SqlIndexes() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">⚡ Índices</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Índices" language="sql" code={`CREATE INDEX idx_users_email ON users(email);
CREATE UNIQUE INDEX idx_email_unique ON users(email);
CREATE INDEX idx_users_city_age ON users(city, age);
CREATE INDEX idx_active ON users(email) WHERE is_active = true;
DROP INDEX idx_users_email;
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'ana@mail.com';`} />
        <PrismaCard title="¿Cuándo crear?" icon="📋" variant="blue">
          <ul className="space-y-1.5 text-xs">
            <li>✅ Columnas en WHERE frecuente</li>
            <li>✅ Columnas en JOIN (foreign keys)</li>
            <li>✅ Columnas en ORDER BY</li>
            <li>❌ Tablas pequeñas</li>
            <li>❌ Columnas con pocos valores distintos</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function SqlDesign() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🏗️ Diseño de Esquemas</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Relaciones" language="sql" code={`CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY, title VARCHAR(200) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE roles (id SERIAL PRIMARY KEY, name VARCHAR(50) UNIQUE NOT NULL);

CREATE TABLE user_roles (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id));

CREATE TABLE user_profiles (
  user_id INTEGER PRIMARY KEY REFERENCES users(id),
  bio TEXT, avatar_url VARCHAR(500));`} />
        <PrismaCard title="Naming conventions" icon="📝" variant="default">
          <ul className="space-y-1 text-xs">
            <li>✅ Tablas en plural: users, posts</li>
            <li>✅ snake_case: created_at, user_id</li>
            <li>✅ PK siempre id</li>
            <li>✅ FK: tabla_singular_id (user_id)</li>
            <li>✅ Pivote: tabla1_tabla2 (user_roles)</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function SqlTips() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">💡 Tips</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Optimización" language="sql" code={`SELECT id, name, email FROM users;
SELECT * FROM users ORDER BY created_at DESC LIMIT 20;
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'ana@mail.com';

BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

SELECT * FROM posts WHERE id > 100000 ORDER BY id LIMIT 10;`} />
        <PrismaCard title="Seguridad" icon="🛡️" variant="red">
          <ul className="space-y-1.5 text-xs">
            <li>✅ SIEMPRE prepared statements</li>
            <li>✅ Validar input</li>
            <li>✅ Menor privilegio</li>
            <li>✅ Encriptar passwords</li>
            <li>✅ Backup regular</li>
            <li>❌ NUNCA concatenar SQL con input</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

export const sqlTopics = {
  'sql-intro': SqlIntro, 'sql-select': SqlSelect, 'sql-where': SqlWhere,
  'sql-insert': SqlInsert, 'sql-joins': SqlJoins, 'sql-aggregate': SqlAggregate,
  'sql-subqueries': SqlSubqueries, 'sql-indexes': SqlIndexes,
  'sql-design': SqlDesign, 'sql-tips': SqlTips,
}
