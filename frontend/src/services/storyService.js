import api from "./api";



export const createStory = async (data) => {
    const response = await api.post("/stories", data);
    return response.data;
};

export const generateStory = async (storyId) => {
    const response = await api.post(`/stories/${storyId}/generate`);
    return response.data;
};

export const getStory = async (storyId) => {
    const response = await api.get(`/stories/${storyId}`);
    return response.data;
};

export const getStories = async () => {
    const response = await api.get("/stories/");
    return response.data;
};

export const continueStory = async (
    storyId,
    choiceId
) => {

    const response = await api.post(
        `/stories/${storyId}/continue`,
        {
            choice_id: choiceId,
        }
    );

    return response.data;
};
export const translateStory = async (
    text,
    language,
) => {

    const response = await api.post(
        "/translate",
        {
            text,
            language,
        }
    );

    return response.data;
};