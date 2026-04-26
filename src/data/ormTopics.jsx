import CodeBlock from '../components/ui/CodeBlock'
import PrismaCard from '../components/ui/PrismaCard'

function OrmIntro() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">📖 ¿Qué son los ORMs?</h2>
      <p className="text-sm text-prisma-gray">ORM mapea tablas a objetos. Escribes código en vez de SQL.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <PrismaCard title="SQL vs ORM" icon="⚔️" variant="purple">
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-lg bg-db-input border border-db-border">
              <p className="text-sql-blue font-bold">SQL:</p>
              <code className="text-prisma-gray font-code text-[10px]">{"SELECT * FROM users WHERE age > 25"}</code>
            </div>
            <div className="p-2 rounded-lg bg-db-input border border-db-border">
              <p className="text-orm-purple font-bold">Prisma:</p>
              <code className="text-prisma-gray font-code text-[10px]">{"prisma.user.findMany({ where: { age: { gt: 25 } } })"}</code>
            </div>
          </div>
        </PrismaCard>
        <PrismaCard title="ORMs populares" icon="📋" variant="default">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-orm-purple font-bold">Prisma</span> — Moderno. Type-safe. Schema declarativo.</li>
            <li><span className="text-prisma-cyan font-bold">Drizzle</span> — Ligero. SQL-like. TypeScript first.</li>
            <li><span className="text-prisma-orange font-bold">Sequelize</span> — Maduro. Mucha docs.</li>
            <li><span className="text-prisma-pink font-bold">TypeORM</span> — Decoradores.</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function OrmPrisma() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">💎 Prisma</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Schema" language="prisma" code={`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  age       Int?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}`} />
        <CodeBlock title="Prisma Client" language="js" code={`import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const user = await prisma.user.create({
  data: { name: 'Ana', email: 'ana@mail.com' }
})

const users = await prisma.user.findMany({
  where: { age: { gte: 25 } },
  orderBy: { name: 'asc' },
  include: { posts: true },
})

await prisma.user.update({
  where: { id: 1 }, data: { name: 'Ana García' }
})

await prisma.user.delete({ where: { id: 1 } })`} />
      </div>
    </div>
  )
}

function OrmDrizzle() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">💧 Drizzle ORM</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Schema" language="js" code={`import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  age: integer('age'),
  createdAt: timestamp('created_at').defaultNow(),
});`} />
        <CodeBlock title="Queries" language="js" code={`import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, gte, desc } from 'drizzle-orm';
import { users } from './schema';

const db = drizzle(pool);

const allUsers = await db.select().from(users);
const filtered = await db.select().from(users)
  .where(gte(users.age, 25)).orderBy(desc(users.name)).limit(10);

const [newUser] = await db.insert(users)
  .values({ name: 'Ana', email: 'ana@mail.com' }).returning();

await db.update(users).set({ name: 'Ana García' }).where(eq(users.id, 1));
await db.delete(users).where(eq(users.id, 1));`} />
      </div>
    </div>
  )
}

function OrmCompare() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">⚔️ Comparación</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <PrismaCard title="Prisma" icon="💎" variant="purple">
            <ul className="space-y-1 text-xs">
              <li>✅ Schema declarativo fácil</li>
              <li>✅ Migraciones automáticas</li>
              <li>✅ Prisma Studio GUI</li>
              <li>✅ Type safety extremo</li>
              <li>❌ Más overhead</li>
              <li>📌 Ideal: startups, prototipos</li>
            </ul>
          </PrismaCard>
          <PrismaCard title="Drizzle" icon="💧" variant="cyan">
            <ul className="space-y-1 text-xs">
              <li>✅ Ligero y rápido</li>
              <li>✅ SQL-like</li>
              <li>✅ Más control</li>
              <li>❌ Ecosistema más nuevo</li>
              <li>📌 Ideal: devs que quieren control</li>
            </ul>
          </PrismaCard>
        </div>
        <div className="space-y-4">
          <PrismaCard title="¿Cuál elegir?" icon="🤔" variant="green">
            <ul className="space-y-1.5 text-xs">
              <li>🟢 <strong>Empezando</strong> → Prisma</li>
              <li>🔵 <strong>Más control</strong> → Drizzle</li>
              <li>🟡 <strong>Performance</strong> → SQL crudo</li>
              <li>⚪ <strong>Legacy</strong> → Sequelize/TypeORM</li>
            </ul>
          </PrismaCard>
          <PrismaCard title="🎓 ¡Completado!" icon="🏆" variant="purple">
            <ul className="space-y-1 text-xs">
              <li><span className="text-prisma-green">✓</span> SQL universal</li>
              <li><span className="text-prisma-green">✓</span> PostgreSQL avanzado</li>
              <li><span className="text-prisma-green">✓</span> MongoDB NoSQL</li>
              <li><span className="text-prisma-green">✓</span> ORMs: Prisma y Drizzle</li>
            </ul>
          </PrismaCard>
        </div>
      </div>
    </div>
  )
}

export const ormTopics = {
  'orm-intro': OrmIntro, 'orm-prisma': OrmPrisma,
  'orm-drizzle': OrmDrizzle, 'orm-compare': OrmCompare,
}
