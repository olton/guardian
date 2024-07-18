const pipe = (...functions) => {
    return (first) => functions.reduce((acc, fn) => fn(acc), first);
}

export default pipe;