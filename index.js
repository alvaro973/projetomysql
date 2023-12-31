const express = require("express")
const { request, response } = require("express")
const exphbs = require("express")
const mysql = require ("mysql")

const app = express()


app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({ 
    extended: true
}))



app.use(express.json())

app.post("/edit/save", (request, response) =>{
    const {id, title, pagegty} = request.body

    const sql = `
        UPDATE books
        SET title = '${title}', pegeqty = '${pageqty}
        WHERE id =${id}
        `
    conn.query(sql, (error) =>{
        if (error) {
            return console.log(error)

        }
    })
})
app.get("/", (requisicao, resposta) =>{
    response.render("registrar")

})

app.post("/register/save", (request, response)=>{
   const {title, pagegty} = request.body

   const book ={
    title,
    pagegty
   }

   const query = `
    INSERT INTO books (title, pegeqty)
    VALUES ('${title}', '${pageqty}')

    `

    conn.query(query, (erro) =>{
        if (erro){
            console.log(erro)
            return
        }
        response.redirect("/")
    })
})

app.get("/edit/:id",(request, response) =>{
    const id = request.params.id

    const sql =`
        SELECT * FROM books
        WHERE id= ${id}`

        conn.query(sql, (error, data) => {
            if (error){
                console.log(error)
            }

        const book =data[0]

        response.render('edit', {book})
        })

})

app.get("/book/:id", (request, response) =>{
    const id = request.params.id

    const sql = ` 
    SELECT * FROM books
    WHERE id=${id}
    `
    conn.query(sql, (erro, data) => {
        if (erro) {
            return console.log(erro)

        }
        const book = data[0]

        response.render("book", {book})

    })

})

app.get("/registrar", (request, response)=>{
    const sql ='SELCT * FROM books'

    conn.query(sql,(erro, data) =>{
        if (erro){
            return console.log(erro)
        }
        const books = data

        console.log(books)

        response.render("home", {books})
    })

   
})


const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3307
})


conn.connect((error) =>{
    if (error){
        console.log(error)
        return
    }
    console.log("foi ao myslq")
    app.listen(3000, () =>{
        console.log("servidor rodando")
    })

})