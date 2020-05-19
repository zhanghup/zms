class Graphql {
  constructor(data) {
    this.input = {};
    this.query = {};

    for (let o of data.types) {
      // query
      if (o.name === data.queryType.name) {
        this.queryType = o;
        continue;
      }

      // mutation
      if (o.name === data.mutationType.name) {
        this.mutationType = o;
        continue;
      }

      // subscription
      if (o.name === data.subscriptionType.name) {
        this.subscriptionType = o;
        continue;
      }

      if (o.kind === "INPUT_OBJECT") {
        this.input[o.name] = o;
      } else if (o.kind === "OBJECT") {
        this.query[o.name] = o;
      }
    }
  }

  columns(name) {}

  info(name) {
    let n = this.input[name];
    if (!n) return;

    let info = {};
    let fields = n.inputFields;
    for (let o of fields) {
      info[o.name] = { ...this.field(o.type) };
    }

    return info;
  }

  field(o) {
    function fk(f) {
      switch (f.kind) {
        case "NON_NULL":
          return "*" + fk(f.ofType);
        case "SCALAR":
          return f.name;
        case "LIST":
          return "[]" + fk(f.ofType);
      }
    }
    return { kind: fk(o), default: o.defaultValue };
  }
}
