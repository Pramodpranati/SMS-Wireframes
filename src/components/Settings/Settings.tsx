import { BookOpen, Calendar, Clock, Plus, Save, School, UserCog } from 'lucide-react';
import React, { useState } from 'react';
import { useSchool } from '../../contexts/SchoolContext';
import { SchoolSettings } from '../../types';
import RolePermissionManager from '../RolePermissionManager';

interface ContactInfo {
  email: string;
  phoneNumber: string;
  alternatePhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  district: string;
  nationality: string
}
interface AdmissionFormData {
  contactInfo: ContactInfo;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const Settings: React.FC = () => {
  const { settings, updateSettings, subjects, addSubject, deleteSubject, grades, addGrade, deleteGrade } = useSchool();
  const [formData, setFormData] = useState<SchoolSettings>(settings);
  const [newSubject, setNewSubject] = useState({ name: '', code: '' });
  const [newGrade, setNewGrade] = useState({ name: '' });

  const handleSave = () => {
    updateSettings(formData);
    alert('Settings saved successfully!');
  };

  const handleInputChange = (section: keyof AdmissionFormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  const handleWorkingDayChange = (dayIndex: number, checked: boolean) => {
    const newWorkingDays = [...formData.workingDays];
    newWorkingDays[dayIndex] = checked;
    setFormData({ ...formData, workingDays: newWorkingDays });
  };

  const handleAddSubject = () => {
    if (newSubject.name.trim() && newSubject.code.trim()) {
      addSubject(newSubject);
      setNewSubject({ name: '', code: '' });
    }
  };

  const handleAddGrade = () => {
    if (newGrade.name.trim()) {
      addGrade({ name: newGrade.name, sections: [] });
      setNewGrade({ name: '' });
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">School Settings</h1>
          <p className="text-gray-600">Configure school information and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Details */}
        <div className="bg-white col-span-2 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <School className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">School Details</h2>
          </div>

          <div className="space-y-4">

            <div className='flex flex-row gap-4 items-center'>
              <img src="/school.jpg" className='rounded-full h-20 w-20' alt="Avatar"></img>
              <input type="file" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div> */}
            <div className='grid grid-cols-2 gap-3'>
              <div className='flex-1'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter House No/Building Name"
                />
              </div>

              <div className='flex-1'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone no</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter House No/Building Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className='flex-1'>
                <label className="block text-sm font-medium text-gray-700 mb-2">House No/Building Name *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter House No/Building Name"
                />
              </div>
              <div className='flex-1'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter Street"
                />
              </div>
              <div className='flex-1'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Locality *</label>
                <input
                  type="text"

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter locality"
                />
              </div>

              <div className='flex-1'>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  required

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter city"
                />
              </div>
              <div className='flex-1'>
                <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                <input
                  type="text"
                  required

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter city"
                />
              </div>
              <div className='flex-1'>
                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  required

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter city"
                />
              </div>
              <div className='flex-1'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                <input
                  type="text"
                  required

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter city"
                />
              </div>

              <div className='flex-1'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zipcode *</label>
                <input
                  type="text"
                  required

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter city"
                />
              </div>
            </div>
          </div>
        </div>


        {/* Timing Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Timing Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Period Duration (minutes)</label>
              <input
                type="number"
                value={formData.periodDuration}
                onChange={(e) => setFormData({ ...formData, periodDuration: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interval Duration (minutes)</label>
              <input
                type="number"
                value={formData.intervalDuration}
                onChange={(e) => setFormData({ ...formData, intervalDuration: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lunch Break Start</label>
                <input
                  type="time"
                  value={formData.lunchBreakStart}
                  onChange={(e) => setFormData({ ...formData, lunchBreakStart: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lunch Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.lunchBreakDuration}
                  onChange={(e) => setFormData({ ...formData, lunchBreakDuration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Attendance Interval</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="male">Once in a day</option>
                  <option value="female">Twice in a day</option>
                  <option value="other">Every period</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Working Days */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Working Days</h2>
          </div>

          <div className="space-y-3">
            {DAYS.map((day, index) => (
              <label key={day} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.workingDays[index]}
                  onChange={(e) => handleWorkingDayChange(index, e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
          </div>

          <div className="space-y-6">
            {/* Add Subject */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Add Subject</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Subject name"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Code"
                  value={newSubject.code}
                  onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value.toUpperCase() })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddSubject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Add Grade */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Add Grade</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Grade name"
                  value={newGrade.name}
                  onChange={(e) => setNewGrade({ name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddGrade}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <RolePermissionManager />

        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Extra Curricular Manager</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Cricket</li>
              <li>Chess</li>
              <li>Athlete</li>
              <li>Football</li>
            </ul>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Qualification</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>

            <ul className="list-disc list-inside text-sm text-gray-700">
              <li className="ba_economics">BA - Economics</li>
              <li className="bcom_accounting">B.Com - Accounting & Finance</li>
              <li className="bsc_cs">B.Sc - Computer Science</li>
            </ul>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Community</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>

            <ul className="list-disc list-inside text-sm text-gray-700">
              <li className="ba_economics">General</li>
              <li className="bcom_accounting">SC</li>
              <li className="bsc_cs">OBC</li>
            </ul>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Caste</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>

            <ul className="list-disc list-inside text-sm text-gray-700">
              <li className="ba_economics">Caste 1</li>
              <li className="bcom_accounting">Caste 2</li>
              <li className="bsc_cs">Caste 3</li>
            </ul>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Grades</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Nursery</li>
              <li>LKG</li>
              <li>UKG</li>
              <li>Grade I</li>
              <li>Grade II</li>
              <li>Grade III</li>


            </ul>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Rooms</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Room 101</li>
              <li>Room 102</li>
              <li>Room 103</li>


            </ul>
          </div>
        </div>
        {/* <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Sections</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Section A</li>
              <li>Section B</li>
              <li>Section C</li>


            </ul>
          </div>
        </div> */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Subjects</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>English</li>
              <li>Mathematics</li>
              <li>Hindi</li>
              <li>Social Science</li>
              <li>Science</li>


            </ul>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Blood Group</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>A+</li>
              <li>A-</li>
              <li>B+</li>
              <li>B-</li>
              <li>O+</li>
              <li>O-</li>
              <li>AB+</li>
              <li>AB-</li>

            </ul>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Leave Type</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Sick / Medical Leave</li>
              <li>Emergency</li>
              <li>Personal Reasons</li>
              <li>Religious Holiday / Observance</li>
              <li>Marriage / Wedding Leave</li>
              <li>Maternity / Paternity Leave</li>

            </ul>
          </div>
        </div>
     
         <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Country</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Afghanistan</li>
              <li>Albania</li>
              <li>Algeria</li>
              <li>India</li>
              <li>China</li>
            </ul>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-3 mb-6">
              <UserCog className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">State</h2>
            </div>
            <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Assam</li>
              <li>Bihar</li>
              <li>Chhattisgarh</li>
              <li>Goa</li>
              <li>Tamil Nadu</li>
              <li>Kerala</li>
            </ul>
          </div>
        </div>
</div>

      </div>
   
  );
};