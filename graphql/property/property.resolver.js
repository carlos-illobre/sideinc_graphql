module.exports = {
  Query: {
    listProperties: async (parent, { city }, { simplyrets, logger }, info) => {
      const { data } = await simplyrets.getProperties(city)
      return data
    },

  },
}
