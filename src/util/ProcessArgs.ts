export function processArgs(args:any) {
    const where: Record<string, string> = {};
    const orderBy: Record<string, string> = {};
  console.log(Object.keys(args),"argsargsargsargs")
    for (const key of Object.keys(args)) {
      if (key.startsWith("where[")) {
        
        const field = key.substring(6, key.length - 1);
        console.log(field,"fieldfieldfield")
        where[field] = args[key] as string;
      } else if (key.startsWith("orderBy[")) {
        const field = key.substring(8, key.length - 1);
        orderBy[field] = args[key] as string;
      }
    }

  console.log(where,"eeeee")
  console.log(orderBy,"eeeee")
    const structuredData = {
      where: {where:where},
      orderBy: {orderBy:orderBy},
      skip: args.skip,
      take: args.take,
    };
  console.log(JSON.stringify(structuredData),"structuredData")
    return structuredData
  }
  