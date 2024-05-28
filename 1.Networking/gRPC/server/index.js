const PROTO_PATH = "./customers.proto"

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

const customersProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server();

const customers = [
    {
        id: 'sgsrhgbsgrb',
        name: 'Ganesh',
        age: 22,
        address: 'Bangalore'
    },
    {
        id: 'asgargzdvzfd',
        name: 'Siva',
        age: 22,
        address: 'Chennai'
    },
    {
        id: 'gggeadfadf',
        name: 'Araving',
        age: 22,
        address: 'Hyderabad'
    },

]

server.addService(customersProto.CustomerService.service, {
    // call -> JS -> this
    // call -> python -> self
    getAll: (call, callback) => {
        callback(null, { customers })
    },
    get: (call, callback) => {
        let customer = customers.find(customer => customer.id === call.request.id)

        if (customer) {
            callback(null, customer)
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    },
    insert: (call, callback) => {
        let customer = call.request

        customer.id = Math.random();
        customers.push(customers);
        callback(null, customer)

    },
    update: (call, callback) => {
        let existingCustomer = customers.find(customer => customer.id === call.request.id)

        if (existingCustomer) {
            existingCustomer.name = call.request.name
            existingCustomer.age = call.request.age
            existingCustomer.address = call.request.address
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }

    },
    remove: (call, callback) => {
        let existingCustomerIndex = customers.findIndex(customer => customer.id === call.request.id)

        if (existingCustomerIndex !== -1) {
            customers.splice(existingCustomerIndex, 1)
            callback(null, {})
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    },
})

server.bindAsync('127.0.0.1:30043', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(`Error starting gRPC server: ${err}`)
    } else {
        server.start();
        console.log(`gRPC server is listening on ${port}`)
    }
})