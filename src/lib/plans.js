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
export const doPlanDislike = (plan_id) =>
    client.post(`/plans/${plan_id}/dislike`, {});
export const cancelPlanDislike = (plan_id) =>
    client.delete(`/plans/${plan_id}/dislike`, {});
export const completeDetailPlan = ({plan_id, detail_plan_id, approveComment}) =>
    client.patch(`/plans/${plan_id}/details/${detail_plan_id}/completed`, {approve_comment: approveComment});
export const undoCompleteDetailPlan = ({plan_id, detail_plan_id}) =>
    client.patch(`/plans/${plan_id}/details/${detail_plan_id}/completed-undo`);
export const doDetailPlanDislike = (detail_plan_id) =>
    client.post(`/details/${detail_plan_id}/dislike`, {});
export const cancelDetailPlanDislike = (detail_plan_id) =>
    client.delete(`/details/${detail_plan_id}/dislike`);
