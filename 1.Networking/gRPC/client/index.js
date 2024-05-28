const client = require('./client')

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server running at port %d', PORT)
})


// TODO: Expose REST calls
// These REST calls internally call gRPC server functions using gRPC client

// CUSTOMERS

// getAllCustomers
// getParticularCustomer
// insertCustomer
// updateCustomer
// deleteCustomer

app.get('/', (req, res) => {
    client.getAll(null, (err, data) => {
        if (!err) {
            res.send(data.customers)
        } else {
            res.send(err)
        }
    })
})

app.post('/create', (req, res) => {
    const { body: { name, age, address } } = req
    let newCustomer = {
        name,
        age,
        address
    }

    client.insert(newCustomer, (err, data) => {
        if (err) throw err

        console.log("Customer created Successfully", data)
        res.send({ message: "Customer created Successfully" })
    })

})

app.post('/update', (req, res) => {
    const { body: { id, name, age, address } } = req
    let updatedCustomer = {
        id,
        name,
        age,
        address
    }

    client.update(updatedCustomer, (err, data) => {
        if (err) throw err

        console.log("Customer updated Successfully", data)
        res.send({ message: "Customer updated Successfully" })
    })


})

app.post('/remove', (req, res) => {
    client.remove({ id: req.body.customer_id }, (err, data) => {
        if (err) throw err

        console.log("Customer removed Successfully")
        res.send({ message: "Customer removed Successfully" })
    })
})



