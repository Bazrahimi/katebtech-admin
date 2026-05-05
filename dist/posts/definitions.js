export const POST_STATUS = {
    DRAFT: 1,
    PUBLISHED: 2,
    ARCHIVED: 3,
};
export const STATUS_CODES = [
    POST_STATUS.DRAFT,
    POST_STATUS.PUBLISHED,
    POST_STATUS.ARCHIVED,
];
const STATUS_CODE_SET = new Set(STATUS_CODES);
export const isStatusCode = (v) => typeof v === "number" && STATUS_CODE_SET.has(v);
export const POST_STATUS_LABEL = {
    [POST_STATUS.DRAFT]: "Draft",
    [POST_STATUS.PUBLISHED]: "Published",
    [POST_STATUS.ARCHIVED]: "Archived",
};
