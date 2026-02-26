export const filterListsByQuery = (lists = [], query = "") => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return lists;
    }

    return lists.filter((list) =>
        (list?.title || "").toLowerCase().includes(normalizedQuery)
    );
};
