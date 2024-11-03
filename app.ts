import express from 'express'
import authRoutes from './routes/authRoutes'
import DbConfig from './config/dbConfig'
import { errHandler, notFound } from './middleware/errorHandler';


DbConfig.connectMongo()

const app = express();

app.use(express.json())
app.use('/api/user', authRoutes)


app.use(notFound)
app.use(errHandler)

app.listen(process.env.PORT || 4000, () => { 
    console.log('server running');
}) 