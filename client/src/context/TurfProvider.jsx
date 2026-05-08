import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { OwnerTurfs } from "../services/turf.services";
import turfContext from "./TurfContext";

const TurfProvider = ({ children }) => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [error, setError] = useState(null);

  // Fetch turfs for the logged-in owner
  const getTurfs = useCallback(async (ownerId) => {
    if (!ownerId) {
      toast.error("Owner ID not found. Please login again.");
      setError("Unauthorized access");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await OwnerTurfs(ownerId);
      const turfsData = res?.ownedTurfs || [];
      setTurfs(turfsData);
    } catch (err) {
      console.error("Error fetching turfs:", err);
      const errorMsg = err.response?.data?.message || "Failed to load turfs";
      toast.error(errorMsg);
      setError(errorMsg);
      setTurfs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh turfs - useful after adding/updating a turf
  const refreshTurfs = useCallback(async () => {
    const ownerId = JSON.parse(localStorage.getItem("Owner"));
    if (ownerId) {
      return await getTurfs(ownerId);
    }
  }, [getTurfs]);

  // Add a new turf to the list
  const addTurf = useCallback((newTurf) => {
    setTurfs(prev => [newTurf, ...prev]);
    toast.success("Turf added successfully!");
  }, []);

  // Update an existing turf
  const updateTurf = useCallback((turfId, updatedData) => {
    setTurfs(prev => prev.map(turf =>
      turf._id === turfId ? { ...turf, ...updatedData } : turf
    ));
    toast.success("Turf updated successfully!");
  }, []);

  // Delete a turf
  const deleteTurf = useCallback((turfId) => {
    setTurfs(prev => prev.filter(turf => turf._id !== turfId));
    toast.success("Turf deleted successfully!");
  }, []);

  // Get turf by ID
  const getTurfById = useCallback((turfId) => {
    return turfs.find(turf => turf._id === turfId) || null;
  }, [turfs]);

  // Select a specific turf (for detailed view)
  const selectTurf = useCallback((turfId) => {
    const turf = getTurfById(turfId);
    setSelectedTurf(turf);
    return turf;
  }, [getTurfById]);

  // Clear selected turf
  const clearSelectedTurf = useCallback(() => {
    setSelectedTurf(null);
  }, []);

  // Calculate turf statistics
  const turfStats = useCallback(() => {
    return {
      totalTurfs: turfs.length,
      activeTurfs: turfs.filter(t => t.status === 'active').length,
      pendingTurfs: turfs.filter(t => t.status === 'pending').length,
      rejectedTurfs: turfs.filter(t => t.status === 'rejected').length,
      totalBookings: turfs.reduce((sum, t) => sum + (t.totalBookings || 0), 0),
      // Calculate revenue if you have booking data
      totalRevenue: turfs.reduce((sum, t) => sum + (t.totalRevenue || 0), 0)
    };
  }, [turfs]);

  // Filter turfs by status
  const getTurfsByStatus = useCallback((status) => {
    return turfs.filter(turf => turf.status === status);
  }, [turfs]);

  // Initialize turfs on mount
  useEffect(() => {
    const ownerId = JSON.parse(localStorage.getItem("Owner"));
    if (ownerId) {
      getTurfs(ownerId);
    } else {
      setLoading(false);
      setError("No owner found in localStorage");
    }
  }, [getTurfs]);

  // Context value
  const contextValue = {
    // State
    turfs,
    loading,
    selectedTurf,
    error,
    
    // Actions
    getTurfs,
    refreshTurfs,
    addTurf,
    updateTurf,
    deleteTurf,
    getTurfById,
    selectTurf,
    clearSelectedTurf,
    
    // Utilities
    turfStats,
    getTurfsByStatus,
    
    // Derived state
    hasTurfs: turfs.length > 0,
    activeTurfsCount: turfs.filter(t => t.status === 'active').length,
    pendingTurfsCount: turfs.filter(t => t.status === 'pending').length,
  };

  return (
    <turfContext.Provider value={contextValue}>
      {children}
    </turfContext.Provider>
  );
};

export default TurfProvider;