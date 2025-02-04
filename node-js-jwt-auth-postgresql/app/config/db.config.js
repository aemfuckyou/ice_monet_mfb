module.exports = {
  HOST: "10.220.100.128",
  USER: "postgres",
  PASSWORD: "postgres",
  DB: "test_cust",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
