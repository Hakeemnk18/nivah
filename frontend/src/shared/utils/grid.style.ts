export const getGridClass = (count: number) => {
    let className = "grid gap-6 ";


    className += count === 1 ? "grid-cols-1 " : "grid-cols-2 ";

    if (count >= 3) className += "sm:grid-cols-3 ";

    if (count >= 4) {
        className += "lg:grid-cols-4";
    } else if (count === 3) {
        className += "lg:grid-cols-3";
    } else if (count === 2) {
        className += "lg:grid-cols-2";
    } else {
        className += "lg:grid-cols-1";
    }

    return className;
};