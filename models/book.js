const mongoose = require("mongoose");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  sanitizedTitle: {
    type: String,
    required: true
  },
  sanitizedDescription: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author"
  }
});

bookSchema.pre("validate", function(next) {
  if (this.title) {
    this.sanitizedTitle = dompurify.sanitize(this.title);
  }

  if (this.description) {
    this.sanitizedDescription = dompurify.sanitize(this.title);
  }

  next();
});

bookSchema.virtual("coverImagePath").get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("Book", bookSchema);
