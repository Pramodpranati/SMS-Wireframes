import React, { useState } from 'react';
import { Upload, FileText, User, Calendar, MapPin, Phone, Mail, GraduationCap, CheckCircle, Clock, XCircle } from 'lucide-react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  category: string;
  motherTongue: string;
  aadharNumber: string;
}

interface ContactInfo {
  email: string;
  phoneNumber: string;
  alternatePhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  district: string;
}

interface ParentInfo {
  fatherName: string;
  fatherOccupation: string;
  fatherIncome: string;
  fatherPhone: string;
  motherName: string;
  motherOccupation: string;
  motherIncome: string;
  motherPhone: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
}

interface CommunityInfo {
  certificateNumber: string;
  issuingAuthority: string;
  issueDate: string;
  validUpto: string;
  communityCategory: string;
  subcaste: string;
  certificateFile: File | null;
}

interface BirthCertificateInfo {
  certificateNumber: string;
  registrationNumber: string;
  issueDate: string;
  placeOfBirth: string;
  hospitalName: string;
  registrarOffice: string;
  certificateFile: File | null;
}

interface AcademicInfo {
  previousSchool: string;
  previousClass: string;
  boardOfStudy: string;
  mediumOfInstruction: string;
  subjects: string[];
  tcNumber: string;
  tcDate: string;
  admissionClass: string;
  admissionYear: string;
}

interface AdmissionFormData {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  parentInfo: ParentInfo;
  communityInfo: CommunityInfo;
  birthCertificateInfo: BirthCertificateInfo;
  academicInfo: AcademicInfo;
}

export default function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AdmissionFormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      nationality: 'Indian',
      religion: '',
      category: '',
      motherTongue: '',
      aadharNumber: ''
    },
    contactInfo: {
      email: '',
      phoneNumber: '',
      alternatePhone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      district: ''
    },
    parentInfo: {
      fatherName: '',
      fatherOccupation: '',
      fatherIncome: '',
      fatherPhone: '',
      motherName: '',
      motherOccupation: '',
      motherIncome: '',
      motherPhone: '',
      guardianName: '',
      guardianRelation: '',
      guardianPhone: ''
    },
    communityInfo: {
      certificateNumber: '',
      issuingAuthority: '',
      issueDate: '',
      validUpto: '',
      communityCategory: '',
      subcaste: '',
      certificateFile: null
    },
    birthCertificateInfo: {
      certificateNumber: '',
      registrationNumber: '',
      issueDate: '',
      placeOfBirth: '',
      hospitalName: '',
      registrarOffice: '',
      certificateFile: null
    },
    academicInfo: {
      previousSchool: '',
      previousClass: '',
      boardOfStudy: '',
      mediumOfInstruction: '',
      subjects: [],
      tcNumber: '',
      tcDate: '',
      admissionClass: '',
      admissionYear: ''
    }
  });

  const steps = [
    { number: 1, title: 'Personal Information', icon: User },
    { number: 2, title: 'Contact Details', icon: MapPin },
    { number: 3, title: 'Parent/Guardian Info', icon: User },
    { number: 4, title: 'Community Certificate', icon: FileText },
    { number: 5, title: 'Birth Certificate', icon: Calendar },
    { number: 6, title: 'Academic Details', icon: GraduationCap }
  ];

  const listofStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ]


  const handleInputChange = (section: keyof AdmissionFormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (section: keyof AdmissionFormData, field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: file
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Admission form submitted successfully! You will receive a confirmation email shortly.');
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${isCompleted
                ? 'bg-green-500 border-green-500 text-white'
                : isCurrent
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{steps[currentStep - 1].title}</h2>
        <p className="text-sm text-gray-600">Step {currentStep} of {steps.length}</p>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className='flex flex-row gap-4 items-center'>
        <img src="/img_avatar.png" className='rounded-full h-20 w-20' alt="Avatar" />
        <button className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'><Upload /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            required
            value={formData.personalInfo.firstName}
            onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            required
            value={formData.personalInfo.lastName}
            onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
          <input
            type="date"
            required
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
          <select
            required
            value={formData.personalInfo.gender}
            onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
          <select
            value={formData.personalInfo.bloodGroup}
            onChange={(e) => handleInputChange('personalInfo', 'bloodGroup', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
          <input
            type="text"
            value={formData.personalInfo.religion}
            onChange={(e) => handleInputChange('personalInfo', 'religion', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter religion"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            required
            value={formData.personalInfo.category}
            onChange={(e) => handleInputChange('personalInfo', 'category', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select Category</option>
            <option value="general">General</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
            <option value="ews">EWS</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mother Tongue</label>
          <input
            type="text"
            value={formData.personalInfo.motherTongue}
            onChange={(e) => handleInputChange('personalInfo', 'motherTongue', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter mother tongue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number *</label>
          <div className='flex flex-row'>
            <input
              type="text"
              required
              maxLength={12}
              value={formData.personalInfo.aadharNumber}
              onChange={(e) => handleInputChange('personalInfo', 'aadharNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter 12-digit Aadhar number"
            />
            <button className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'><Upload /></button>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center">
            <input type="checkbox" id="disability" name="disability" value="disability" />
            <label htmlFor="disability" className="ml-2">
              Please indicate if you have any disability
            </label>
          </div>
          <textarea name="" id="" className='w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' />
        </div>
      </div>
    </div >
  );

  const renderContactInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            required
            value={formData.contactInfo.email}
            onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter email address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            required
            value={formData.contactInfo.phoneNumber}
            onChange={(e) => handleInputChange('contactInfo', 'phoneNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
        <input
          type="tel"
          value={formData.contactInfo.alternatePhone}
          onChange={(e) => handleInputChange('contactInfo', 'alternatePhone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter alternate phone number"
        />
      </div>

      <div className='w-full flex flex-row gap-3'>

        <div className='flex-1'>
          <label className="block text-sm font-medium text-gray-700 mb-2">House No/Building Name *</label>
          <input
            type="tel"
            value={formData.contactInfo.alternatePhone}
            onChange={(e) => handleInputChange('contactInfo', 'alternatePhone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter House No/Building Name"
          />
        </div>
        <div className='flex-1'>
          <label className="block text-sm font-medium text-gray-700 mb-2">Street *</label>
          <input
            type="tel"
            value={formData.contactInfo.alternatePhone}
            onChange={(e) => handleInputChange('contactInfo', 'alternatePhone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter Street"
          />
        </div>

        <div className='flex-1'>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            required
            value={formData.contactInfo.city}
            onChange={(e) => handleInputChange('contactInfo', 'city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter city"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
          <input
            type="text"
            required
            value={formData.contactInfo.district}
            onChange={(e) => handleInputChange('contactInfo', 'district', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter district"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          {/* <input
            type="text"
            required
            value={formData.contactInfo.state}
            onChange={(e) => handleInputChange('contactInfo', 'state', e.target.value)}
            className=""
            placeholder="Enter state"
          /> */}
          <select name="" id="" className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'>
            {
              listofStates.map((data, index) => (
                <option key={index} value={data}>{data}</option>
              ))
            }
          </select>
        </div>

        <div className=''>
          <label className="block text-sm font-medium text-gray-700 mb-2">Landmark *</label>
          <input
            type="tel"
            value={formData.contactInfo.alternatePhone}
            onChange={(e) => handleInputChange('contactInfo', 'alternatePhone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter Landmark"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
          <input
            type="text"
            required
            maxLength={6}
            value={formData.contactInfo.pincode}
            onChange={(e) => handleInputChange('contactInfo', 'pincode', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter PIN code"
          />
        </div>
      </div>
    </div>
  );

  const renderParentInfo = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Father's Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name *</label>
            <input
              type="text"
              required
              value={formData.parentInfo.fatherName}
              onChange={(e) => handleInputChange('parentInfo', 'fatherName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter father's name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation *</label>
            <input
              type="text"
              required
              value={formData.parentInfo.fatherOccupation}
              onChange={(e) => handleInputChange('parentInfo', 'fatherOccupation', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter father's occupation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
            <div className='flex flex-row gap-2'>
              <input
                type="number"
                value={formData.parentInfo.fatherIncome}
                onChange={(e) => handleInputChange('parentInfo', 'fatherIncome', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter annual income"
              />
              <button className='px-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'><Upload /></button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.parentInfo.fatherPhone}
              onChange={(e) => handleInputChange('parentInfo', 'fatherPhone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter father's phone"
            />
          </div>
        </div>
      </div>

      <div className="bg-pink-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-pink-800 mb-4">Mother's Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mother's Name *</label>
            <input
              type="text"
              required
              value={formData.parentInfo.motherName}
              onChange={(e) => handleInputChange('parentInfo', 'motherName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter mother's name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
            <input
              type="text"
              value={formData.parentInfo.motherOccupation}
              onChange={(e) => handleInputChange('parentInfo', 'motherOccupation', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter mother's occupation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
            <div className='flex flex-row gap-2'>
              <input
                type="number"
                value={formData.parentInfo.fatherIncome}
                onChange={(e) => handleInputChange('parentInfo', 'fatherIncome', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter annual income"
              />
              <button className='px-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'><Upload /></button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.parentInfo.motherPhone}
              onChange={(e) => handleInputChange('parentInfo', 'motherPhone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter mother's phone"
            />
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Guardian Information (if different from parents)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Name</label>
            <input
              type="text"
              value={formData.parentInfo.guardianName}
              onChange={(e) => handleInputChange('parentInfo', 'guardianName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter guardian's name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relation to Student</label>
            <input
              type="text"
              value={formData.parentInfo.guardianRelation}
              onChange={(e) => handleInputChange('parentInfo', 'guardianRelation', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter relation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.parentInfo.guardianPhone}
              onChange={(e) => handleInputChange('parentInfo', 'guardianPhone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter guardian's phone"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunityInfo = () => (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <FileText className="w-5 h-5 text-amber-600 mr-2" />
          <h3 className="text-lg font-semibold text-amber-800">Community Certificate Details</h3>
        </div>
        <p className="text-sm text-amber-700">Please provide details of your community certificate (if applicable)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
          <input
            type="text"
            value={formData.communityInfo.certificateNumber}
            onChange={(e) => handleInputChange('communityInfo', 'certificateNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter certificate number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Authority</label>
          <input
            type="text"
            value={formData.communityInfo.issuingAuthority}
            onChange={(e) => handleInputChange('communityInfo', 'issuingAuthority', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter issuing authority"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
          <input
            type="date"
            value={formData.communityInfo.issueDate}
            onChange={(e) => handleInputChange('communityInfo', 'issueDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Valid Upto</label>
          <input
            type="date"
            value={formData.communityInfo.validUpto}
            onChange={(e) => handleInputChange('communityInfo', 'validUpto', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Community Category</label>
          <select
            value={formData.communityInfo.communityCategory}
            onChange={(e) => handleInputChange('communityInfo', 'communityCategory', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select Category</option>
            <option value="obc">Other Backward Class (OBC)</option>
            <option value="sc">Scheduled Caste (SC)</option>
            <option value="st">Scheduled Tribe (ST)</option>
            <option value="ews">Economically Weaker Section (EWS)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subcaste (if any)</label>
          <input
            type="text"
            value={formData.communityInfo.subcaste}
            onChange={(e) => handleInputChange('communityInfo', 'subcaste', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter subcaste"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Community Certificate</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('communityInfo', 'certificateFile', e.target.files?.[0] || null)}
            className="hidden"
            id="community-cert"
          />
          <label
            htmlFor="community-cert"
            className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200"
          >
            Choose File
          </label>
          {formData.communityInfo.certificateFile && (
            <p className="mt-2 text-sm text-green-600">
              ✓ {formData.communityInfo.certificateFile.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderBirthCertificateInfo = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <Calendar className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-green-800">Birth Certificate Details</h3>
        </div>
        <p className="text-sm text-green-700">Please provide your birth certificate information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Birth Certificate Number *</label>
          <input
            type="text"
            required
            value={formData.birthCertificateInfo.certificateNumber}
            onChange={(e) => handleInputChange('birthCertificateInfo', 'certificateNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter certificate number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number *</label>
          <input
            type="text"
            required
            value={formData.birthCertificateInfo.registrationNumber}
            onChange={(e) => handleInputChange('birthCertificateInfo', 'registrationNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter registration number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Issue Date *</label>
          <input
            type="date"
            required
            value={formData.birthCertificateInfo.issueDate}
            onChange={(e) => handleInputChange('birthCertificateInfo', 'issueDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Place of Birth *</label>
          <input
            type="text"
            required
            value={formData.birthCertificateInfo.placeOfBirth}
            onChange={(e) => handleInputChange('birthCertificateInfo', 'placeOfBirth', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter place of birth"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hospital/Institution Name</label>
          <input
            type="text"
            value={formData.birthCertificateInfo.hospitalName}
            onChange={(e) => handleInputChange('birthCertificateInfo', 'hospitalName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter hospital/institution name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registrar Office *</label>
          <input
            type="text"
            required
            value={formData.birthCertificateInfo.registrarOffice}
            onChange={(e) => handleInputChange('birthCertificateInfo', 'registrarOffice', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter registrar office"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Birth Certificate *</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('birthCertificateInfo', 'certificateFile', e.target.files?.[0] || null)}
            className="hidden"
            id="birth-cert"
          />
          <label
            htmlFor="birth-cert"
            className="inline-block mt-2 px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition-colors duration-200"
          >
            Choose File
          </label>
          {formData.birthCertificateInfo.certificateFile && (
            <p className="mt-2 text-sm text-green-600">
              ✓ {formData.birthCertificateInfo.certificateFile.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <GraduationCap className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-purple-800">Academic Information</h3>
        </div>
        <p className="text-sm text-purple-700">Please provide your previous academic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Previous School Name</label>
          <input
            type="text"
            value={formData.academicInfo.previousSchool}
            onChange={(e) => handleInputChange('academicInfo', 'previousSchool', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter previous school name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Previous Class</label>
          <input
            type="text"
            value={formData.academicInfo.previousClass}
            onChange={(e) => handleInputChange('academicInfo', 'previousClass', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter previous class"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Board of Study</label>
          <select
            value={formData.academicInfo.boardOfStudy}
            onChange={(e) => handleInputChange('academicInfo', 'boardOfStudy', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select Board</option>
            <option value="cbse">CBSE</option>
            <option value="icse">ICSE</option>
            <option value="state">State Board</option>
            <option value="ib">International Baccalaureate</option>
            <option value="cambridge">Cambridge</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Medium of Instruction</label>
          <select
            value={formData.academicInfo.mediumOfInstruction}
            onChange={(e) => handleInputChange('academicInfo', 'mediumOfInstruction', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select Medium</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="regional">Regional Language</option>
            <option value="bilingual">Bilingual</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">TC Number</label>
          <input
            type="text"
            value={formData.academicInfo.tcNumber}
            onChange={(e) => handleInputChange('academicInfo', 'tcNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter transfer certificate number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">TC Date</label>
          <input
            type="date"
            value={formData.academicInfo.tcDate}
            onChange={(e) => handleInputChange('academicInfo', 'tcDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-blue-800 mb-4">Admission Seeking For</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
            <select
              required
              value={formData.academicInfo.admissionClass}
              onChange={(e) => handleInputChange('academicInfo', 'admissionClass', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select Class</option>
              <option value="nursery">Nursery</option>
              <option value="lkg">LKG</option>
              <option value="ukg">UKG</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year *</label>
            <select
              required
              value={formData.academicInfo.admissionYear}
              onChange={(e) => handleInputChange('academicInfo', 'admissionYear', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select Year</option>
              <option value="2024-25">2024-25</option>
              <option value="2025-26">2025-26</option>
              <option value="2026-27">2026-27</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Transfer Certificate *</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-200">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('birthCertificateInfo', 'certificateFile', e.target.files?.[0] || null)}
            className="hidden"
            id="birth-cert"
          />
          <label
            htmlFor="birth-cert"
            className="inline-block mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg cursor-pointer hover:bg-purple-600 transition-colors duration-200"
          >
            Choose File
          </label>
          {formData.birthCertificateInfo.certificateFile && (
            <p className="mt-2 text-sm text-purple-600">
              ✓ {formData.birthCertificateInfo.certificateFile.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderContactInfo();
      case 3:
        return renderParentInfo();
      case 4:
        return renderCommunityInfo();
      case 5:
        return renderBirthCertificateInfo();
      case 6:
        return renderAcademicInfo();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Admission Form</h1>
            <p className="text-gray-600">Please fill in all the required information accurately</p>
          </div>

          {renderStepIndicator()}

          <form className="space-y-6">
            {renderCurrentStep()}

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                Previous
              </button>

              {currentStep === steps.length ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
                >
                  Submit Application
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}