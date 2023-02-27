import client from "./client";


export const createPlan = (participant_id) =>
    client.post(`/plans`, {participant_id});

export const fetchPlan = ({participant_id, week}) =>
    client.get(`/plans/${participant_id}`, {params: {week}});

export const fetchDetailPlan = (plan_id) =>
    client.get(`/plans/${plan_id}/details`);

export const createDetailPlan = ({plan_id, content}) =>
    client.post(`/plans/${plan_id}/details`,{content});

export const updateDetailPlan = ({plan_id, detail_plan_id, content}) =>
    client.patch(`/plans/${plan_id}/details/${detail_plan_id}`,{content});

export const deleteDetailPlan = ({plan_id, detail_plan_id}) =>
    client.delete(`/plans/${plan_id}/details/${detail_plan_id}`);


export const fetchPlanDislike = (plan_id) =>
    client.get(`/plans/${plan_id}/dislike`);

export const planDislike = (plan_id) =>
    client.post(`/plans/${plan_id}/dislike`, {});
export const planDislikeCancel = (plan_id) =>
    client.delete(`/plans/${plan_id}/dislike`, {});

export const deletePlanDislike = (plan_id) =>
    client.delete(`/plans/${plan_id}/dislike`);
