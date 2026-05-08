import api from "../api/api";

export const BookingSlots = async (formData) => {
    const res = await api.post("/t/slotbooking", formData);
    return res.data;
};

export const SlotsInfo = async (turfId, date) => {
    const res = await api.get("/t/slotsinfo", {
        params: {
            turfId,
            date
        }
    });
    return res.data;
};

export const FetchUserBookings = async (userId) => {
  const res = await api.get(`/t/userbookings/${userId}`);
  return res.data;
};

