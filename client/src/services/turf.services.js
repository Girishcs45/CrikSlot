import api from "../api/api";

export const FetchTurf = async() => {
    const res = await api.get("/turf/getturf" );
    return res.data;
};

export const FetchOneTurf = async(id) => {
    const res = await api.get("/turf/getoneturf",{params : {id}} );
    return res.data;
};

export const AddTurf = async(formData) => {
    const res = await api.post("/turf/addturf", {formData});

    return res.data;
};

export const OwnerTurfs = async(id) => {
    const res = await api.get("/turf/ownerturfs",{params : {id}} );
    return res.data;
};