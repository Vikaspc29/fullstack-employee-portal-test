const { employees } = require("../data/employees");
const { login } = require("../auth");
const { DEFAULT_PAGE_LIMIT } = require("../config");

// Small pure function for sorting to keep resolver logic simple
function sortFn(sortBy, sortOrder) {
  return (a, b) => {
    const dir = sortOrder === "DESC" ? -1 : 1;
    if (a[sortBy] < b[sortBy]) return -1 * dir;
    if (a[sortBy] > b[sortBy]) return 1 * dir;
    return 0;
  };
}

const resolvers = {
  Query: {
    employees: (_, args, ctx) => {
      if (!ctx.user) throw new Error("Not authenticated");

      const {
        page = 1,
        limit = DEFAULT_PAGE_LIMIT,
        sortBy = "name",
        sortOrder = "ASC",
        filter
      } = args;

      let result = [...employees];

      if (filter && filter.name) {
        const q = filter.name.toLowerCase();
        result = result.filter((e) => e.name.toLowerCase().includes(q));
      }
      if (filter && filter.className) {
        result = result.filter((e) => e.className === filter.className);
      }
      if (filter && typeof filter.minAttendance === "number") {
        result = result.filter((e) => e.attendance >= filter.minAttendance);
      }

      result.sort(sortFn(sortBy, sortOrder));

      const safeLimit = Math.max(1, Math.min(limit, 50));
      const totalCount = result.length;
      const totalPages = Math.ceil(totalCount / safeLimit);
      const currentPage = Math.min(Math.max(page, 1), totalPages || 1);
      const start = (currentPage - 1) * safeLimit;
      const items = result.slice(start, start + safeLimit);

      return { items, totalCount, totalPages, currentPage };
    },

    employee: (_, { id }, ctx) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return employees.find((e) => e.id === id) || null;
    }
  },

  Mutation: {
    login: (_, { email, password }) => {
      return login(email, password);
    },

    addEmployee: (_, { input }, ctx) => {
      if (!ctx.user || ctx.user.role !== "ADMIN") {
        throw new Error("Not authorized");
      }
      const id = String(employees.length + 1);
      const employee = { id, ...input };
      employees.push(employee);
      return employee;
    },

    updateEmployee: (_, { id, input }, ctx) => {
      if (!ctx.user) throw new Error("Not authenticated");

      const index = employees.findIndex((e) => e.id === id);
      if (index === -1) throw new Error("Not found");

      if (ctx.user.role !== "ADMIN" && ctx.user.userId !== id) {
        throw new Error("Not authorized");
      }

      employees[index] = { ...employees[index], ...input };
      return employees[index];
    },

    deleteEmployee: (_, { id }, ctx) => {
      if (!ctx.user || ctx.user.role !== "ADMIN") {
        throw new Error("Not authorized");
      }
      const index = employees.findIndex((e) => e.id === id);
      if (index === -1) return false;
      employees.splice(index, 1);
      return true;
    }
  }
};

module.exports = { resolvers };
