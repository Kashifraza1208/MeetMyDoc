import React, { useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";

import { toast } from "react-toastify";
import { FaUserMd, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import { MdEdit, MdSave } from "react-icons/md";
import axiosInstance from "../../apis/axiosInstanceDoctor";

const DoctorProfile = () => {
  const { profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axiosInstance.post(
        `/api/doctor/update-profile`,
        updateData,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        getProfileData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  console.log(profileData, "hello");

  if (!profileData) return null;

  return (
    <div className="w-full md:ml-52 md:left-52 top-14 md:w-[calc(100%-208px)]">
      <div className="md:px-14 p-6">
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-8">
          {/* Left Side - Profile Image */}
          <div className="flex flex-col items-center md:items-start">
            <img
              className="w-40 h-40 rounded-full object-cover border-4 border-[var(--primary)] shadow-lg"
              src={profileData.image}
              alt={profileData.name}
            />
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${
                  profileData.available ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span className="text-sm text-gray-600">
                {profileData.available ? "Available" : "Not Available"}
              </span>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex-1 space-y-4">
            {/* Doctor Info */}
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
                <FaUserMd className="text-[var(--primary)]" />
                {profileData.name}
              </h2>
              <p className="text-gray-600 mt-1">
                {profileData.degree} - {profileData.speciality}
              </p>
              <span className="inline-block mt-2 px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-sm rounded-full">
                {profileData.experience} years experience
              </span>
            </div>

            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700">About</h3>
              <p className="text-gray-600 text-sm mt-1">
                {profileData.about || "No information provided."}
              </p>
            </div>

            {/* Appointment Fee */}
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <FaRupeeSign className="text-[var(--primary)]" />
              Appointment Fee:
              {isEdit ? (
                <input
                  type="number"
                  className="ml-2 border rounded px-2 py-1 text-sm"
                  value={profileData.fees || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                />
              ) : (
                <span className="ml-1 font-semibold">₹{profileData.fees}</span>
              )}
            </div>

            {/* Address */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaMapMarkerAlt className="text-[var(--primary)]" />
                Address
              </h3>
              {isEdit ? (
                <div className="space-y-2 mt-1">
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={profileData?.address?.line1 || ""}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={profileData?.address?.line2 || ""}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <p className="text-gray-600 text-sm mt-1">
                  {profileData?.address?.line1}, {profileData?.address?.line2}
                </p>
              )}
            </div>

            <div className="flex gap-1 pt-2">
              {" "}
              <input
                type="checkbox"
                id="available"
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
              />{" "}
              <label htmlFor="available"> Available</label>{" "}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              {isEdit ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEdit(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-[var(--primary)]/90 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg shadow hover:bg-[var(--primary)]/90 transition"
                  >
                    <MdSave /> Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-lg shadow-sm hover:bg-[var(--primary)] hover:text-white transition"
                >
                  <MdEdit /> Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
