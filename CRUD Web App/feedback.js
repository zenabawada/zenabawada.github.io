class FeedbackService {
  database = null;
  io = null;

  constructor(database, io) {
    this.database = database;
    this.io = io;
  }

  setup() {
    this.io.on("connection", (socket) => {
      socket.on("checkEmail", async (email) => {
        let foundUser = await this.database.collections.users.findOne(email);
        if (foundUser) {
          this.io.emit("checkEmail", true);
        } else {
          this.io.emit("checkEmail", false);
        }
      });

      socket.on("checkWords", async (input) => {
        let bannedWords = [
          "bum",
          "dogs",
          "Kardashain",
          "poo",
          "rude",
          "Seneca",
        ];

        if (bannedWords.some((word) => input.input.includes(word))) {
          this.io.emit("checkWords", true);
        } else {
          this.io.emit("checkWords", false);
        }
      });
    });
  }
}

module.exports = FeedbackService;
