export const toISO = (dateStr?: string) => {
    if (!dateStr) return undefined;

    const d = new Date(dateStr);
    return d.toISOString();
};


export const parseProductIds = (text: string) => {

    const ids = text
        .split(/[\n,]+/g)
        .map((s) => s.trim())
        .filter(Boolean);


    const valid = ids.filter((id) => /^[0-9a-fA-F]{24}$/.test(id));
    return valid;
};