/**
 * 
 * @param {app state} state 
 * @param {exact day} day 
 * @returns appointments for the day
 */
const getAppointmentsForDay = (state, day) => {
    const days = state.days;

    const dayIndex = days.findIndex((d) => d.name === day);

    if (dayIndex === -1) {
        return [];
    }

    const appointments = days[dayIndex].appointments;

    return appointments.map((id) => state.appointments[id]);
}
/**
 * 
 * @param {app state} state 
 * @param {interview} interview object
 * @returns the interview object
 */
const getInterview = (state, interview) => {
    if (!interview) {
        return null;
    }

    const interviewer = state.interviewers[interview.interviewer];

    return { ...interview, interviewer };
}
/**
 * 
 * @param {app state} state 
 * @param {exact day} day 
 * @returns interviewers for the day
 */
const getInterviewersForDay = (state, day) => {
    const days = state.days;

    const dayIndex = days.findIndex((d) => d.name === day);

    if (dayIndex === -1) {
        return [];
    }

    const interviewers = days[dayIndex].interviewers;

    return interviewers.map((id) => state.interviewers[id]);
}
export {
    getAppointmentsForDay,
    getInterview,
    getInterviewersForDay
}