'use strict'

module.exports = async function (fastify, opts) {
  const conversation = [
    { message: "Hello", handle: "user" },
    { message: "Hi", handle: "bot" },
  ]

  fastify.get('/history', async function (request, reply) {
    return conversation
  })
}
