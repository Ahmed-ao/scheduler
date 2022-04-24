import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
    SET_DAY,
    SET_APPLICATION_DATA,
    SET_INTERVIEW,
} from "reducers/application";
/**
 * 
 * @returns state, setDay, bookInterview, cancelInterview 
 */
const useApplicationData = () => {
    const [state, dispatch] = useReducer(reducer, {
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {},
        edit: {},
    });

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

        ws.onopen = (event) => { };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Message Received:", data);

            if (data.type === "SET_INTERVIEW") {
                dispatch({
                    type: SET_INTERVIEW,
                    value: {
                        id: data.id,
                        interview: data.interview,
                    },
                });
            }
        };

        Promise.all([
            axios.get("/api/days"),
            axios.get("/api/appointments"),
            axios.get("/api/interviewers"),
        ]).then((all) => {
            dispatch({
                type: SET_APPLICATION_DATA,
                value: {
                    days: all[0].data,
                    appointments: all[1].data,
                    interviewers: all[2].data,
                },
            });
        });

        return () => ws.close();
    }, []);

    const setDay = (day) => dispatch({ type: SET_DAY, value: day });
    /**
     * 
     * @param {appointment} id  
     * @param {interview} interview object
     * @returns response
     */
    const bookInterview = async (id, interview) => {
        const res = await axios.put(`/api/appointments/${id}`, { interview });

        dispatch({
            type: SET_INTERVIEW,
            value: {
                id,
                interview,
            },
        });

        return res;
    }
    /**
     * 
     * @param {appointment} id 
     * @returns response
     */
    const cancelInterview = async (id) => {
        const res = await axios.delete(`/api/appointments/${id}`);
        dispatch({
            type: SET_INTERVIEW,
            value: {
                id,
                interview: null,
            },
        });

        return res;
    }

    return { state, setDay, bookInterview, cancelInterview };
}
export default useApplicationData;