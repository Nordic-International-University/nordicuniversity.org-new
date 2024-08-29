export const initialState = {
  mainFilter: {
    title: "",
    volume: [],
    subCategory: [],
    Category: [],
    author: [],
  },

  extraFilter: {
    existDoi: false,
  },

  dateFilter: {
    start: "",
    end: "",
  },

  sort: {
    createdAt: "ASC",
    viewsCount: "ASC",
  },
};
