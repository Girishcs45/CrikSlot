import Turf from "../models/turfs.js";
import Owner from "../models/owner.js";

export const FetchTurf = async (req, res) => {
  try {
    const turfs = await Turf.find();
    res.status(200).json(turfs);
  } catch (error) {
    console.error("Error fetching turfs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch turfs" });
  }
};

export const FetchOneTurf = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(404).json({ success: false, message: "Id not comming" })
  }

  const turf = await Turf.findOne({ _id: id })

  if (!turf) {
    return res.status(404).json({ success: false, message: "Turf not found" })
  }

  return res.status(200).json({ success: true, message: "Turf found", turf })
};

export const RegTurf = async (req, res) => {
  try {
    const { formData } = req.body;
    const { ownerId, name, location } = formData;

    if (!ownerId || !name?.trim() || !location?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Owner ID, turf name, and location are required'
      });
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: 'Owner account not found'
      });
    }

    const turfData = {
      ownerId,
      name: name.trim(),
      images: Array.isArray(formData.images) ? formData.images : [],
      rates: {
        standard: formData.rates?.standard || 0,
        peakHour: formData.rates?.peakHour || 0,
        weekend: formData.rates?.weekend || 0
      },
      location: location.trim(),
      area: formData.area?.trim() || '',
      contact: {
        primary: formData.contact?.primary || '',
        alternate: formData.contact?.alternate || ''
      },
      email: formData.email?.trim() || '',
      facilities: formData.facilities?.filter(f => f?.trim()) || [],
      status: 'active',
      timeSlots: [
        "6:00 AM - 7:00 AM",
      "7:00 AM - 8:00 AM", 
      "8:00 AM - 9:00 AM",
      "9:00 AM - 10:00 AM", 
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "12:00 PM - 1:00 PM", 
      "1:00 PM - 2:00 PM", 
      "2:00 PM - 3:00 PM", 
      "3:00 PM - 4:00 PM", 
      "4:00 PM - 5:00 PM", 
      "5:00 PM - 6:00 PM", 
      "6:00 PM - 7:00 PM", 
      "7:00 PM - 8:00 PM", 
      "8:00 PM - 9:00 PM", 
      "9:00 PM - 10:00 PM", 
      "10:00 PM - 11:00 PM",
      "11:00 PM - 12:00 AM"]
    };

    const newTurf = new Turf(turfData);
    const savedTurf = await newTurf.save();

    await Owner.findByIdAndUpdate(
      ownerId,
      {
        $push: { ownedTurfs: savedTurf._id }
      }
    );

    console.log(`✅ Turf "${savedTurf.name}" registered successfully for owner ${ownerId}`);

    return res.status(201).json({
      success: true,
      message: 'Turf registered successfully',
      turf: {
        id: savedTurf._id,
        name: savedTurf.name,
        status: savedTurf.status
      }
    });

  } catch (error) {
    console.error('❌ Error in turf registration:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A turf with this name already exists'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const FetchOwnerTurfs = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(404).json({ success: false, message: "Unauthorized access" })
  }

  const owner = await Owner.findById({ _id: id }).populate("ownedTurfs")

  return res.status(200).json(owner)

};