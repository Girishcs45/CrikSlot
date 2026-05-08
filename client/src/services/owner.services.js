import api from "../api/api";

export const FetchOwner = async(id) => {
    const res = await api.get("/owner/getowner",{params : {id}} );
    return res.data;
};

export const GetAllBookings = async(id) => {
    const res = await api.get("/owner/getbookings",{params : {id}} );
    return res.data;
};

export const GetOwnerUsers = async (id) => {
  const res = await api.get("/owner/getusers", { params: { id } });
  return res.data;
};
