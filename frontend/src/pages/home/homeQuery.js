export function buildListQuery(type, genre) {
    const params = new URLSearchParams();

    if (type) {
        params.set("type", type);
    }

    if (genre) {
        params.set("genre", genre);
    }

    const query = params.toString();
    return query ? `?${query}` : "";
}
