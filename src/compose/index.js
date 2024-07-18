const compose = (...functions) => {
    return (first) => functions.reduceRight((acc, fn) => fn(acc), first);
}

export default compose;