import CodeBlock from '../components/ui/CodeBlock'
import PrismaCard from '../components/ui/PrismaCard'
import LiveDemo from '../components/ui/LiveDemo'

function MongoIntro() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🍃 ¿Qué es MongoDB?</h2>
      <p className="text-sm text-prisma-gray">Base de datos <span className="text-mongo-green font-medium">NoSQL documental</span>. Documentos JSON flexibles.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <PrismaCard title="¿Por qué MongoDB?" icon="🍃" variant="green">
          <ul className="space-y-1.5 text-xs">
            <li>✅ Flexible — sin schema rígido</li>
            <li>✅ Escalable — sharding horizontal</li>
            <li>✅ JavaScript friendly — JSON nativo</li>
            <li>✅ Atlas — cloud gratuito</li>
          </ul>
        </PrismaCard>
        <PrismaCard title="SQL vs MongoDB" icon="📋" variant="default">
          <div className="space-y-1 text-xs font-code">
            <div className="flex justify-between"><span className="text-sql-blue">Tabla</span><span className="text-mongo-green">Collection</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">Fila</span><span className="text-mongo-green">Document</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">Columna</span><span className="text-mongo-green">Field</span></div>
            <div className="flex justify-between"><span className="text-sql-blue">JOIN</span><span className="text-mongo-green">$lookup / embed</span></div>
          </div>
        </PrismaCard>
      </div>
    </div>
  )
}

function MongoCrud() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🔄 CRUD</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="CRUD" language="js" code={`db.users.insertOne({ name: "Ana", email: "ana@mail.com", age: 28 })
db.users.insertMany([{ name: "Bob" }, { name: "Eve" }])

db.users.find()
db.users.findOne({ email: "ana@mail.com" })
db.users.find({ age: { $gte: 25 } })
db.users.find({}, { name: 1, email: 1, _id: 0 })
db.users.find().sort({ age: -1 }).limit(10).skip(20)

db.users.updateOne({ email: "ana@mail.com" }, { $set: { age: 29 } })
db.users.updateMany({ age: { $lt: 18 } }, { $set: { status: "minor" } })

db.users.deleteOne({ email: "ana@mail.com" })
db.users.deleteMany({ status: "inactive" })`} />
        <PrismaCard title="Operadores" icon="🔍" variant="green">
          <div className="space-y-1 text-xs font-code">
            <div className="flex justify-between"><span className="text-mongo-green">$eq $ne</span><span className="text-prisma-gray">igual / diferente</span></div>
            <div className="flex justify-between"><span className="text-mongo-green">$gt $gte $lt $lte</span><span className="text-prisma-gray">comparación</span></div>
            <div className="flex justify-between"><span className="text-mongo-green">$in</span><span className="text-prisma-gray">en array</span></div>
            <div className="flex justify-between"><span className="text-mongo-green">$and $or $not</span><span className="text-prisma-gray">lógicos</span></div>
            <div className="flex justify-between"><span className="text-mongo-green">$set</span><span className="text-prisma-gray">establecer</span></div>
            <div className="flex justify-between"><span className="text-mongo-green">$inc</span><span className="text-prisma-gray">incrementar</span></div>
            <div className="flex justify-between"><span className="text-mongo-green">$push $pull</span><span className="text-prisma-gray">array ops</span></div>
          </div>
        </PrismaCard>
      </div>
    </div>
  )
}

function MongoQuery() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🔍 Queries Avanzados</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Queries" language="js" code={`db.users.find({ $and: [{ age: { $gte: 18 } }, { is_active: true }] })
db.users.find({ $or: [{ city: "Madrid" }, { city: "Barcelona" }] })
db.users.find({ name: { $regex: /^ana/i } })
db.users.find({ skills: "React" })
db.users.find({ skills: { $all: ["React", "Node"] } })
db.users.find({ "address.city": "Madrid" })
db.users.find({ phone: { $exists: true } })

db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ name: "text" })`} />
        <PrismaCard title="Índices MongoDB" icon="⚡" variant="green">
          <ul className="space-y-1 text-xs font-code">
            <li><span className="text-mongo-green">{'{ email: 1 }'}</span> — ascendente</li>
            <li><span className="text-mongo-green">{'{ age: -1 }'}</span> — descendente</li>
            <li><span className="text-mongo-green">{'{ unique: true }'}</span> — único</li>
            <li><span className="text-mongo-green">{'{ name: "text" }'}</span> — búsqueda texto</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function MongoSchema() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🏗️ Schema Design</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Embedding vs Referencing" language="js" code={`// EMBEDDING (anidar)
{
  name: "Ana",
  address: { city: "Madrid", country: "España" },
  posts: [{ title: "Post 1" }, { title: "Post 2" }]
}

// REFERENCING (por ID)
// users: { _id: ObjectId("..."), name: "Ana" }
// posts: { _id: ObjectId("..."), userId: ObjectId("...") }

// $LOOKUP (JOIN)
db.users.aggregate([{
  $lookup: { from: "posts", localField: "_id",
    foreignField: "userId", as: "posts" }
}])`} />
        <div className="space-y-4">
          <PrismaCard title="¿Cuándo embeber?" icon="📦" variant="green">
            <ul className="space-y-1 text-xs">
              <li>✅ Datos siempre se leen juntos</li>
              <li>✅ Relación 1:1 o 1:pocos</li>
              <li>✅ Datos que no cambian mucho</li>
            </ul>
          </PrismaCard>
          <PrismaCard title="¿Cuándo referenciar?" icon="🔗" variant="blue">
            <ul className="space-y-1 text-xs">
              <li>✅ Relación 1:muchos (cientos+)</li>
              <li>✅ Datos independientes</li>
              <li>✅ Muchos:muchos</li>
            </ul>
          </PrismaCard>
        </div>
      </div>
    </div>
  )
}

function MongoAggregation() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">📊 Aggregation Pipeline</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Pipeline" language="js" code={`db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
    _id: "$userId",
    totalOrders: { $sum: 1 },
    totalSpent: { $sum: "$total" },
    avgOrder: { $avg: "$total" }
  }},
  { $lookup: { from: "users", localField: "_id",
    foreignField: "_id", as: "user" }},
  { $unwind: "$user" },
  { $project: { userName: "$user.name", totalOrders: 1,
    totalSpent: { $round: ["$totalSpent", 2] } }},
  { $sort: { totalSpent: -1 } },
  { $limit: 10 }
])`} />
        <PrismaCard title="Stages" icon="📋" variant="green">
          <ul className="space-y-1 text-xs font-code">
            <li><span className="text-mongo-green">$match</span> — Filtrar</li>
            <li><span className="text-mongo-green">$group</span> — Agrupar</li>
            <li><span className="text-mongo-green">$sort</span> — Ordenar</li>
            <li><span className="text-mongo-green">$limit $skip</span> — Paginar</li>
            <li><span className="text-mongo-green">$project</span> — Campos</li>
            <li><span className="text-mongo-green">$lookup</span> — JOIN</li>
            <li><span className="text-mongo-green">$unwind</span> — Expandir array</li>
          </ul>
        </PrismaCard>
      </div>
    </div>
  )
}

function MongoMongoose() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold gradient-text-prisma">🔧 Mongoose</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Mongoose" language="js" code={`import mongoose from 'mongoose';
await mongoose.connect('mongodb://localhost:27017/mi_app');

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  age:   { type: Number, min: 0 },
  role:  { type: String, enum: ['user', 'admin'], default: 'user' },
  skills: [String],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const user = await User.create({ name: 'Ana', email: 'ana@mail.com' });
const users = await User.find({ age: { $gte: 18 } }).sort({ name: 1 }).limit(10);
await User.findByIdAndUpdate('id123', { name: 'Ana García' });
await User.findByIdAndDelete('id123');
const withPosts = await User.findById('id123').populate('posts');`} />
        <PrismaCard title="🎓 MongoDB completado" icon="🏆" variant="green">
          <p className="text-xs">Dominas CRUD, queries, schema design, aggregation y Mongoose.</p>
        </PrismaCard>
      </div>
    </div>
  )
}

export const mongoTopics = {
  'mongo-intro': MongoIntro, 'mongo-crud': MongoCrud,
  'mongo-query': MongoQuery, 'mongo-schema': MongoSchema,
  'mongo-aggregation': MongoAggregation, 'mongo-mongoose': MongoMongoose,
}
