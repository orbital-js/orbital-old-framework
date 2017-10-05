export function check(fn: Function, done: Function) {
    try {
        fn();
        done();
    } catch (e) {
        done(e);
    }
}
