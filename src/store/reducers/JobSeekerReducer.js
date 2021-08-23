import { GET_JOB_SEEKER } from "../actions/JobSeekerActions";
import { jobSeeker } from "../initialValues/JobSeeker";

const initialState = {
    jobSeeker: jobSeeker
}

export default function JobSeekerReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_JOB_SEEKER:
            return payload
        default:
            return state;
    }

}