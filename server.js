const express = require('express')
const http = require('http')

var { graphqlHTTP } = require('express-graphql');
var { buildSchema, GraphQLBoolean, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');

const { sql } = require('./Common/SQL')

const {  } = require('./Databases/Firebase/FirebseConfig')


//


const app = express()
const port = 4000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//

let BookType = new GraphQLObjectType({
    name : 'Book',
    fields: () => ({
        id : { type : GraphQLString },
        name : { type : GraphQLString },
        pageNum : { type : GraphQLInt },
        fullName : { type : GraphQLString }
    })
})

let AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields: () => ({
        id : { type : GraphQLString },
        name : { type : GraphQLString },
        books : {
            type : new GraphQLList(BookType),
            resolve : async (parent , args) => {

                console.log('parent' ,parent)

               let result = await sql.query('select fullName from sys_staff')
               console.dir(result.recordsets)
               return result.recordset
                
                // .catch(err => {
                //     console.log("🚀 ~ file: server.js ~ line 41 ~ sql.query ~ err", err)
                // })

                return [
                    {id : '123' , name : 'qweqwe', pageNum : 20, fullName : 'qwe'},
                    {id : '123' , name : 'qweqwe', pageNum : 20, fullName : 'qwe'},
                    {id : '123' , name : 'qweqwe', pageNum : 20, fullName : 'qwe'},
                ]
            }
        }
    })
})




const ROOTQUERY = new GraphQLObjectType({
    name : 'root',
    fields : {

        book : {
            type: BookType ,
            args: { id : { type : GraphQLString } },
            resolve(parent , args) {
                const { id } = args
                console.log(id)
                console.log("🚀 ~ file: server.js ~ line 44 ~ resolve ~ parent", parent)
            }
        },

        author : {
            type: AuthorType,
            args: { id : { type : GraphQLID } },
            resolve(parent , args) {
                return { name : 'Kha' }
            }
        }


    }
})


var schema = new GraphQLSchema({
    query : ROOTQUERY,
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    pretty: true
}));








app.get('/', (req, res) => {
    res.send('Hello World!')
})






app.listen(port, () => console.log('listen 4000'))

const server = http.Server(app)
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: '*', methods: ['get', 'post'], allowedHeaders: ['*']
    },
    // cookie : {
    //     name : 'wsCookie',
    //     httpOnly : true ,
    //     sameSite : 'strict',
    //     maxAge : 86400 * 2
    // }
})

io.on('connection', (socket) => {

    socket.on('event-1', data => {
        console.log(data)
        socket.emit('qqqqqqqq')
    })

    socket.on('disconnect', data => {
        console.log('client disconnected : ' + socket.id)
    })

})

server.listen(5000, () => console.log('listen 5000'))