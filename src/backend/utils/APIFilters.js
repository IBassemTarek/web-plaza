class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.get("keyword")
      ? {
          name: {
            $regex: this.queryStr.get("keyword"),
            $options: "i",
          },
        }
      : {};

    if (Object.keys(keyword).length === 0) {
      // Return all products when no keyword is provided
      return this;
    }

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = new URLSearchParams(this.queryStr);

    const removeFields = ["keyword", "page"];
    removeFields.forEach((el) => queryCopy.delete(el));

    if (queryCopy.toString().length === 0) {
      // Return all products when no filter parameters are present
      return this;
    }

    let output = {};
    let prop = "";

    for (let key of queryCopy.keys()) {
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
        output[key] = queryCopy.get(key);
      } else {
        prop = key.split("[")[0];

        let operator = key.match(/\[(.*)\]/)[1];

        if (!output[prop]) {
          output[prop] = {};
        }

        output[prop][`$${operator}`] = queryCopy.get(key);
      }
    }

    this.query = this.query.find(output);
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.get("page")) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;
