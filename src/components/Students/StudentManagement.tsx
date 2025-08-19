'use client';
import {
    AlertCircle,
    Calendar,
    Check,
    Download,
    Edit3,
    Eye,
    Filter,
    GraduationCap,
    Mail,
    MapPin,
    MoreHorizontal,
    Phone,
    Search,
    Trash2,
    Upload,
    UserPlus,
    Users,
    X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Student } from '../../types';

const StudentManagement: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [showDropdown, setShowDropdown] = useState<string | null>(null);
    const [openAdmissionNo, setOpenAdmissionNo] = useState(false)


    // Mock data - in a real app, this would come from an API
    useEffect(() => {
        const mockStudents: Student[] = [
            {
                id: '1',
                studentId: 'ST001',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@email.com',
                phone: '+1 234 567 8901',
                dateOfBirth: '2005-03-15',
                gender: 'male',
                address: '123 Main Street',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'UK',
                guardianName: 'Robert Doe',
                guardianPhone: '+1 234 567 8900',
                guardianEmail: 'robert.doe@email.com',
                class: '10th',
                section: 'A',
                rollNumber: '001',
                admissionDate: '2023-04-01',
                bloodGroup: 'A+',
                medicalConditions: 'None',
                emergencyContact: '+1 234 567 8902',
                status: 'active',
                createdAt: '2023-04-01T00:00:00Z',
                updatedAt: '2023-04-01T00:00:00Z'
            },
            {
                id: '2',
                studentId: 'ST002',
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@email.com',
                phone: '+1 234 567 8903',
                dateOfBirth: '2006-07-22',
                gender: 'female',
                address: '456 Oak Avenue',
                city: 'Los Angeles',
                state: 'CA',
                zipCode: '90001',
                country: 'USA',
                guardianName: 'Sarah Smith',
                guardianPhone: '+1 234 567 8904',
                guardianEmail: 'sarah.smith@email.com',
                class: '9th',
                section: 'B',
                rollNumber: '002',
                admissionDate: '2023-04-01',
                bloodGroup: 'B+',
                emergencyContact: '+1 234 567 8905',
                status: 'active',
                createdAt: '2023-04-01T00:00:00Z',
                updatedAt: '2023-04-01T00:00:00Z'
            },
            {
                id: '3',
                studentId: 'ST003',
                firstName: 'Michael',
                lastName: 'Johnson',
                email: 'michael.j@email.com',
                phone: '+1 234 567 8906',
                dateOfBirth: '2004-11-08',
                gender: 'male',
                address: '789 Pine Road',
                city: 'Chicago',
                state: 'IL',
                zipCode: '60601',
                country: 'India',
                guardianName: 'David Johnson',
                guardianPhone: '+1 234 567 8907',
                guardianEmail: 'david.j@email.com',
                class: '12th',
                section: 'A',
                rollNumber: '003',
                admissionDate: '2021-04-01',
                bloodGroup: 'O+',
                emergencyContact: '+1 234 567 8908',
                status: 'active',
                createdAt: '2021-04-01T00:00:00Z',
                updatedAt: '2023-04-01T00:00:00Z'
            }
        ];
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
    }, []);

    // Filter students based on search term, class, and status
    useEffect(() => {
        let filtered = students;

        if (searchTerm) {
            filtered = filtered.filter(student =>
                student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterClass !== 'all') {
            filtered = filtered.filter(student => student.class === filterClass);
        }

        if (filterStatus !== 'all') {
            filtered = filtered.filter(student => student.status === filterStatus);
        }

        setFilteredStudents(filtered);
    }, [searchTerm, filterClass, filterStatus, students]);

    const handleAddStudent = (formData: Partial<Student>) => {
        const newStudent: Student = {
            ...formData,
            id: Date.now().toString(),
            studentId: `ST${String(students.length + 1).padStart(3, '0')}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as Student;

        setStudents([...students, newStudent]);
        setIsAddModalOpen(false);
    };
    const handleSubmit = () => {
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">

            <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-5 rounded-lg shadow-md max-w-xl w-full">
                <h2 className="text-lg font-semibold mb-2">🎉 Admission Form Submitted Successfully!</h2>
                <p className="mb-1">
                    You will receive a confirmation email shortly.
                </p>
                <p className="mb-1 font-medium">
                    Your <span className="font-semibold">Application Form ID</span> is:
                    <span className="text-green-900 bg-green-200 px-2 py-0.5 rounded font-mono">AP2501</span>
                </p>
                <p className="mt-2">
                    You can use this ID to track the status of your application.
                </p>
            </div>

        </div>
    };

    const handleEditStudent = (formData: Partial<Student>) => {
        if (!selectedStudent) return;

        const updatedStudents = students.map(student =>
            student.id === selectedStudent.id
                ? { ...student, ...formData, updatedAt: new Date().toISOString() }
                : student
        );

        setStudents(updatedStudents);
        setIsEditModalOpen(false);
        setSelectedStudent(null);
    };

    const handleDeleteStudent = (studentId: string) => {
        if (confirm('Are you sure you want to delete this student?')) {
            setStudents(students.filter(student => student.id !== studentId));
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            active: { color: 'bg-green-100 text-green-800', icon: Check },
            inactive: { color: 'bg-gray-100 text-gray-800', icon: X },
            graduated: { color: 'bg-blue-100 text-blue-800', icon: GraduationCap },
            transferred: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle }
        };

        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config?.icon || AlertCircle;

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
                <Icon className="w-3 h-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const Modal: React.FC<{
        isOpen: boolean;
        onClose: () => void;
        title: string;
        children: React.ReactNode;
    }> = ({ isOpen, onClose, title, children }) => {
        if (!isOpen) return null;


        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        );
    };

    const StudentForm: React.FC<{
        student?: Student | null;
        onSubmit: (data: Partial<Student>) => void;
        onCancel: () => void;
    }> = ({ student, onSubmit, onCancel }) => {
        const [formData, setFormData] = useState<Partial<Student>>(
            student || {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                gender: 'male',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                guardianName: '',
                guardianPhone: '',
                guardianEmail: '',
                class: '',
                section: '',
                rollNumber: '',
                admissionDate: '',
                bloodGroup: '',
                medicalConditions: '',
                emergencyContact: '',
                status: 'active'

            }
        );

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(formData);

        };

        return (

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Student[Application No]</label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder='Enter New Student[Application No]'

                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Existing Student[Application No] *if any</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                        />
                    </div>
                </div>
                <div className="border-t mt-8">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className='flex flex-row gap-4 items-center'>
                            <img src="/img_avatar.png" className='rounded-none h-20 w-20' alt="Avatar" />
                            <button className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'><Upload /></button>
                        </div>
                        <div className='flex-1'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter First Name '

                            />
                        </div>
                        <div className='flex-1'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Last Name'

                            />
                        </div>
                        <div className='flex-1'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Email'

                            />
                        </div>
                        <div className='flex-1'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Phone Number'
                            />
                        </div>
                        <div className='flex-1'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                            <input
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                            />
                        </div>
                        <div className='flex-1'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                            >
                                <option value="Select Gender">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className='flex-1'>
                            <label className=" block text-sm font-medium text-gray-700 mb-1">House no/Building name</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter House no/Building name'

                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 mt-1">Street *</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Street'
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 mt-1">Locality *</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Locality'

                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter City'

                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter District'

                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                            {/* <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder='Enter State'

                                /> */}
                            <select
                                value={formData.state}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

                            >
                                <option value="">Select State</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Ladakh">Ladakh</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Landmark *</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Landmark'

                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                            <input
                                type="text"
                                value={formData.zipCode}
                                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter ZIP Code'
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                            {/* <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder='Enter State'

                                /> */}
                            <select
                                value={formData.country}
                                // onChange={(e) => setFormData({
                                //   ...formData,
                                //   personalInfo: { ...formData.personalInfo, gender: e.target.value as 'male' | 'female' | 'other' }
                                // })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

                            >
                                <option value="">Select Country</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="United States">United States</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Brazil">Brazil</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Brunei">Brunei</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Central African Republic">Central African Republic</option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Republic of the Congo">Republic of the Congo</option>
                                <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="East Timor">East Timor</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Greece">Greece</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-Bissau">Guinea-Bissau</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran">Iran</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Ivory Coast">Ivory Coast</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="North Macedonia">North Macedonia</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">Marshall Islands</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia">Micronesia</option>
                                <option value="Moldova">Moldova</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="North Korea">North Korea</option>
                                <option value="Northern Ireland">Northern Ireland</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">Papua New Guinea</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Romania">Romania</option>
                                <option value="Russia">Russia</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Lucia">Saint Lucia</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Scotland">Scotland</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serbia">Serbia</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">Sierra Leone</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="South Korea">South Korea</option>
                                <option value="South Sudan">South Sudan</option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Eswatini">Eswatini</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syria">Syria</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Togo">Togo</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Wales">Wales</option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Parent Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name *</label>
                            <input
                                type="text"
                                value={formData.guardianName}
                                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Parent Name '

                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Parent Phone *</label>
                            <input
                                type="tel"
                                value={formData.guardianPhone}
                                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Parent Phone'

                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Parent Email</label>
                            <input
                                type="email"
                                value={formData.guardianEmail}
                                onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Parent Email'
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact *</label>
                            <input
                                type="tel"
                                value={formData.emergencyContact}
                                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Emergency Contact'

                            />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Guardian Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name *</label>
                            <input
                                type="text"
                                value={formData.guardianName}
                                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Guardian Name'

                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone *</label>
                            <input
                                type="tel"
                                value={formData.guardianPhone}
                                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Guardian Phone '

                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Email</label>
                            <input
                                type="email"
                                value={formData.guardianEmail}
                                onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Guardian Email'
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact *</label>
                            <input
                                type="tel"
                                value={formData.emergencyContact}
                                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Emergency Contact'

                            />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                            <select
                                value={formData.class}
                                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select Class</option>
                                <option value="9th">9th Grade</option>
                                <option value="10th">10th Grade</option>
                                <option value="11th">11th Grade</option>
                                <option value="12th">12th Grade</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
                            <select
                                value={formData.section}
                                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                            >
                                <option value="">Select Section</option>
                                <option value="A">Section A</option>
                                <option value="B">Section B</option>
                                <option value="C">Section C</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number *</label>
                            <input
                                type="text"
                                value={formData.rollNumber}
                                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Roll Number'

                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date *</label>
                            <input
                                type="date"
                                value={formData.admissionDate}
                                onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Enter Admission Date'

                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                            <select
                                value={formData.bloodGroup}
                                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="graduated">Graduated</option>
                                <option value="transferred">Transferred</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
                        <textarea
                            value={formData.medicalConditions}
                            onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Any medical conditions or allergies..."
                        />
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Extra Curricular Activity</h3>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="male">Cricket</option>
                                <option value="female">Dance</option>
                                <option value="other">Chess</option>
                            </select>
                        </div>
                    </div> */}
                    <div>

                        <div className="flex flex-col gap-2">
                            {["Cricket", "Dance", "Chess"].map((activity) => (
                                <label key={activity} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value={activity}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            // setFormData((prevData) => {
                                            //     const selected = new Set(prevData.activities || []);
                                            //     if (isChecked) {
                                            //         selected.add(value);
                                            //     } else {
                                            //         selected.delete(value);
                                            //     }
                                            //     return { ...prevData, activities: Array.from(selected) };
                                            // });
                                        }}
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2 text-gray-700">{activity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {
                        openAdmissionNo && (
                            <div className="bg-gray-100 flex items-center justify-center">
                                <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-5 rounded-lg shadow-md max-w-xl w-full">
                                    <h2 className="text-lg font-semibold mb-2">🎉 Admission Form Submitted Successfully!</h2>
                                    <p className="mb-1">
                                        You will receive a confirmation email shortly.
                                    </p>
                                    <p className="mb-1 font-medium">
                                        Your <span className="font-semibold">Admission ID</span> is:
                                        <span className="text-green-900 bg-green-200 px-2 py-0.5 rounded font-mono">AP2501</span>
                                    </p>
                                    <p className="mt-2">
                                        You can use this ID to track the status of your application.
                                    </p>
                                </div>
                            </div>
                        )
                    }

                </div>

                <div className="flex justify-end space-x-2 pt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { setIsAddModalOpen(true), setOpenAdmissionNo(true) }}
                        type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal"
                    >
                        {student ? 'Update Student' : 'Add Student'}
                    </button>
                    {/* <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
                        Open modal
                    </button> */}

                    <div id="hs-basic-modal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none" role="dialog" aria-labelledby="hs-basic-modal-label">
                        <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                            <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                                <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-5 rounded-lg shadow-md max-w-xl w-full">
                                    <h2 className="text-lg font-semibold mb-2">🎉 Admission Form Submitted Successfully!</h2>
                                    <p className="mb-1">
                                        You will receive a confirmation email shortly.
                                    </p>
                                    <p className="mb-1 font-medium">
                                        Your <span className="font-semibold">Application Form ID</span> is:
                                        <span className="text-green-900 bg-green-200 px-2 py-0.5 rounded font-mono">AP2501</span>
                                    </p>
                                    <p className="mt-2">
                                        You can use this ID to track the status of your application.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>

        );
    };

    //  <div className="bg-gray-100 flex items-center justify-center min-h-screen">

    //   <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-5 rounded-lg shadow-md max-w-xl w-full">
    //     <h2 className="text-lg font-semibold mb-2">🎉 Admission Form Submitted Successfully!</h2>
    //     <p className="mb-1">
    //       You will receive a confirmation email shortly.
    //     </p>
    //     <p className="mb-1 font-medium">
    //       Your <span className="font-semibold">Application Form ID</span> is:
    //       <span className="text-green-900 bg-green-200 px-2 py-0.5 rounded font-mono">AP2501</span>
    //     </p>
    //     <p className="mt-2">
    //       You can use this ID to track the status of your application.
    //     </p>
    //   </div>

    // </div>


    const StudentDetails: React.FC<{ student: Student }> = ({ student }) => (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold text-gray-600">
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                </div>
                <div>
                    <h3 className="text-2xl font-bold">{student.firstName} {student.lastName}</h3>
                    <p className="text-gray-600">Student ID: {student.studentId}</p>
                    {getStatusBadge(student.status)}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Personal Information
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{student.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{student.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>Born: {new Date(student.dateOfBirth).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{student.address}, {student.city}, {student.state} {student.zipCode}</span>
                        </div>
                        {student.bloodGroup && (
                            <div>
                                <span className="font-medium">Blood Group:</span> {student.bloodGroup}
                            </div>
                        )}
                        {student.medicalConditions && (
                            <div>
                                <span className="font-medium">Medical Conditions:</span>
                                <p className="text-sm text-gray-600 mt-1">{student.medicalConditions}</p>
                            </div>
                        )}
                    </div>
                </div>


                <div className="bg-white border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Academic Information
                    </h4>
                    <div className="space-y-3">
                        <div>
                            <span className="font-medium">Class:</span> {student.class} - Section {student.section}
                        </div>
                        <div>
                            <span className="font-medium">Roll Number:</span> {student.rollNumber}

                        </div>
                        <div>
                            <span className="font-medium">Admission Date:</span> {new Date(student.admissionDate).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        Guardian Information
                    </h4>
                    <div className="space-y-3">
                        <div>
                            <span className="font-medium">Guardian Name:</span> {student.guardianName}
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{student.guardianPhone}</span>
                        </div>
                        {student.guardianEmail && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span>{student.guardianEmail}</span>
                            </div>
                        )}
                        <div>
                            <span className="font-medium">Emergency Contact:</span> {student.emergencyContact}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Student Management</h1>
                    <p className="text-gray-600">Manage student information and records</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <UserPlus className="w-4 h-4" />
                    Add Student
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Students</p>
                            <p className="text-2xl font-bold">{students.length}</p>
                        </div>
                        <Users className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Students</p>
                            <p className="text-2xl font-bold text-green-600">
                                {students.filter(s => s.status === 'active').length}
                            </p>
                        </div>
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                </div>
                <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Graduated</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {students.filter(s => s.status === 'graduated').length}
                            </p>
                        </div>
                        <GraduationCap className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">New This Month</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {students.filter(s => new Date(s.createdAt).getMonth() === new Date().getMonth()).length}
                            </p>
                        </div>
                        <UserPlus className="w-8 h-8 text-purple-600" />
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white border rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-1 gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={filterClass}
                            onChange={(e) => setFilterClass(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Classes</option>
                            <option value="9th">9th Grade</option>
                            <option value="10th">10th Grade</option>
                            <option value="11th">11th Grade</option>
                            <option value="12th">12th Grade</option>
                        </select>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="graduated">Graduated</option>
                            <option value="transferred">Transferred</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" />
                            More Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white border rounded-lg">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Students ({filteredStudents.length})</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guardian</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                                                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium">{student.firstName} {student.lastName}</p>
                                                <p className="text-sm text-gray-500">{student.studentId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm">{student.email}</p>
                                            <p className="text-sm text-gray-500">{student.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="font-medium">{student.class} - {student.section}</p>
                                            <p className="text-sm text-gray-500">Roll: {student.rollNumber}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm">{student.guardianName}</p>
                                            <p className="text-sm text-gray-500">{student.guardianPhone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(student.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowDropdown(showDropdown === student.id ? null : student.id)}
                                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                            {showDropdown === student.id && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedStudent(student);
                                                            setIsViewModalOpen(true);
                                                            setShowDropdown(null);
                                                        }}
                                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        View Details
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedStudent(student);
                                                            setIsEditModalOpen(true);
                                                            setShowDropdown(null);
                                                        }}
                                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleDeleteStudent(student.id);
                                                            setShowDropdown(null);
                                                        }}
                                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Add Student Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Student"
            >
                <StudentForm
                    onSubmit={handleAddStudent}
                    onCancel={() => setIsAddModalOpen(false)}
                />
            </Modal>

            {/* Add Student inside dialogue */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add Student"
            >
                <StudentForm
                    onSubmit={handleSubmit}
                    onCancel={() => setIsAddModalOpen(false)}
                />
            </Modal>
            {/* Edit Student Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Student"
            >
                <StudentForm
                    student={selectedStudent}
                    onSubmit={handleEditStudent}
                    onCancel={() => {
                        setIsEditModalOpen(false);
                        setSelectedStudent(null);
                    }}
                />
            </Modal>

            {/* View Student Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Student Details"
            >
                {selectedStudent && <StudentDetails student={selectedStudent} />}
            </Modal>
        </div>
    );


};

export default StudentManagement;